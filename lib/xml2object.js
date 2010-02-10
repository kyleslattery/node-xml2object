var sys = require("sys"),
	xml = require("../vendor/node-xml/lib/node-xml");

var Element = function() {
	this.toString = function() {
		return this['content'] || "";
	}
}

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
			
			// Check if the element already exists. If it does, this should be an array.
			if(typeof(obj[elem]) === "undefined") {
				// Doesn't already exist, so just create a standard object.
				obj[elem] = new Element();
			
				current_object = obj[elem];
			} else if(obj[elem].constructor == Array) {
				// It does already exist, and it's already an array
				current_object = new Element();
				obj[elem].push(current_object);
			} else {
				// It already exists, and it's an object, so it needs to be changed to an array
				var old_obj = obj[elem];
				
				current_object = new Element();
								
				obj[elem] = [];
				obj[elem].push(old_obj);
				obj[elem].push(current_object);
			}
			current_tree.push(elem);
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
	return new Parser().parseString(string);	
}