'use strict';

const Env = use('Env');
const Logger = use('Logger');
const Request = require('request-promise');

// Values for request to API >>>>>>>>>>>>>>>>
const method = 'POST';
const url = `https://api.telegram.org/bot${Env.get('TELEGRAM_TOKEN')}`;
const headersMsg = { 'Content-Type': 'application/json' };
const json = true;
// Values for request to API <<<<<<<<<<<<<<<<

// Values for request to API >>>>>>>>>>>>>>>>
const headersDoc = { 'Content-Type': 'multipart/form-data' };
// Values for request to API <<<<<<<<<<<<<<<<


class TelegramSenderController {
    static async sendMsg(chatId, msg) {
        this.msg = msg;
        try {
            await Request({
                body: {
                    text: msg,
                    chat_id: chatId,
                },
                method,
                url: `${url}/sendMessage`,
                headers: headersMsg,
                json,
            });
        } catch (e) {
            Logger.error('Error while sending "sendObjectMessage"', e);
        }
    }

    static async sendDoc(chatId, file) {
        this.file = file;
        try {
            return (await Request({
                formData: {
                    chat_id: chatId,
                    document: file,
                },
                method,
                url: `${url}/sendDocument`,
                headers: headersDoc,
            }));
        } catch (e) {
            Logger.error('Error while sending "sendDocument"', e);
            return null;
        }
    }

    static async sendPhoto(chatId, file) {
        this.file = file;
        try {
            return (await Request({
                formData: {
                    chat_id: chatId,
                    photo: file,
                },
                method,
                url: `${url}/sendPhoto`,
                headers: headersDoc,
            }));
        } catch (e) {
            Logger.error('Error while sending "sendPhoto"', e);
            return null;
        }
    }
}

module.exports = TelegramSenderController;
