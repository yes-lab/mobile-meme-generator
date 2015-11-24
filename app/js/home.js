/* jshint devel:true */
require('../../node_modules/watermarkjs/index');

var exif = require('exif-js'),
    isMobile = require('is-mobile')(),
    $ = require('jquery'),
    config = require('./config.json'),
    base64ToArrayBuffer = require('./lib/base64ToArrayBuffer'),
    postToImgur = require('./lib/postToImgur'),
    fr = new FileReader();

isMobile ? $('#camera-icon').show() : $('#upload-icon').show();

$('#pic').on('change', function(e) {

  e.preventDefault();

  var file = this.files[0];

  $('#loading').addClass('active');
  $('#uploader').removeClass('active');

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
        .image(watermark.text.center(config.meme_text, '120px Impact, Arial', '#fff', 1, null, '#000', 5))
        .then(function(img) {
          postToImgur(img);
          $('#msg').text('Reticulating splines...');
        });
    }

  };

  fr.readAsDataURL(file);
});
