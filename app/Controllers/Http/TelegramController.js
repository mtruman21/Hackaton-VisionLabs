'use strict';

const Logger = use('Logger');
const Tel = use('App/Controllers/Http/TelegramSenderController');
const TgHelp = use('App/Controllers/Http/TgHelperController');
const TF = use('App/Controllers/Http/TensorflowController');
const Msg = use('App/Msg/MsgTgRu');
const _ = require('lodash');

class TelegramController {
    async webhook({ request, response }) {
        this.request = request;
        this.response = response;
        const data = request.post();
        const chatId = _.get(data, 'message.chat.id');
        const text = _.get(data, 'message.text');
        // const name = _.get(data, 'message.from.username');
        const fileId = _.get(data, 'message.document.file_id');
        let photoId = _.get(data, 'message.photo[3].file_id');
        if (!photoId) {
            photoId = _.get(data, 'message.photo[2].file_id');
        }
        // const fileName = _.get(data, 'message.document.file_name');
        response.send({}); // Instantly reply with success code
        response.end();

        Logger.info('Incoming TELEGRAM webhook request POST');
        // Logger.info(JSON.stringify(data));
        Logger.info(`file_id  =${fileId}`);
        Logger.info(`photoId  =${photoId}`);
        Logger.info(`chatId  =${chatId}`); // 193668219
        if (text && text.includes('/start')) {
            Tel.sendMsg(chatId, Msg.welcome());
        } else if (text) {
            Tel.sendMsg(chatId, Msg.noImg());
        } else if (photoId) {
            Logger.debug('>>>> photoId');
            const urlPhoto = await TgHelp.getFile(photoId);
            Logger.info(urlPhoto);
            if (urlPhoto) {
                Tel.sendMsg(chatId, Msg.nicePhoto());
                Logger.debug(urlPhoto);
                const poses = await TF.processTF(urlPhoto, chatId);
                // Tel.sendMsg(chatId, JSON.stringify(poses));
            } else {
                Tel.sendMsg(chatId, Msg.failTgUrlPhoto());
            }
        } else if (fileId) {
            Tel.sendMsg(chatId, `echo_file:\n${fileId}`);
        } else {
            Tel.sendMsg(chatId, Msg.noImg());
        }
        response.status(200).send('ok');
    }

    async webhookNotGet({ request }) {
        this.request = request;

        return (JSON.stringify({
            ok: false,
            description: 'No GET request here, only POST',
        }, null, '\t'));
    }
}

module.exports = TelegramController;
