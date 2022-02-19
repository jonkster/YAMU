# YAMU

## Yet Another Morse Utility

### A simple application to assist interfacing a morse key to a PC

Overview
---------

This application detects a joystick button press and generates a tone, allowing
a morse key interface to a PC (eg as a morse practice oscilator).  It also
attempts to map the generated button pressea, representing morse key clicks,
into characters.

It is very rudimentary.

Intended Use
------------
It is desgined to be used as a practice/training tool for Morse.
It assumes a morse key is coonected in such a way as to simulate a Joystick
button.

This can be done using a suitably programmed Arduino Leonardo (or an Arduino
Uno that has been set up to simulate a HID device).

There is a separate project that describes how this can be done. (Link
Missing).

What it Does
-------------

When a key/button press is detected by the program it generates a tone (same as
a practice oscillator).  It also attempts to decipher the presses into
characters and will display them on the screen (ie it is a code reader).


Environment
-----------

It is run using nodejs and so far is only for use on Linux systems.

It calls a tone generation utility "tones" from the "siggen" package.

Installation
------------

Copy the files:
```
morse.js
package-lock.json
package.json
```
to a directory.

In that directory do:
```
npm install
```

The application can then be run using:
```
node morse.js
```



Example Hardware
------------------

TO DO

License
---------

ISC License

Copyright 2021 Jonathan Kelly jonathan.p.h.kelly@gmail.com

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


