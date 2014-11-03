var http = require("http");
var path = require("path");
var fs   = require("fs");
var extensions = {
  ".html":"text/html",
  ".css":"text/css",
  ".js":"text/javascript",
  ".png":"image/png",
  ".gif":"image/gif",
  ".jpg":"image/jpeg",
}

http.createServer(myServerV2).listen(8000, "localhost");

function myServerV2(req, res){
   var filename = path.basename(req.url) || "index.html",
       ext = path.extname(filename),
       dir = path.dirname(req.url).substring(1),
       filePath = __dirname + "/public/" + (dir ? dir + "/" : "");

   if ( extensions[ext] ){
      filePath = path.join(filePath, filename);
      console.log("serving:", filePath);
      fs.readFile(filePath, readFile);
   }else{
      notFound();
   }

   function readFile(err, data){
        if ( err ){
          notFound();
        }else{
          res.writeHead(200, {
             "Content-Type":extensions[ext],
             "Content-length":data.length
          });
          res.write( data );
          res.end();
        }
  }

  function notFound(){
    console.log('404 : '+filePath);
    res.writeHead(404);
    res.write("Not Found");
    res.end();
  }
}
