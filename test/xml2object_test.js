var sys = require('sys'),
	assert = require('assert');
	xml2object = require('../lib/xml2object');
	
process.mixin(GLOBAL, require('../vendor/ntest/lib/index'));

describe("Basic XML String parse with parseString")
	before(function() {
		this.xml = "<root><item name=\"value\">text</item></root>";
		this.response = xml2object.parseString(this.xml);
	})

	it("should return EventEmitter", function() {
		sys.puts(this.response.constructor.toString().match(/eventemitter/i));
		assert.notEqual(this.response.constructor.toString().match(/eventemitter/i), null);
	})
	
// 
// var tests = [];
// 
// // Basic XML
// tests.push(function() {
// 	var expected = {
// 		root: {
// 			item: {
// 				attrs: {
// 					name: "value"
// 				},
// 				content: "text"
// 			}
// 		}
// 	};
// 
// 	assert.equal(xml2object.parseString(xml), expected, "Should parse basic XML string");
// });
// 
// for(var i=0; i<tests.length; i++) {
// 	tests[i]();
// }