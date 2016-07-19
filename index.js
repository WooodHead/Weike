
var fs = require('fs');

var jsdom = require('jsdom');
var document = jsdom.jsdom('<html><head></head><body></body></html>');
var window = document.defaultView;

run();

function getArrayFromFile(fileName) {
	let content = fs.readFileSync('./input/' + fileName).toString().trim();
	let list = content.split('\n').map(function (one) {
			return one.trim();
		});
	console.log(fileName + ': ' + list.length);
	return list;
}

function run() {
	var oxford3000_content = fs.readFileSync('./input/oxford3000.json').toString().trim();
	var oxfordList = JSON.parse(oxford3000_content).map(function (obj) {
			return obj.word;
		});

	var rankList = getArrayFromFile('20k.txt');

	var cet4List = getArrayFromFile('cet4.txt');

	var cet6List = getArrayFromFile('cet6.txt');

	var tofelList = getArrayFromFile('tofel.txt');

	var greList = getArrayFromFile('gre.txt');

	//var content = fs.readFileSync('./input/test.txt').toString().trim();
	var content = fs.readFileSync('./input/weike-input.txt').toString().trim();

	var rows = content.split('\n');

	var allObj = [];
	for (let i = 0; i < rows.length; i++) {
		let oneObj = {};
		oneObj.definition = [];

		let div = document.createElement('div');
		div.innerHTML = rows[i].trim();

		let word = div.childNodes[0].textContent.trim();
		oneObj.word = word;

		if (oxfordList.indexOf(word) > -1) {
			oneObj.oxford3000 = true;
		}

		if (cet4List.indexOf(word) > -1) {
			oneObj.cet4 = true;
		}

		if (cet6List.indexOf(word) > -1) {
			oneObj.cet6 = true;
		}

		if (tofelList.indexOf(word) > -1) {
			oneObj.tofel = true;
		}

		if (greList.indexOf(word) > -1) {
			oneObj.gre = true;
		}

		var rank = rankList.indexOf(word);
		if (rank > -1) {
			oneObj.rank = rank;
		}

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
	fs.writeFileSync('./output/weike.json', JSON.stringify(allObj, null, 4));
}
