var http = require("http");
var path = require("path");
var fs   = require("fs");

http.createServer(myServer).listen(8000, "localhost");

function myServer(req, res){
   var filename = path.basename(req.url) || "index.html",
       ext = path.extname(filename),
       filePath = __dirname + "/public/";

   if ( ext === ".html"){
      filePath = path.join(filePath, filename);
      fs.readFile(filePath, { encoding:'utf-8'}, readFile);
   }else{
      notFound();
   }

   function readFile(err, data){
        if ( err ){
          notFound();
        }else{
          res.writeHead(200, {
             "Content-Type":"text/html",
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


