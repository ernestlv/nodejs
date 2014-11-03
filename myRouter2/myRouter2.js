var connect = require("connect");
var server = require("serve-static");
var router = require("connect-route");

var app = connect();

app.use(router(route));

app.use(server(__dirname + '/public'));

app.listen(8000);

function route(router){
	router.get('/', function(req, res, next){
		console.log('processing: /');
		next();
	});

	router.get('/test', function(req, res, next){
		console.log('processing: /test');
		next();
	});

	router.get('/test/:myParam', function(req, res, next){
		console.log('processing: '+req.params.myParam);
		res.end(req.params.myParam);
	});

	router.post('/test', function(req, res, next){
		console.log('posting ...');
		res.end('this is a post');
	});
}