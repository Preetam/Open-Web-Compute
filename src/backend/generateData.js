var dataDB = require('./db.js').dataDB;
//console.log(data);

for(var i = 0; i < 1000; i++) {
	var data = [];
	for(var j = 0; j < 1000; j++)
		data.push((Math.random()*10000).toFixed(2));
	var doc = {
		"_id": "DATA-1-"+i,
		"data": data,
		"assignment": 1
	};
	if(i % 10 == 0)
		console.log(i/10 + '%');
	putDoc(doc);
}

function putDoc(doc) {
	dataDB.view('owc', 'getRevision', {key: doc._id}, function(e1,r1,h1) {
		if(r1.rows[0]) {
			if(r1.rows[0].value) {
				console.log(r1.rows[0].value);
				dataDB.destroy(doc._id, r1.rows[0].value, function(e2,r2,h2) {
					console.log(r2);
					dataDB.insert(doc, function(e3,r3,h3) {});
				});
		
			}
			else {
				console.log(r1.rows[0]);
				dataDB.insert(doc, function(e3,r3,h3) {console.log(r3)});
			}
		}
		else
			dataDB.insert(doc, function(e2,r2,h2) {});
	});
}
