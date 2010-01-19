var sys = require('sys'),
	assert = require('assert');
	xml2object = require('../lib/xml2object');

var tests = [];

// Basic XML
tests.push(function() {
	var xml = "<root><item name=\"value\">text</item></root>";
	var expected = {
		root: {
			item: {
				attrs: {
					name: "value"
				},
				content: "text"
			}
		}
	};

	assert.equal(xml2object.parseString(xml), expected, "Should parse basic XML string");
});

for(var i=0; i<tests.length; i++) {
	tests[i]();
}