var sys = require('sys'),
	assert = require('assert'),
	xml2object = require('../lib/xml2object');
	
process.mixin(GLOBAL, require('../vendor/ntest/lib/index'));

describe("Basic XML String parse with parseString")
	before(function() {
		this.xml = "<root><item>text</item></root>";
		this.response = xml2object.parseString(this.xml);
	})

	it("should accept success callback", function() {
		var response = this.response;
		
		assert.doesNotThrow(function() {
			response.addCallback(function() {return true;})
		}, "TypeError");
	})
	
	it("should return proper object for the XML", function() {
		var response = this.response.wait();
		assert.deepEqual(response, {
			root: {
				item: {
					content: "text"
				}
			}
		})
	})
	
describe("XML String with array")
	before(function() {
		this.xml = "<root><items><item>test1</item><item>test2</item><item>test3</item></items></root>";
		this.response = xml2object.parseString(this.xml);
	})
	
	it("should return object with array of items", function() {
		var response = this.response.wait();

		assert.deepEqual(response, {
			root: {
				items: {
					item: [
						{
							content: "test1"
						},
						{
							content: "test2"
						},
						{
							content: "test3"
						}
					]
				}
			}
		})
	})
	