'use strict';

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
// import * as posenet from '@tensorflow-models/posenet';
const posenet = require('@tensorflow-models/posenet');
const fs = require('fs');
const util = require('util');
const { loadImage, Image, createCanvas } = require('canvas');
const _ = require('lodash');

const Tel = use('App/Controllers/Http/TelegramSenderController');
const Logger = use('Logger');
const Msg = use('App/Msg/MsgTgRu');

const readFile = util.promisify(fs.readFile);

class TensorflowController {
  static async draw(context, inputjson) {
      this.context = context;
      let rear;
      let lear;
      let nosex;
      let nosey;
      let wristx;
      let wristy;
      let lwx;
      let lwy;
      let rwx;
      let rwy;
      for (let i = 0; i < inputjson.length; i += 1) {
          rear = _.get(inputjson[i], 'keypoints.[4].position.x');
          lear = _.get(inputjson[i], 'keypoints.[3].position.x');
          nosex = _.get(inputjson[i], 'keypoints.[0].position.x');
          nosey = _.get(inputjson[i], 'keypoints.[0].position.y');
          lwx = _.get(inputjson[i], 'keypoints.[9].position.x');
          lwy = _.get(inputjson[i], 'keypoints.[9].position.y');
          rwx = _.get(inputjson[i], 'keypoints.[10].position.x');
          rwy = _.get(inputjson[i], 'keypoints.[10].position.y');
          if (lwy < rwy) {
              wristx = lwx;
              wristy = lwy;
          } else {
              wristx = rwx;
              wristy = rwy;
          }
          if (nosey > wristy) {
              context.fillStyle = "green";
              context.strokeStyle = "green";
          } else {
              context.fillStyle = "red";
              context.strokeStyle = "red";
          }
          //draw fisrt circle for head
          context.globalAlpha = 0.4;
          context.beginPath();
          context.arc(nosex, nosey, (lear - rear) / 2, 0, Math.PI * 2, false);
          context.fill();
          context.closePath();
          //draw second circle for leftwrist
          context.globalAlpha = 0.4;
          context.beginPath();
          context.arc(lwx, lwy, (lear - rear) / 3, 0, Math.PI * 2, false);
          context.fill();
          context.closePath();
          //draw second circle for rightwrist
          context.globalAlpha = 0.4;
          context.beginPath();
          context.arc(rwx, rwy, (lear - rear) / 3, 0, Math.PI * 2, false);
          context.fill();
          context.closePath();
          //draw the line
          context.beginPath();
          context.lineWidth = 5;
          context.globallAlpha = 1;
          context.moveTo(lwx, lwy);
          context.lineTo(nosex, nosey);
          context.lineTo(rwx, rwy);
          context.stroke();
      }
  }

    static async processTF(urlPhoto, chatId) {
        async function estimateMultiplePosesOnImage(imageElement) {
            let configPosenet;
            let configEstimate;
            let minPoseConfidence;
            /* SHIT
            configPosenet = {
                architecture: 'MobileNetV1',
                outputStride: 8,
                inputResolution: 801,
                multiplier: 1,
                quantBytes: 4,
            };
            configEstimate = {
                flipHorizontal: false,
                decodingMethod: 'multi-person',
                maxPoseDetections: 300,
                scoreThreshold: 0.1,
                nmsRadius: 20,
            };
            configEstimate = {
                decodingMethod: 'multi-person',
                maxPoseDetections: 300,
            };
            */
            /* GOOD_ONE
            configPosenet = {};
            configEstimate = {
                flipHorizontal: false,
                decodingMethod: 'multi-person',
                maxPoseDetections: 100,
                scoreThreshold: 0.6,
                nmsRadius: 20
            };
            minPoseConfidence = 0.2;
            */
            configPosenet = {
                architecture: 'ResNet50',
                outputStride: 32,
                inputResolution: 513,
                quantBytes: 1,
            };
            configEstimate = {
                flipHorizontal: false,
                decodingMethod: 'multi-person',
                maxPoseDetections: 60,
                scoreThreshold: 0.2,
                nmsRadius: 16,
            };
            minPoseConfidence = 0.2;

            Logger.info(`\nconfigPosenet = ${JSON.stringify(configPosenet, null, 1)};\nconfigEstimate = ${JSON.stringify(configEstimate, null, 1)};\nminPoseConfidence = ${minPoseConfidence};`);

            const net = await posenet.load(configPosenet);
            let poses = await net.estimatePoses(imageElement, configEstimate);
            poses = poses.filter(elem => elem.score > minPoseConfidence);

            return poses;
        }

        const img4canvas = await loadImage(urlPhoto);

        const canvas = createCanvas(img4canvas.width, img4canvas.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img4canvas, 0, 0);
        //const input = tf.browser.fromPixels(canvas);
        const input = tf.browser.fromPixels(canvas);
        Logger.info('estimate_START');
        const poses = await estimateMultiplePosesOnImage(input);
        Logger.info('estimate_END');
        // Logger.info(JSON.stringify(poses));
        const totalPerson = poses.length;
        let handupLeft = 0;
        let handupRight = 0;
        let handupBoth = 0;
        let handupAll = 0;
        poses.forEach((elem) => {
            /*
            Logger.info(`nose=${_.get(elem, 'keypoints[0].position.y')}`);
            Logger.info(`left=${_.get(elem, 'keypoints[9].position.y')}`);
            Logger.info(`right=${_.get(elem, 'keypoints[10].position.y')}\n`);
            */
            if ((_.get(elem, 'keypoints[0].position.y') > _.get(elem, 'keypoints[9].position.y'))
                && (_.get(elem, 'keypoints[0].position.y') > _.get(elem, 'keypoints[10].position.y'))) {
                handupBoth += 1;
            } else if (_.get(elem, 'keypoints[0].position.y') > _.get(elem, 'keypoints[9].position.y')) {
                handupLeft += 1;
            } else if (_.get(elem, 'keypoints[0].position.y') > _.get(elem, 'keypoints[10].position.y')) {
                handupRight += 1;
            }
        });
        handupAll = handupBoth + handupLeft + handupRight;
        /*
        Logger.info(`total=${totalPerson}`);
        Logger.info(`handupBoth=${handupBoth}`);
        Logger.info(`handupLeft=${handupLeft}`);
        Logger.info(`handupRight=${handupRight}`);
        Logger.info(`handupAll=${handupAll}`);
        */

        if (chatId) {
            // Logger.info('next_>>>_this.draw');
            await TensorflowController.draw(ctx, poses);
            const stream = canvas.createPNGStream();
            stream.path = `/tmp/${stream.filename}`;
            stream.name = 'output.png';
            // Logger.info('next_>>>_Tel.sendPhoto');
            await Tel.sendPhoto(chatId, stream);
            const math = (totalPerson) ? handupAll / totalPerson : 0;
            await Tel.sendMsg(chatId, Msg.result(totalPerson, handupAll, math));
        }
        return poses;
    }

    async testPosenet({ request }) {
        this.request = request;

        async function estimateMultiplePosesOnImage(imageElement) {
            const net = await posenet.load();
            // estimate poses
            const poses = await net.estimatePoses(imageElement, 1, false, 8, 300, 0.5, 17);
            return poses;
        }
        let url = 'https://i.pinimg.com/originals/45/1b/2a/451b2a36135a2bbabf9b2f472b85d2d4.jpg';
        url = 'https://thumbs.dreamstime.com/z/happy-business-people-hands-up-16212742.jpg';
        const img = new Image();
        const img4canvas = await loadImage(url);

        const canvas = createCanvas(img4canvas.width, img4canvas.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img4canvas, 0, 0);
        const input = tf.browser.fromPixels(canvas);

        console.log('before poses');
        const poses = await estimateMultiplePosesOnImage(input);
        console.log('AFTER poses');
        console.log(JSON.stringify(poses, null, ' '));

        ctx.beginPath();
        ctx.arc(212.26157312225877, 509.8603572733918, 50, 0, 2 * Math.PI);
        ctx.arc(331.69407133284597, 138.25927829556528, 50, 0, 2 * Math.PI);
        ctx.stroke();

        const out = fs.createWriteStream('output/test.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () =>  console.log('The PNG file was created.'));

        return JSON.stringify({
            msg: 'np - ok',
        }, null, '\t');
    }

    async testRequest({ request }) {
        this.request = request;
        // http://127.0.0.1:3333/tf

        // Optional Load the binding:
        // Use '@tensorflow/tfjs-node-gpu' if running with GPU.

        // Train a simple model:
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 100, activation: 'relu', inputShape: [10] }));
        model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
        model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        const xs = tf.randomNormal([100, 10]);
        const ys = tf.randomNormal([100, 1]);

        model.fit(xs, ys, {
            epochs: 100,
            callbacks: {
                onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`),
            },
        });

        return JSON.stringify({
            msg: 'tf - ok',
            rmq: 'check logs',
        }, null, '\t');
    }
}

module.exports = TensorflowController;
