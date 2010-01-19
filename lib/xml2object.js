var sys = require("sys"),
	xml = require("../vendor/node-xml/lib/node-xml");

var Parser = function() {
	var p = this;
	var promise = null;
	var return_object = {};
	
	p.parser = new xml.SaxParser(function(cb) {
		var current_tree = [];
		var current_object = {};

		// TODO: Make this support prefixes and URIs
		cb.onStartElementNS(function(elem, prefix, uri) {
			
			// Determine current object before this element
			if(current_tree.length == 0) {
				var obj = return_object;
			} else {
				var obj = return_object[current_tree[0]];			
				for(var i = 1; i<current_tree.length; i++) {
					obj = obj[current_tree[i]];
				}
			}
			
			// Initialize new object for this element and set as current_object
			obj[elem] = {};
			current_tree.push(elem);
			
			current_object = obj[elem];
		});
		
		cb.onCharacters(addContent);
		cb.onCdata(addContent);
		
		function addContent(str) {
			if(typeof(current_object["content"]) == "undefined") current_object["content"] = "";
			
			current_object["content"] += str;
		}
		
		cb.onEndElementNS(function(elem, prefix, uri) {
			current_tree.pop();
			if(current_tree.length == 0) {
				promise.emitSuccess(return_object);
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