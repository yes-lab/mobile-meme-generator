var $ = require('jquery'),
    config = require('../config.json');

function postToImgur(img) {
  var id;

  // This is dumb but it's to circumvent a mysterious iOS Chrome bug that
  // causes the page to never redirect.
  var pinger = setInterval(function() {
    if (id) {
      clearInterval(pinger);
      $('#loading').hide();
      window.location.hash = id;
    }
  }, 100);

  $.ajax({
    url: 'https://api.imgur.com/3/image',
    type: 'POST',
    headers: {
      Authorization: 'Client-ID ' + config.imgur_client_id,
      Accept: 'application/json'
    },
    data: {
      image: img.src.replace('data:image/png;base64,', ''),
      type: 'base64'
    },
    success: function(result) {
      id = result.data.id;
    },
    error: function(e) {
      $('#msg').text('Error: ' + JSON.stringify(e));
    }
  });
  
}

module.exports = postToImgur;
