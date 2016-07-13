
var fs = require('fs');

var jsdom = require('jsdom');
var document = jsdom.jsdom('<html><head></head><body></body></html>');
var window = document.defaultView;

run();

function run() {
	var content = fs.readFileSync('weike-s.txt').toString().trim();
	var rows = content.split('\n');

	var allObj = [];
	for (let i = 0; i < rows.length; i++) {
		let oneObj = {};
		oneObj.definition = [];

		let div = document.createElement('div');
		div.innerHTML = rows[i].trim();

		let word = div.childNodes[0].textContent.trim();
		oneObj.word = word;

		let font = div.getElementsByTagName('font')[0];
		font.parentNode.removeChild(font);

		let p = div.getElementsByTagName('p')[0];

		for (let j = 0; j < p.childNodes.length; j++) {
			let c = p.childNodes[j];
			if (c.textContent &&
				c.textContent.trim() != "" &&
				c.textContent.trim() != "\\n" &&
				c.nodeName !== 'br') {
				if (c.textContent.indexOf('[') > -1) {
					oneObj.pron = c.textContent.replace('\\n', '');
				} else {
					oneObj.definition.push(c.textContent.replace('\\n', ''));
				}
			}
		}
		allObj.push(oneObj);
	}
	fs.writeFileSync('result.txt', JSON.stringify(allObj, null, 4));
}
