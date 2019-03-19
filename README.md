[![Build Status](https://travis-ci.org/noopkat/lite-avrgirl-lilypad.svg?branch=master)](https://travis-ci.org/noopkat/lite-avrgirl-lilypad) [![Coverage Status](https://coveralls.io/repos/noopkat/lite-avrgirl-lilypad/badge.svg?branch=master&service=github)](https://coveralls.io/github/noopkat/lite-avrgirl-lilypad?branch=master)

# lite-avrgirl-lilypad

A lighter version of avrgirl-arduino for flashing compiled sketch files to lilypad boards.

## What is this?

lite-avrgirl-lilypad is a NodeJS library written to present a convenient way to upload precompiled sketches to an Arduino lilypad.

## How to install

1. Install NodeJS from [nodejs.org](http://nodejs.org)
2. Run `npm install lite-avrgirl-lilypad` in your shell of choice

## For Windows 7 users

We are working on driver compatibility issues on W7. Be patient !

## How do I use it?

Your first task is to source a pre-compiled .hex file of the sketch you're interested in uploading to your Arduino. It needs to be compiled for your specific Arduino. You'll find some example hex files for each board within the `junk/hex` folder of this repo, however if you'd like to use your own, [see this guide](#sourcing-a-compiled-arduino-hex-file) if you're unsure of how to go about this.

Already have a .hex file in a Buffer object ready to go? No problem! Pass this Buffer object in instead of the file path string, and lite-avrgirl-lilypad will take care of the rest. Hooray!

The following example code should get you up and running with an Arduino Uno:

```javascript
var Avrgirl = require('lite-avrgirl-lilypad');

var avrgirl = new Avrgirl({});

avrgirl.flash('Blink.cpp.hex', function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('done.');
  }
});

```

You can optionally specify a port to connect to the Arduino, but if you omit this property avrgirl will do a pretty good job of finding it for you.

Specifying the port would look something like this:

```javascript
var avrgirl = new Avrgirl({
  port: '/dev/cu.usbmodem1412'
});
```

You can list available USB ports programmatically using the the `list` method:

```javascript
Avrgirl.list(function(err, ports) {
  console.log(ports);
  /*
  [ { comName: '/dev/cu.usbmodem1421',
  	   manufacturer: 'Arduino (www.arduino.cc)',
      serialNumber: '55432333038351F03170',
      pnpId: '',
      locationId: '0x14200000',
      vendorId: '0x2341',
      productId: '0x0043',
      _standardPid: '0x0043' } ]
  */
});
```

Alternatively, you can use the CLI to list active ports:

```
$ lite-avrgirl-lilypad list
[ { comName: '/dev/cu.usbmodem1421',
  	 manufacturer: 'Arduino (www.arduino.cc)',
    serialNumber: '55432333038351F03170',
    pnpId: '',
    locationId: '0x14200000',
    vendorId: '0x2341',
    productId: '0x0043',
    _standardPid: '0x0043' } ]
```

**Like logs?** Turn on debug mode to see simple flashing progress logs in the console:

```javascript
var avrgirl = new Avrgirl({
  // turn on debug mode!
  debug: true
});
```

A sample:

```
found uno on port /dev/cu.usbmodem14141
connected
flashing, please wait...
flash complete.
```

**Prefer your own custom debug behaviour?** No Problem!

You can pass in your own debug function instead of a boolean, and lite-avrgirl-lilypad will run that instead.

Example:

```javascript
var myCustomDebug = function(debugLogString) {
  // do your own debug stuff in here
}

var avrgirl = new Avrgirl({
  // turn on debug with your own function
  debug: myCustomDebug
});
```

## Can I use lite-avrgirl-lilypad as a CLI tool?

### You sure can!

Run `npm install -g lite-avrgirl-lilypad` in a shell session to install globally for easy CLI use.

The same example above would look like the following as a CLI call in your shell:

`lite-avrgirl-lilypad flash -f Blink.cpp.hex`

Required flags:

+ **-f** specify the location of the hex file to flash

Optional flags:

+ **-p** will allow you to specify the port where your Arduino is plugged in.
+ **-v** will turn on debug/verbose mode, which will print a log of things when you run the command.

As well as listing all available USB devices on your computer:

`lite-avrgirl-lilypad list`

The output will be presented in JSON format, very similar to the output of the `Serialport.list()` method (if you've used [node-serialport](https://github.com/voodootikigod/node-serialport) before).

## Sourcing a compiled Arduino hex file

A .hex file is the compiled end result of an Arduino sketch file. I have provided some example hex files for each board within the `junk/hex` folder of this repo. Feel free to use these, or if you're after something specific not provided, see the directions below.

The most common way to compile a sketch for your Arduino of choice is to download and install the [Arduino IDE](https://www.arduino.cc/en/Main/Software). Ensure you install version 1.6.5 or greater for the following steps.

1. Open the sketch file you'd like to export, or write a new one if you need to. 
2. Choose the correct target Arduino board you want to compile the hex file for, from the Tools -> Board menu.
3. Export your hex file by navigating to Sketch -> Export compiled binary
![screenshot of the Sketch menu in Arduino IDE with Export compiled binary menu item highlighted in blue](http://f.cl.ly/items/0r1A082H3U3G0U2z1Z40/export_bin.png)
4. You can find the exported hex file in the same directory your sketch file is located in.