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
              title: "Video 1"
            },
            {
              title: "Video 2"
            }
          ]
        }
      }
    }