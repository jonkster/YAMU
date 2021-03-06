# YAMU

## Yet Another Morse Utility

### A simple application to assist interfacing a morse key to a PC

Overview
---------

This application detects a USB connected joystick button press and generates a
tone, allowing a morse key interface to a PC (eg as a morse practice
oscilator).  It also attempts to map the generated button presses,
(representing morse key clicks), into characters.

It assumes a morse key is interfaced to the computer in a way that simulates a
Joystick.  An example of how a morse key can be interfaced in such a way is
described below.

It is very rudimentary.  Feel free to take and adapt to your own purposes.

What it Does
-------------

When a key/button press is detected by the program it generates a tone (same as
a practice oscillator).  It also attempts to decipher the presses into
characters and will display them on the screen (ie it is a code reader).


Intended Use
------------
It is designed to be used as a practice/training tool for Morse.

In addition it could also be used when operating a transmitter, (assuming you
have interfaced the key to both your PC and your transmitter). It can then
display on screen the characters you are keying (NB it does not decode
reception, only what you send).


Environment
-----------

It is run using nodejs and so far is only for use on Linux systems.

It calls a tone generation utility "tones" from the "siggen" package.

This will need to be installed (if you can use another tone generation
utility, you will need to modify the code to use it).

Code translation
-----------------

Do not expect miracles!  

The code translation from key presses to characters is pretty simple.

It is not perfect, it cannot match a human who can filter out quite noticeable
variations from 'perfect' timing.  The closer the keying is to properly timed
Morse, the better it will be.

It should gradually adapt to the speed and spacing you are using so may improve
in accuracy as you send.

Hopefully it will be useful in improving your timing.

Installation
------------

1. Check you can generate an audible tone using the "tones" utility on your PC
   using the following from the command line:
```
padsp tones 1000 600
```

You should hear a 600Hz tone.  If not you may need to install tones.  On Ubuntu
and Debian systems you could try:
```
sudo apt install siggen
```

NB if you cannot get a tone this way either you will need to work out how to
install the appropriate components OR if you can generate a tone in another way
and modify the morse.js code to use that system.  Otherwise YAMU will not be
useable.

2. Copy the files:
```
morse.js
package-lock.json
package.json
```
to a directory.

3. In that directory do:
```
npm install
```

4. The application can then be run using:
```
node morse.js
```


Example Hardware
------------------


This can be done using a suitably programmed Arduino Leonardo (or an Arduino
Uno that has been set up to simulate a HID device).

There is a separate project that describes how this can be done. (Link
Missing).

TO DO


Jon Kelly
VK2JHK


License
---------

```
ISC License

Copyright 2021 Jonathan Kelly jonathan.p.h.kelly @ gmail.com

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

