
var fs = require('fs');

var jsdom = require('jsdom');
var document = jsdom.jsdom('<html><head></head><body></body></html>');
var window = document.defaultView;

run();

function run() {
	var content = fs.readFileSync('weike-s.txt').toString().trim();
	var rows = content.split('\n');

	var allObj=[];
	for (let i = 0; i < rows.length; i++) {
		let oneObj = {};

		let div = document.createElement('div');
		div.innerHTML = rows[i];

		let font = div.getElementsByTagName('font')[0];
		font.parentNode.removeChild(font);

		let word = font.childNodes[0].textContent.trim();
		oneObj.word = word;

		let p = div.getElementsByTagName('p')[0];
		let pText = p.textContent.trim();

		let arr = [];
		let sections = pText.split('\\n');
		for (let j = 0; j < sections.length; j++) {
			let sec = sections[j].trim();
			
			if (sec && sec.indexOf('[') > -1) {
				oneObj.pron=sec.trim();
			}
			else {
				if (sec !== "") {
					arr.push(sec);
				}
			}
		}
		
		oneObj.definition=arr;
		allObj.push(oneObj);
	}
	fs.writeFileSync('result.txt',JSON.stringify(allObj,null,4));
}