var dataDB = require('./db.js').dataDB;
var functionsDB = require('./db.js').functionsDB;

function deleteAndInsert(doc) {
	dataDB.view('owc','getRevision', {key: doc._id}, function(e,r,h) {
		if(r.rows[0] && r.rows[0].value) {
			dataDB.destroy(doc._id, r.rows[0].value, function(e2,r2,h2) {
				dataDB.insert(doc, function(e3, r3, h3) {e3});
			});
		}
		else
			dataDB.insert(doc, function(e3, r3, h3) {e3});
	});
}

var express = require('express');
var app = express.createServer();
app.use(express.bodyParser());

app.get('/getTask', function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	dataDB.view('owc', 'getTask', {limit: 1}, function(e, r, h) {
		var taskData = r.rows[0].value.data;
		functionsDB.get('FUNCTION-1', function(e2, r2, h2) {
			var func = r2['function'];
			res.send(JSON.stringify({
				code: func,
				data: taskData,
				taskID: r.rows[0].value.taskID
			}));
		});
	});
});

app.post('/submitTaskOutput', function(req, res) {
	console.log(req.body);
	res.header('Access-Control-Allow-Origin', "*");
	res.end();
	
	var taskOutput = {
		_id: "OUTPUT-1-"+req.body.taskID,
		assignment: 1,
		data: {
			size: parseInt(req.body.size),
			avg: parseFloat(req.body.output)
		}
	};
	
	dataDB.view('owc', 'getRevision', {key: "TASK-1-"+req.body.taskID}, function(e1,r1,h1) {
		dataDB.destroy("TASK-1-"+req.body.taskID, r1.rows[0].value, function(e2,r2,h2) {});
	});
	deleteAndInsert(taskOutput);
});

app.listen(3000);
