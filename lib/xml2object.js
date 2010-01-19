var sys = require("sys"),
	xml = require("../vendor/node-xml/lib/node-xml");

var Parser = function() {
	var p = this;
	var promise = null;
	p.array = {};
	
	p.parser = new xml.SaxParser(function(cb) {
		var current_tree = [];
		
		function getCurrentObject() {
			if(current_tree.length == 0) return p.array;
			
			var obj = p.array[current_tree[0]];
			
			for(var i = 1; i<current_tree.length; i++) {
				obj = obj[current_tree[i]];
			}
			
			return obj;
		}
		
		// TODO: Make this support prefixes and URIs
		cb.onStartElementNS(function(elem, prefix, uri) {
			var obj   = getCurrentObject();
			obj[elem] = {};
			current_tree.push(elem);
		});
		
		cb.onCharacters(addContent);
		cb.onCdata(addContent);
		
		function addContent(str) {
			var obj = getCurrentObject();
			if(typeof(obj["content"]) == "undefined") obj["content"] = "";
			
			obj["content"] += str;
		}
		
		cb.onEndElementNS(function(elem, prefix, uri) {
			current_tree.pop();
			if(current_tree.length == 0) {
				promise.emitSuccess(p.array);
			}
		});
	});
	
	p.parseString = function(string) {
		promise = new process.Promise();
		p.parser.parseString(string);
		
		return promise;
	}
}

// Returns eventEmitter
exports.parseString = function(string) {
	var parser  = new Parser();
	return parser.parseString(string);	
}