/* jshint devel:true */

var $ = require('jquery');

function processHash() {
  var hash = window.location.hash.slice(1);
  if (hash) {
    $('#social').addClass('active');
    $('#uploader').removeClass('active');
    require('./share')(hash);
  } else {
    $('#social').removeClass('active');
    $('#uploader').addClass('active');
    require('./home');
  }
}

window.addEventListener('hashchange', processHash);
processHash();
