#!/home/jonk/.nvm/versions/node/v16.2.0/bin/node
/*
 * ISC License
 *
 * Copyright 2021 Jonathan Kelly jonathan.p.h.kelly@gmail.com
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
 * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

var joystick = new (require('./node_modules/joystick'))(0, 3500, 350);
var spawn = require("child_process").spawn;

var pid = 0;
var longest = 220;
var shortest = 120;
var gap = 20;
var keyDnT = Date.now();
var keyUpT = Date.now();
var buffer = [];
var inactive = false;
var delta = 0;
var keyIsDown = false;


/*
 * The length of a dot is 1 time unit.
 * A dash is 3 time units.
 * The space between symbols (dots and dashes) of the same letter is 1 time unit.
 * The space between letters is 3 time units.
 * The space between words is 7 time units.
 */

function translate(st) {
	var letter = "";
	switch(st) {
		case "di dah": letter = "A";
			break;
		case "dah di di di":  letter = "B";
			break;
		case "dah di dah di": letter = "C";
			break;
		case "dah di di": letter = "D";
			break;
		case "di": letter = "E";
			break;
		case "di di dah di": letter = "F";
			break;
		case "dah dah di": letter = "G";
			break;
		case "di di di di": letter = "H";
			break;
		case "di di": letter = "I";
			break;
		case "di dah dah dah": letter = "J";
			break;
		case "dah di dah": letter = "K";
			break;
		case "di dah di di": letter = "L";
			break;
		case "dah dah": letter = "M";
			break;
		case "dah di": letter = "N";
			break;
		case "dah dah dah": letter = "O";
			break;
		case "di dah dah di": letter = "P";
			break;
		case "dah dah di dah": letter = "Q";
			break;
		case "di dah di": letter = "R";
			break;
		case "di di di": letter = "S";
			break;
		case "dah": letter = "T";
			break;
		case "di di dah": letter = "U";
			break;
		case "di di di dah": letter = "V";
			break;
		case "di dah dah": letter = "W";
			break;
		case "dah di di dah": letter = "X";
			break;
		case "dah di dah dah": letter = "Y";
			break;
		case "dah dah di di": letter = "Z";
			break;
		case "di dah dah dah dah": letter = "1";
			break;
		case "di di dah dah dah": letter = "2";
			break;
		case "di di di dah dah": letter = "3";
			break;
		case "di di di di dah": letter = "4";
			break;
		case "di di di di di": letter = "5";
			break;
		case "dah di di di di": letter = "6";
			break;
		case "dah dah di di di": letter = "7";
			break;
		case "dah dah dah di di": letter = "8";
			break;
		case "dah dah dah dah di": letter = "9";
			break;
		case "dah dah dah dah dah": letter = "0";
			break;
		case "di dah di dah di": letter = "_AR_";
			break;
		case "di dah di di di": letter = "_AS_";
			break;
		case "dah di di di dah": letter = "_BT_";
			break;
		case "di di di dah di dah": letter = "_SK_";
			break;
		case "dah di di di dah di dah": letter = "_BK_";
			break;
		case "di dah di dah": letter = "_AA_\n";
			break;
		case "di dah di dah di dah": letter = ".";
			break;
		case "di di dah dah di di": letter = "?"
			break;
		case "di di di di di di di di": letter = "_CORRECTION_"
			break;
		default:
			letter = '_';
	}
	process.stdout.write(letter);
}

function detectCharacterEnd() {
	const timeSinceKeyUp = Date.now() - keyUpT;
	if (! keyIsDown) {
		if (buffer.length > 0) {
			if (timeSinceKeyUp > 1.5*shortest) {
				// end of character
				newLetter = true;
				const st = buffer.join(' ');
				translate(st);
				buffer = [];
			}
		}
		if (! inactive && (timeSinceKeyUp > 6*shortest)) {
			// end of word
			inactive = true;
			process.stdout.write(" ");
		}
	}
}

function shortPress(t) {
	const dFromShortest = Math.abs(t - shortest);
	const dFromLongest = Math.abs(t - 3*shortest);
	return (dFromShortest < dFromLongest);
}

function killTone() {
	if (pid !== 0) {
		process.kill(pid.pid)
		pid = 0;
	}
}

function makeTone() {
	// change this to match available tone generation utility on your
	// system
	pid = spawn("padsp", [ "tones", "1000", "600" ], {detached: true});
}

function keyEvent(data) {
	if (data.value > 0) {
		keyIsDown = true;
		keyDnT = Date.now();
		makeTone();
		inactive = false;
	} else if (data.value === 0) {
		keyIsDown = false;
		keyUpT = Date.now();
		killTone();
		inactive = false;

		delta = keyUpT - keyDnT;
		if (shortPress(delta)) {
			buffer.push('di');
			shortest = (3*shortest + delta)/4;
		} else {
			buffer.push('dah');
			longest = (3*longest + delta)/4;
		}
		shortest = longest/3;
	}
}


joystick.on('button', keyEvent);

setInterval(detectCharacterEnd, shortest/3);

