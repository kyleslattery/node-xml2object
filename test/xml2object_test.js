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
	
	it("should have correct values", function() {
		var response = this.response.wait();
		assert.equal(response.root.item.content, "text")
	})
	
describe("XML String with array")
	before(function() {
		this.xml = "<root><items><item>test1</item><item>test2</item><item>test3</item></items></root>";
		this.response = xml2object.parseString(this.xml);
	})
	
	it("should return object with array of items", function() {
		var response = this.response.wait();
		assert.equal(response.root.items.item[0], "test1")
		assert.equal(response.root.items.item[1], "test2")
		assert.equal(response.root.items.item[2], "test3")
	})
	
describe("Complicated XML String")
	before(function() {
		this.xml = "<root><items><item><name>test1</name><value>value1</value></item><item><name>test2</name><value>value2</value></item></items></root>";
		this.response = xml2object.parseString(this.xml);
	})
	
	it("should return proper array", function() {
		var response = this.response.wait();
		
		assert.equal(response.root.items.item[0].name, 'test1')
		assert.equal(response.root.items.item[0].value, 'value1')
		assert.equal(response.root.items.item[1].name, 'test2')
		assert.equal(response.root.items.item[1].value, 'value2')
	})
	
describe("XML with attributes")
	before(function() {
		this.xml = "<root><items><item id='1' type='widget'><name>test1</name></item><item id='2' type='vidget'><name>test2</name></item><item><name>test3</name></item></items></root>";
		this.response = xml2object.parseString(this.xml);
	})
	
	it("should return correct values from attr()", function(){
		var response = this.response.wait();

		assert.equal(response.root.items.item[0].attr('id'), '1');
		assert.equal(response.root.items.item[0].attr('type'), 'widget');
		assert.equal(response.root.items.item[1].attr('id'), '2');
		assert.equal(response.root.items.item[1].attr('type'), 'vidget')
	})
	
	it("should still have correct elems", function() {
		var response = this.response.wait();
		
		assert.equal(response.root.items.item[0].name, 'test1');
		assert.equal(response.root.items.item[1].name, 'test2');
	})
	
	it("should return proper object for attrs() for elems with attrs", function() {
		var response = this.response.wait();
		
		assert.equal(response.root.items.item[0].attrs().id, '1');
		assert.equal(response.root.items.item[0].attrs().type, 'widget');
		assert.equal(response.root.items.item[1].attrs().id, '2');
		assert.equal(response.root.items.item[1].attrs().type, 'vidget');
	})
	
	it("should return empty object for attrs() if no attributes", function() {
		var response = this.response.wait();

		assert.deepEqual(response.root.items.item[2].attrs(), {});
	});
	
	it("should return null if attr not defined", function() {
		var response = this.response.wait();
		
		assert.equal(response.root.items.item[1].attr("asdf"), null);
	})
	