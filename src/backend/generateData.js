var db = require('./db.js').db;
//console.log(db);

for(var i = 0; i < 10000; i++) {
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
	db.view('owc', 'getRevision', {key: doc._id}, function(e1,r1,h1) {
		if(r1.rows[0]) {
			if(r1.rows[0].value) {
				console.log(r1.rows[0].value);
				db.destroy(doc._id, r1.rows[0].value, function(e2,r2,h2) {
//					console.log(r2);
					db.insert(doc, function(e3,r3,h3) {});
				});
		
			}
			else {
				console.log(r1.rows[0]);
				db.insert(doc, function(e3,r3,h3) {console.log(r3)});
			}
		}
		else
			db.insert(doc, function(e2,r2,h2) {});
	});
}
