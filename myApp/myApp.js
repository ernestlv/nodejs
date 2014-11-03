var http = require("http");

http.createServer(myApp).listen(8000, "localhost");

function myApp(req, res){
   var html = "hello wolrd!!!";

   res.writeHead(200, {
     "Content-Type":"text/html",
     "Content-length":html.length
   });
   res.write(html);
   res.end();
}
