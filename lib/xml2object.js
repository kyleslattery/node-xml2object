var sys = require("sys"),
	xml = require("../vendor/node-xml/lib/node-xml");

var Element = function(parent) {
	var parent = parent;
	
	this.getParent = function() {
		return parent;
	}
	
	this.toString = function() {
		return this['content'] || "";
	}
}

var Parser = function() {
	var p = this;
	var promise = null;
	
	p.parser = new xml.SaxParser(function(cb) {
		var current_tree = [];
		var previous_object = null;
		var current_object = null;

		// TODO: Make this support prefixes and URIs
		cb.onStartElementNS(function(elem, prefix, uri) {
			// Set up object
			current_object = new Element(current_object);
			// Time to insert current_object into parent
			var parent = current_object.getParent();
			
			// If it has no parent, just return
			if(parent == null) return;
			
			// Determine how to add to parent
			if(typeof(parent[elem]) === "undefined") {
				// Parent doesn't have this element added yet, so just add it right to it
				parent[elem] = current_object;
			} else if(parent[elem].constructor == Array) {
				// Parent already has an array of elems, so just add it
				parent[elem].push(current_object);
			} else {
				// It already exists and is an object, so it needs to be converted to an array
				parent[elem] = [parent[elem], current_object];
			}
		});
		
		cb.onCharacters(addContent);
		cb.onCdata(addContent);
		
		function addContent(str) {
			if(typeof(current_object["content"]) == "undefined") current_object["content"] = "";
			current_object["content"] += str;
		}
		
		cb.onEndElementNS(function(elem, prefix, uri) {
			if(current_object.getParent() == null) {
				var obj = {};
				obj[elem] = current_object;
				promise.emitSuccess(obj);
			} else {
				var p = current_object
				current_object = current_object.getParent();
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