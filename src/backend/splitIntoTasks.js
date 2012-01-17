var dataDB = require('./db.js').dataDB;

dataDB.view('owc', 'grabAllDocuments', {limit: 10},function(e,r,h) {
	var idlist = [];
	for(var i in r.rows) {
		idlist.push(r.rows[i].value);
	}
	var totalTasks = 10;
	var tasks = [];

	for(var i = 0; i < totalTasks; i++)
		tasks[i] = [];

	for(var i = 0; i < idlist.length; i++) {
		for(var j = 0; j < totalTasks; j++)
			tasks[j].push(idlist.pop());
	}
	for(var i = 0; i < totalTasks; i++)
	generateTask(tasks[i], i);
});

// docIDs is an array of document IDs.
function generateTask(docIDs, taskID) {
	console.log(docIDs);
	dataCombined = [];
	var counter = docIDs.length;
	for(var i in docIDs) {
		dataDB.get(docIDs[i], function(e,r,h) {
			dataCombined = dataCombined.concat(r.data);
			console.log(dataCombined.length);
			if(--counter == 0) {
				console.log("We're done here!");
				var task = {
					_id: "TASK-1-"+taskID,
					taskID: taskID,
					data: dataCombined
				};
				dataDB.insert(task, function(e1,r1,h1) {});
				deleteAndInsert(task);
			}
		});
	};

	return null;
}

function deleteAndInsert(doc) {
	dataDB.view('owc','getRevision', {key: doc._id}, function(e,r,h) {
		if(r.rows[0] && r.rows[0].value) {
			dataDB.destroy(doc._id, r.rows[0].value, function(e2,r2,h2) {
				dataDB.insert(doc, function(e3, r3, h3) {console.log(e3)});
			});
		}
	});
}
