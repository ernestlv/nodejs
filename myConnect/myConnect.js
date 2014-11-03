var connect = require("connect");
var server = require("serve-static");

var app = connect();

app.use(server(__dirname + '/public'));

app.listen(8000);