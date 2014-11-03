var http = require("http");
var qs = require("querystring");

http.createServer(myQS).listen(8000, "localhost");

function myQS(req, res){
   var params = qs.parse(req.url.split("?")[1]);
   var html = "hello "+ params.firstname + " " + params.lastname + "!!!";

   res.writeHead(200, {
     "Content-Type":"text/html",
     "Content-length":html.length
   });
   res.write(html);
   res.end();
}
