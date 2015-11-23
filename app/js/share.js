var $ = require('jquery'),
    imageId = window.location.hash.replace(/<(?:.|\n )*?>/gm, '');

if (!imageId) {
  window.location = '/';
}

$(function() {
  var pic = 'https://i.imgur.com/' + imageId.replace('#', '') + '.png';
  $('#imgur-pic').attr('src', pic);
  $('#page-link').attr('href', window.location.href);
  // If the image fails to load
  $('#imgur-pic').on('error', function(err) {
    window.location = '/';
  });
  $('#facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pic));
  $('#twitter').attr('href', 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(pic) + '&text=Foo bar!&hashtags=foo');
  $('#google-plus').attr('href', 'https://plus.google.com/share?url=' + encodeURIComponent(pic));
  $('#pinterest').attr('href', 'https://pinterest.com/pin/create/button/?&media=' + pic + '&description=foo bar!&url=' + encodeURIComponent(pic));
});
