var canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");
var inputjson = [{ "score": 0.49126476224730997, "keypoints": [{ "score": 0.9987549781799316, "part": "nose", "position": { "x": 884.2096276450576, "y": 454.93502392685207 } }, { "score": 0.9994746446609497, "part": "leftEye", "position": { "x": 906.3236953919395, "y": 436.3683943225627 } }, { "score": 0.9959595203399658, "part": "rightEye", "position": { "x": 874.2816751463372, "y": 439.2963671433299 } }, { "score": 0.9892358183860779, "part": "leftEar", "position": { "x": 953.1736766037188, "y": 438.7474579047739 } }, { "score": 0.08860081434249878, "part": "rightEar", "position": { "x": 868.2092626889547, "y": 449.435898354179 } }, { "score": 0.9913280606269836, "part": "leftShoulder", "position": { "x": 1045.7149095702591, "y": 546.8227726126972 } }, { "score": 0.9948248863220215, "part": "rightShoulder", "position": { "x": 864.3934287522969, "y": 509.7160593652935 } }, { "score": 0.5709409117698669, "part": "leftElbow", "position": { "x": 1071.1396723462824, "y": 732.2651600168463 } }, { "score": 0.7227795720100403, "part": "rightElbow", "position": { "x": 828.1549508111519, "y": 604.6045686654878 } }, { "score": 0.09023243188858032, "part": "leftWrist", "position": { "x": 968.5317633444804, "y": 731.5983283477917 } }, { "score": 0.5949923992156982, "part": "rightWrist", "position": { "x": 836.5831976396996, "y": 603.3579929418731 } }, { "score": 0.10007622838020325, "part": "leftHip", "position": { "x": 993.1446303401078, "y": 783.2022996910832 } }, { "score": 0.11995869874954224, "part": "rightHip", "position": { "x": 884.5446711046654, "y": 726.6138758115602 } }, { "score": 0.010855019092559814, "part": "leftKnee", "position": { "x": 977.3851136366527, "y": 823.2709548515186 } }, { "score": 0.07094541192054749, "part": "rightKnee", "position": { "x": 873.0630707322506, "y": 785.3169595525976 } }, { "score": 0.006325125694274902, "part": "leftAnkle", "position": { "x": 978.6400151880165, "y": 857.1545144507761 } }, { "score": 0.0062164366245269775, "part": "rightAnkle", "position": { "x": 875.5136591039206, "y": 856.4042754926181 } }] }, { "score": 0.5156266549054314, "keypoints": [{ "score": 0.9980461597442627, "part": "nose", "position": { "x": 141.80599885028707, "y": 471.61950433045104 } }, { "score": 0.998319149017334, "part": "leftEye", "position": { "x": 148.5622080794552, "y": 445.91425621300414 } }, { "score": 0.998767614364624, "part": "rightEye", "position": { "x": 109.06694777179183, "y": 464.96970847615034 } }, { "score": 0.908332109451294, "part": "leftEar", "position": { "x": 178.46099457197025, "y": 433.40456146524673 } }, { "score": 0.4362547993659973, "part": "rightEar", "position": { "x": 88.95907799402873, "y": 483.498956295482 } }, { "score": 0.9420918226242065, "part": "leftShoulder", "position": { "x": 244.4904664890808, "y": 488.14677277782516 } }, { "score": 0.991483211517334, "part": "rightShoulder", "position": { "x": 91.3159261670029, "y": 537.7225481167175 } }, { "score": 0.8915216326713562, "part": "leftElbow", "position": { "x": 340.453797265103, "y": 423.7022590804519 } }, { "score": 0.7427160143852234, "part": "rightElbow", "position": { "x": 76.53120735235382, "y": 659.9593959942199 } }, { "score": 0.6414526104927063, "part": "leftWrist", "position": { "x": 328.66726946412473, "y": 297.5269047638826 } }, { "score": 0.05888047814369202, "part": "rightWrist", "position": { "x": 153.83305047687733, "y": 684.9871031479878 } }, { "score": 0.029464423656463623, "part": "leftHip", "position": { "x": 266.2838007274427, "y": 707.1528113264787 } }, { "score": 0.0873073935508728, "part": "rightHip", "position": { "x": 127.74279975054557, "y": 706.1662551143714 } }, { "score": 0.013546079397201538, "part": "leftKnee", "position": { "x": 241.01560523635465, "y": 780.2886641401994 } }, { "score": 0.020047485828399658, "part": "rightKnee", "position": { "x": 108.95454439154844, "y": 763.5863279627081 } }, { "score": 0.003309011459350586, "part": "leftAnkle", "position": { "x": 242.5050330266618, "y": 857.0834868895381 } }, { "score": 0.004113137722015381, "part": "rightAnkle", "position": { "x": 106.51578113698123, "y": 820.0065825654749 } }] }, { "score": 0.7369623271857991, "keypoints": [{ "score": 0.9982568025588989, "part": "nose", "position": { "x": 569.3419821429671, "y": 343.1396126287026 } }, { "score": 0.9967401027679443, "part": "leftEye", "position": { "x": 581.4560076646638, "y": 335.6165823246304 } }, { "score": 0.9924547672271729, "part": "rightEye", "position": { "x": 564.6466991880484, "y": 328.84404508272814 } }, { "score": 0.6398064494132996, "part": "leftEar", "position": { "x": 590.1601340687066, "y": 347.7542016129745 } }, { "score": 0.7979353070259094, "part": "rightEar", "position": { "x": 546.1559525707312, "y": 335.59326475231273 } }, { "score": 0.9935340881347656, "part": "leftShoulder", "position": { "x": 595.6783280299421, "y": 411.3664227159401 } }, { "score": 0.9742974042892456, "part": "rightShoulder", "position": { "x": 502.95364020163555, "y": 371.01453308055284 } }, { "score": 0.939602255821228, "part": "leftElbow", "position": { "x": 603.03564134397, "y": 488.5494178387157 } }, { "score": 0.9068032503128052, "part": "rightElbow", "position": { "x": 448.47714691831357, "y": 338.5955850868895 } }, { "score": 0.9703059196472168, "part": "leftWrist", "position": { "x": 577.652188769558, "y": 516.040736913681 } }, { "score": 0.5841609239578247, "part": "rightWrist", "position": { "x": 479.8735798450939, "y": 247.2940811525312 } }, { "score": 0.9292616844177246, "part": "leftHip", "position": { "x": 552.560635826044, "y": 539.3115718699339 } }, { "score": 0.5670414566993713, "part": "rightHip", "position": { "x": 504.06237966135933, "y": 563.0878223201686 } }, { "score": 0.46467357873916626, "part": "leftKnee", "position": { "x": 571.2835579587703, "y": 542.4080710724782 } }, { "score": 0.336856871843338, "part": "rightKnee", "position": { "x": 527.4991417924564, "y": 544.3139667113622 } }, { "score": 0.31725358963012695, "part": "leftAnkle", "position": { "x": 556.1357307852361, "y": 562.4871570352923 } }, { "score": 0.11937510967254639, "part": "rightAnkle", "position": { "x": 539.9602128748309, "y": 562.4099219640096 } }] }]
var img = new Image();
img.src = "emily3.jpg";
img.onload = function() {
    var pattern = context.createPattern(img, "no-repeat");
    context.fillStyle = pattern;
    context.fillRect(0, 0, window.innerHeight, window.innerWidth);
    context.strokeStyle = "red";
    var rear, lear, nosex, nosey, wristx, wristy;
    for (var i = 0; i < inputjson.length; i++) {
        if (_.get(inputjson[i], 'keypoints.[9].position.y') < _.get(inputjson[i], 'keypoints[10].position.y')) {
            wristx = _.get(inputjson[i], 'keypoints.[9].position.x');
            wristy = _.get(inputjson[i], 'keypoints.[9].position.y');
        } else {
            wristx = _.get(inputjson[i], 'keypoints.[10].position.x');
            wristy = _.get(inputjson[i], 'keypoints.[10].position.y');
        }
        rear = _.get(inputjson[i], 'keypoints.[4].position.x');
        lear = _.get(inputjson[i], 'keypoints.[3].position.x');
        nosex = _.get(inputjson[i], 'keypoints.[0].position.x');
        nosey = _.get(inputjson[i], 'keypoints.[0].position.y');
        console.log(nosey, "nose --- wrist", wristy);
        if (nosey > wristy) {
            //draw fisrt circle for head
            context.globalAlpha = 0.4;
            context.fillStyle = "green";
            context.strokeStyle = "green"
            context.beginPath();
            context.arc(nosex, nosey, (lear - rear) / 2, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
            //draw second circle for wrist
            context.globalAlpha = 0.4;
            context.beginPath();
            context.arc(wristx, wristy, (lear - rear) / 3, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
            //draw the line
            context.beginPath();
            context.lineWidth = 5;
            context.globallAlpha = 1;
            context.moveTo(nosex, nosey);
            context.lineTo(wristx, wristy);
            context.closePath();
            context.stroke();
        } else {
            //draw fisrt circle for head
            context.globalAlpha = 0.4;
            context.fillStyle = "red";
            context.strokeStyle = "red"
            context.beginPath();
            context.arc(nosex, nosey, (lear - rear) / 2, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
            //draw second circle for wrist
            context.globalAlpha = 0.4;
            context.beginPath();
            context.arc(wristx, wristy, (lear - rear) / 3, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
            //draw the line
            context.beginPath();
            context.lineWidth = 5;
            context.globalAlpha = 1;
            context.moveTo(nosex, nosey);
            context.lineTo(wristx, wristy);
            context.closePath();
            context.stroke();
        }
    }
}
console.log(canvas);