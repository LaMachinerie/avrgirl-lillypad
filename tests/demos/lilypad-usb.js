var Avrgirl = require('../../lite-avrgirl-lilypad');
var avrgirl = new Avrgirl({
  board: 'lilypad-usb',
  debug: true
});

var hex = __dirname + '/../../junk/hex/lilypad-usb/Blink.cpp.hex';

avrgirl.flash(hex, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('done.');
  }
});
