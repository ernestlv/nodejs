var connect = require("connect");
var server = require("serve-static");
var router = require("connect-route");
var io = require("socket.io").listen(1337);

var app = connect();

app.use(router(route));

app.use(server(__dirname + '/public'));

app.listen(8000);

function route(router){
	router.get('/', function(req, res, next){
		next();
	});
}

io.sockets.on("connection", function(socket){
	socket.emit("myEmittedEvent", "connected"); //let know the browser when server is up and running ...
	socket.on("mySocketEvent", function(data){
		socket.emit("myEmittedEvent", {username:data.firstname + " " + data.lastname});
	});
});