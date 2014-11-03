var connect = require("connect");
var server = require("serve-static");
var router = require("connect-route");
var qs = require("querystring");

var app = connect();

app.use(router(route));

app.use(server(__dirname + '/public'));

app.listen(8000);

function route(router){
	var data = "";

	router.get('/', function(req, res, next){
		console.log('serving: '+req.url);
		next();
	});

	router.post('/', function(req, res, next){
		console.log('processing...');
		req.on('data', function(chunk){
			console.log('chunk '+chunk);
			data += chunk;
		});
		req.on('end', function(){
			console.log('end'+data);
			var params = qs.parse(data);
			res.end("Hello " + params.firstname + " " + params.lastname);
		});
	});
}