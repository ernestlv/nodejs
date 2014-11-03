var connect = require("connect");
var server = require("serve-static");
var router = require("connect-route");
var qs = require("querystring");
var path = require("path");
var fs   = require("fs");
var mustache = require("mustache");

var app = connect();

app.use(router(route));

app.use(server(__dirname + '/public'));

app.listen(8000);

function route(router){
	router.get('/', doGet);
	router.get('/tmpl/:template', doTemplateGet);
	router.post('/tmpl/:template', doTemplatePost);
}

function doGet(req, res, next){
	console.log('doGet...');
	next();
}

function doTemplateGet(req, res){
	console.log('doTemplateGet...');
	var params = qs.parse(req.url.split("?")[1]);
	doTemplateMain(req, res, params);
};

function doTemplatePost(req, res){
	var data = "";
	
	console.log('doTemplatePost...');
	req.on("data", function(chunk){
		data += chunk;
	});

	req.on("end", function(){
		var params = qs.parse(data);
		doTemplateMain(req, res, params);
	});
}

function doTemplateMain(req, res, params){
		var filepath = __dirname + "/template/",
		    filename = req.params.template.substring(1);

		console.log("serving: "+filepath+filename);
		console.log("params: "+JSON.stringify(params));

        var reader = fs.createReadStream(filepath+filename, {encoding: "utf8"}),
       		template = "",
       		html;

       	reader.on("data", function(data){
       		template += data;
       	});

       	reader.on("end", function(){
       		html = mustache.to_html(template, params);
       		res.end(html);
       	});
}
