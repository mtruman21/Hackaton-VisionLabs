'use strict';

// https://github.com/adonisjs/adonis-framework/issues/763
const AdonisRequest = use('request');
const Env = use('Env');

const Request = require('request-promise');
const _ = require('lodash');

class FilePipeController {
    async getFile({ request, response, params }) {
        this.request = request;

        const telData = JSON.parse(await Request('https://api.telegram.org/bot'
        + `${Env.get('TELEGRAM_TOKEN')}`
        + `/getFile?file_id=${params.id}`));

        const path = _.get(telData, 'result.file_path');
        if (!path) {
            response.send('Sorry, there is no file or there is some other error');
            return;
        }

        const url = 'https://api.telegram.org/file/bot'
        + `${Env.get('TELEGRAM_TOKEN')}/${path}`;

        response.implicitEnd = false;
        // AdonisRequest.get(url).pipe(response.response);
        const stream = AdonisRequest.get(url);
        _.set(stream, 'headers.Content-Disposition',
            `attachment; filename="${params.filename}" filename*="{params.filename}"`);
        stream.pipe(response.response);
    }

    async getFileSample({ request, response }) {
        this.request = request;

        const url = 'https://img.resized.co/image_ie/'
        + 'eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL'
        + '3MzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tXFxcL3N0b3'
        + 'JhZ2UucHVibGlzaGVycGx1cy5pZVxcXC9tZWRpYS5pbWF'
        + 'nZS5pZVxcXC91cGxvYWRzXFxcLzIwMTlcXFwvMDFcXFwv'
        + 'MTYxMTEzNTBcXFwvYWxleGFuZHJ1LXpkcm9iYXUtODQ0M'
        + 'jQtdW5zcGxhc2gtMTAyNHg1NDUuanBnXCIsXCJ3aWR0aF'
        + 'wiOjE0OCxcImhlaWdodFwiOjE0OCxcImRlZmF1bHRcIjp'
        + 'cImh0dHBzOlxcXC9cXFwvd3d3LmltYWdlLmllXFxcL2lt'
        + 'YWdlc1xcXC9uby1pbWFnZS5wbmc_dj0yXCJ9IiwiaGFza'
        + 'CI6ImI0NzJkOGFmZTUzY2E3OTlkMzExYjE4MTEyMzFmMT'
        + 'FjM2M0ODk4NjEifQ==/alexandru-zdrobau-84424-un'
        + 'splash-1024x545.jpg';

        response.implicitEnd = false;
        AdonisRequest.get(url).pipe(response.response);
    }
}

module.exports = FilePipeController;
