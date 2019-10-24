let ws = null
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
  ws = adonis.Ws('ws://localhost:3333',{query:{id:window.username}}).connect()
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
      $('.messages').append(`
        <div class="message"><h3><b> ${message.username} </b></h3> <p><a href=${message.body}>${message.body}</a></p> </div>
      `)
    } else {
      $('.messages').append(`
        <div class="message"><h3><b> ${message.username} </b></h3> <p> ${message.body} </p> </div>
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
