'use strict';

const Env = use('Env');
// const Logger = use('Logger');

const Request = require('request-promise');
const _ = require('lodash');

class TgHelperController {
    static async getFile(photoId) {
        const telData = JSON.parse(await Request('https://api.telegram.org/bot'
        + `${Env.get('TELEGRAM_TOKEN')}`
        + `/getFile?file_id=${photoId}`));

        const path = _.get(telData, 'result.file_path');
        if (!path) {
            return null;
        }

        const url = 'https://api.telegram.org/file/bot'
        + `${Env.get('TELEGRAM_TOKEN')}/${path}`;

        return url;
    }
}

module.exports = TgHelperController;
