Description
======
This is a node.js module to transform XML into a JS object.  It currently relies on the [node-xml](http://github.com/robrighter/node-xml) and [ntest](http://github.com/technoweenie/ntest) libraries, both of which are installed as git submodules in `vendor/`.  I'm going to have to find a better way to deal with them.

Usage
=====
Say you have the following XML you'd like to transform, in a string:

    <root>
      <videos total="2">
        <video id="1" length="20">
          <title>Video 1</title>
        </video>
        <video>
          <title>Video 2</title>
        </video>
      </videos>
    </root>

Just do the following:

    var sys        = require('sys'),
        xml2object = require('./xml2object');
        
    var xml        = "YOUR XML STRING";
    var response   = xml2object.parseString(xml);
    
    response.addCallback(function(obj) {
      
      // To output a simple value, just use as an object
      // Since there are 2 video elements under <videos>, it's stored as an array
      sys.puts(obj.root.videos.video[0].title) // outputs "Video 1"
      
      // attr(key) returns the value for attribute with name "key"
      sys.puts(obj.root.videos.attr("total")) // outputs "2"
      
      // attrs() returns an object of all attributes
      sys.puts(obj.root.videos.video[0].attrs().length); // outputs "20"
    });