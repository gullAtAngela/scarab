var ScarabQueue = ScarabQueue || [];
(function(id) {
  if (document.getElementById(id)) return;
  var js = document.createElement('script'); js.id = id;
  js.src = '//cdn.scarabresearch.com/js/13F809CE8231683F/scarab-v2.js';
  var fs = document.getElementsByTagName('script')[0];
  fs.parentNode.insertBefore(js, fs);
})('scarab-js-api');