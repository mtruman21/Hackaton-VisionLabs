'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const querystring = require('querystring');

const Route = use('Route');
Route.get('/', () => 'Hello Lasy hot dog');
Route.get('/hello', () => 'Hello Adonis');

Route.post('/tel', 'TelegramController.webhook');
Route.get('/tel', 'TelegramController.webhookNotGet');
// http://127.0.0.1:3333/tf
Route.get('/tf', 'TensorflowController.testRequest');
Route.get('/pn', 'TensorflowController.testPosenet');
Route.get('/ok', 'NewControlController.ok');
