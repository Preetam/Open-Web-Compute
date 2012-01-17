var nano = require('nano')('http://owc:giI6hquk6y7SsVIYAkhzanI12Sh6r2@199.58.161.156:5999');
var http = require('http');
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type': 'text/javascript', 'Access-Control-Allow-Origin':'*'});
	nano.use('owc').view('owc','get_available_task',{limit: 1}, function(e,r,h) {
		if(e)
			res.end();
		var input = r.rows[0].value.input;
		var codeID = r.rows[0].value.code;
		console.log(input + "\n\n" + codeID);
		nano.use('owc').get('code-'+codeID, function(e,r,h) {
			res.write('var inputOWC = '+JSON.stringify(input)+';\n');
			res.end(r.code);
		});
	});
}).listen(8080, '0.0.0.0');

http.createServer(function(req,res) {
	res.writeHead(200);
	
	
}).listen(8081, '0.0.0.0');
