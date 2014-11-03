var http = require("http");
var url = require("url");

http.createServer(myRouter).listen(8000, "localhost");

function myRouter(req, res){
   var path = url.parse(req.url).pathname.split("/");

   if (req.method === "GET"){
   		if (path[1] === "sayhello"){
   			var html = "hello "+ path[2] + " " + path[3] + "!!!";
   		}
   }

   res.writeHead(200, {
     "Content-Type":"text/html",
     "Content-length":html.length
   });
   res.write(html);
   res.end();
}
