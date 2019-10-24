'use strict';

// http://127.0.0.1:3333/redis
class RediController {
    async showSession({ session, request }) {
        this.request = request;
        if (!session.get('counter')) {
            session.put('counter', 0);
        }
        session.increment('counter');

        return JSON.stringify({
            request_get: this.request.get(),
            cookies_session: request.cookies()['adonis-session'],
            session: session.all(),
        }, null, '\t');
    }
}

module.exports = RediController;
