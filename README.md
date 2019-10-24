###
### The target of this project is a create a telegram bot with adonisjs

###
### STEP 0 ### How to start after install
### Link:
{
  cd project folder
  setup .env and public/chat/var.js
  adonis serve --dev
  sh tunnel.sh
}

###
### STEP 1 ### Install Adonisjs
### Link: https://adonisjs.com/docs/4.1/installation
{
    sudo npm install -g npm
    sudo npm i -g node-pre-gyp
    sudo npm install -g fsevents
    sudo npm i -g @adonisjs/cli
    #FAILED
}
{
    cd /Users/PhilippNox/gitlab/
    adonis new adonisjs_2_bot
    #OK
}
{
    cd adonisjs_2_bot
    #adonis serve --dev
}
{
    Create repository on gitlab
    cd /Users/PhilippNox/gitlab/adonisjs_2_bot
    git init
    git remote add origin git@gitlab.com:Philnox/adonisjs_2_bot.git
    git add .
    git commit -m "Initial commit"
    git push -u origin master
    #OK
}

###
### STEP 2 ### Routes
### Link: https://adonisjs.com/docs/4.1/routing
{
  cd start/routes.js
  /query_string
}

###
### STEP 3 ### Controller
### Link: https://adonisjs.com/docs/4.1/controllers
{
  adonis make:controller RequestCheck --type http
}

###
### STEP 4 ### Eslint
### Link: https://forum.adonisjs.com/t/eslint-integration/172/2
{
  .eslintrc
  .eslintignore
  npm install eslint
  npm install eslint-config-airbnb-base
  npm install eslint-plugin-import
}

###
### STEP 5 ### View
### Link: https://adonisjs.com/docs/4.1/views
{
  adonis make:view hello-world
  Route.get('hello_world', ({ view }) => view.render('hello-world'));
}

###
### STEP 6 ### REDIS
### Link: https://adonisjs.com/docs/4.1/redis
{
  adonis install @adonisjs/redis
  start/app.js:     '@adonisjs/redis/providers/RedisProvider'

  RUN:REDIS
  {
    new_terminal: redis-server /usr/local/etc/redis.conf
    new_terminal: redis-cli ping
                  redis-cli CONFIG GET databases
                  redis-cli INFO keyspace
                  redis-cli -n 0              ###select database 0
                    KEYS *
                    MSET new_key 420
                    MGET new_key
  }

  config/session.js:    redis: {
                          host: '127.0.0.1',
                          port: 6379,
                          password: null,
                          db: Env.get('SESSION_REDIS_DB', 0),
                          keyPrefix: ''
                        }

  .env:                 SESSION_DRIVER=redis
                        SESSION_REDIS_DB = 1
  adonis make:controller Redis --type http
  start/routes.js:      Route.get('/redis', 'RediController.showSession');
}


###
### STEP 7 ### Websocket
### Link: https://adonisjs.com/docs/4.1/websocket
### Link: https://gist.github.com/thetutlage/7f0f2252b4d22dad13753ced890051e2
{
  adonis install @adonisjs/websocket
  starts/app.js FIRST_LINE: '@adonisjs/websocket/providers/WsProvider'
  server.js:      .wsServer() // boot the WebSocket server
  adonis make:view chat
  adonis make:controller WebsocketPage --type http
}


###
### STEP 8 ### Telegram
### Link: https://adonisjs.com/docs/4.1/websocket
### Link: https://gist.github.com/thetutlage/7f0f2252b4d22dad13753ced890051e2
{
  HTTP API: TELEGRAM_TOKEN
  https://api.telegram.org/botTELEGRAM_TOKEN/getme
}
{
  adonis make:controller Telegram --type http
  start/routes.js:  Route.post('/tel', 'TelegramController.webhook');
  config/shield.js: filterUris: ['/tel'],
}
{ SCRIPT WORK
  sh tunnel.sh
}
{ HEAD WORK
  lt -p 3333 -s chatgate --print-requests
  https://api.telegram.org/botTELEGRAM_TOKEN/getWebhookInfo

  curl -X POST \
  https://api.telegram.org/botTELEGRAM_TOKEN/setWebhook \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "url": "https://sour-otter-10.localtunnel.me/tel"
  }'
}


###
### STEP 9 ### Telegram Send Massage
### Link: https://core.telegram.org/bots/api
{
    curl -X POST \
    https://api.telegram.org/botTELEGRAM_TOKEN/sendMessage \
    -H 'Content-Type: application/json' \
    -H 'cache-control: no-cache' \
    -d '{
      "chat_id": 193668219,
      "text": "ok"
  }'
}


###
### STEP 10 ### tensorflow PoseNet
### Link: https://www.npmjs.com/package/@tensorflow-models/posenet
{
    npm install @tensorflow-models/posenet
    npm install @tensorflow/tfjs-core
    npm install @tensorflow/tfjs-converter
    npm install rollup@
    npm install @tensorflow/tfjs-node

    npm install canvas  https://www.npmjs.com/package/canvas
    brew install pkg-config cairo pango libpng jpeg giflib librsvg

    npm insatall @tensorflow/tfjs

    https://www.tensorflow.org/js/guide/nodejs tf.browser.fromPixels tf.browser.toPixels

    https://www.npmjs.com/package/@tensorflow-models/posenet
    https://www.npmjs.com/package/canvas
    https://github.com/tensorflow/tfjs/issues/594
    https://github.com/tensorflow/tfjs/issues/1414
}
