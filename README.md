Description
======
This is a node.js module to transform XML into a JS object.  It currently relies on the [node-xml](http://github.com/robrighter/node-xml) and [ntest](http://github.com/technoweenie/ntest) libraries, both of which are installed as git submodules in `vendor/`.  I'm going to have to find a better way to deal with them.

Contributors
============
- [Kyle Slattery](http://github.com/kyleslattery)
- [Fabian Jakobs](http://github.com/fjakobs)

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
    
To do
=====
1. Figure out better way to deal with module dependencies (node-xml and ntest)
2. Add support for prefixes in XML tags
    
License
=======

Copyright (c) 2010 Kyle Slattery

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
