/* jshint devel:true */

require('../../node_modules/watermarkjs/index');

var exif = require('exif-js'),
    isMobile = require('is-mobile')(),
    $ = require('jquery');

var hashtag = window.location.hash.replace(/<(?:.|\n )*?>/gm, '').substring(1) || '#mobilememer',
    fr = new FileReader(),
    uploadPic = $('#pic'),
    loading = $('#loading'),
    uploading = $('#uploading'),
    showPic = $('#show-pic');

console.log(isMobile)
isMobile ? $('#camera-icon').show() : $('#upload-icon').show();

function base64ToArrayBuffer(base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function postToImgur(img) {
  var auth = 'Client-ID f0972432933fc36',
      id;
  // This is dumb but it's to circumvent a mysterious iOS Chrome bug that
  // causes the page to never redirect.
  var pinger = setInterval(function() {
    if (id) {
      clearInterval(pinger);
      window.location = window.location.href + 'share/#' + id;
    }
  }, 100);
  $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
          Authorization: auth,
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

uploadPic.change(function(e) {
  
    e.preventDefault();
  
    var file = this.files[0];

    loading.show();
    $('#uploader').hide();
    
    fr.onload = function(e) {

        var canvas, context,
            img = new Image(),
            orientation = exif.readFromBinaryFile(base64ToArrayBuffer(this.result)).Orientation;

        img.src = e.target.result;
        canvas = document.createElement('canvas');

        img.onload = function() {
          var w = 800,
              h = w * img.height / img.width;

          canvas.height = h;
          canvas.width = w;

          if (orientation === 6 || orientation === 8) {
            canvas.height = w;
            canvas.width = h;
          }

          context = canvas.getContext('2d');

          if (orientation === 6) {
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(90 * Math.PI / 180);
            context.drawImage(img, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width);
          } else if (orientation === 8) {
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(270 * Math.PI / 180);
            context.drawImage(img, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width);
          } else if (orientation === 3) {
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(180 * Math.PI / 180);
            context.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
          } else {
            context.drawImage(img, 0, 0, w, h);
          }
          
          watermark([canvas.toDataURL()])
            .image(watermark.text.center(hashtag, '120px Impact, Arial', '#fff', 1,  null, '#000', 5))
            .then(function (img) {
              postToImgur(img);
              $('#msg').text('Almost done...');
            });
        } 

    };
    fr.readAsDataURL(file);
    
    return false;
});
