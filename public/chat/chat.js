import { url_app } from './var.js';

let ws = null;
let inputElement = document.getElementById("my-file-selector");
let fileList;

// https://developer.mozilla.org/ru/docs/Web/API/File/Using_files_from_web_applications
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  fileList = this.files; /* теперь вы можете работь со списком файлов */
  $('#message').val(fileList[0].name);
}

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
  document.getElementById("qrcode").className = "qrfield-dark";
  document.getElementById("msg_connect").className = "qrfield-dark";
  $('#msg_connect').addClass('invisible')
}

function startChat () {
  ws = adonis.Ws(`${url_app}`,{query:{id:window.username}}).connect()

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
      $('#chatfield').append(`
        <div class="msg alert alert-dark text-wrap">
          <span class="badge text-success">${message.username}</span>
          <br>
          &nbsp <a href=${message.body}>Link</a>
        </div>
      `)
    } else {
      $('#chatfield').append(`
        <div class="msg alert alert-dark text-wrap">
          <span class="badge text-success">${message.username}</span>
          <br>
          &nbsp ${message.body}
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

$('#btn-send').click(function () {

    let message;
    if (!_.isEmpty(fileList))
    {
      sendFile();
      $('#message').val('')
      return ;
    }
    message = $('#message').val();
    $('#message').val('')

    ws.getSubscription('chat').emit('message', {
      username: window.username,
      body: message
    })
    return ;
})

function sendFile() {
            var file = fileList[0];
            const formData = new FormData();
            formData.append('file_from_client', file);

            fetch(`http://127.0.0.1:3333/upload?id=${window.username}`, {
              method: 'POST',
              body: formData,
            }).then(response => {
              console.log(response)
            })
}
