Description
======
This will be a node.js module to transform XML into a JS object.  So if you have this XML:

    <root>
      <videos total="2">
        <video>
          <title>Video 1</title>
        </video>
        <video>
          <title>Video 2</title>
        </video>
      </videos>
    </root>
    
It would be transformed to this:

    {
      root: {
        videos: {
          attrs: {
            total: 2
          },
          
          video: [
            {
              title: {
                content: "Video 1"
              }
            },
            {
              title: {
                content: "Video 2"
              }
            }
          ]
        }
      }
    }
    
TODO
=====
1. Get working with arrays of objects
2. Write more in-depth tests
3. Have it support attributes
4. Switch nodes to be object with toString() set to content, instead of using a content string