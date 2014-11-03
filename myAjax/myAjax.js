var connect = require("connect");
var server = require("serve-static");
var router = require("connect-route");
var qs = require("querystring");

var app = connect();

app.use(router(route));

app.use(server(__dirname + '/public'));

app.listen(8000);

function route(router){
	router.get('/', function(req, res, next){
		console.log('processing: /');
		next();
	});

	router.get('/json', function(req, res){
		var params = qs.parse(req.url.split("?")[1]);

		if (params.callback){
			var json = params.callback + "({username:'" + params.firstname + " " + params.lastname + "''})";
		}else{
			var json = JSON.stringify({"username":params.firstname + " " + params.lastname});
		}
		res.writeHead(200, {
			"Content-Type": "application/json", // this makes the trick
			"Content-Length": json.length
		});
		res.end(json);
	});
}