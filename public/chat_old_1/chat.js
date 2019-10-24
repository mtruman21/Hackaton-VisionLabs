import { url_app } from './var.js';

let ws = null;
var qrcode = new QRCode("qrcode");

$(function () {
  // Only connect when username is available
  //if (window.username) {
    startChat()
  //}
})

function hideQR () {
  var dv = document.getElementById('qrcode');
  while (dv.hasChildNodes()) {
  dv.removeChild(dv.lastChild);
  }
  var img = document.createElement("IMG");
  img.src = "/link_big256.png";
  dv.appendChild(img);
}

function startChat () {
  ws = adonis.Ws(`wss://${url_app}`,{query:{id:window.username}}).connect()
  qrcode.makeCode(`https://telegram.me/ChatGateBot?start=${window.username}`);

  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    subscribeToChannel()
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })
}

function subscribeToChannel () {
  const chat = ws.subscribe('chat')

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  chat.on('message', (message) => {
    if (message.body.startsWith('http')) {
      $('.chat__conversation-board__message__context').append(`
        <div class="chat__conversation-board__message__bubble">
          <span>
            <b><font color="rgb(120,230,120)">${message.username}
            </font></b>
            <br><a href=${message.body}>${message.body}</a>
          </span>
        </div>
      `)
    } else {
      $('.chat__conversation-board__message__context').append(`
        <div class="chat__conversation-board__message__bubble">
          <span>
            <b class="chat-name">${message.username}
            </b>
            <br>${message.body}
          </span>
        </div>
      `)
    }

    hideQR ()
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    ws.getSubscription('chat').emit('message', {
      username: window.username,
      body: message
    })
    return
  }
})
