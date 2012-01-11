function run() {
	var start = new Date().getTime()
	var output = document.getElementById('output');
	var array = [];
	var i;
	for(i = 0; i < 10000; i++)
		array[i] = Math.floor(Math.random()*Math.pow(2,15));
	//output.innerHTML += JSON.stringify(array);
	//output.innerHTML += "<br /><br />";
	//output.innerHTML += JSON.stringify(radixSort(array,6));
	var out = radixSort(array, 15);
	//output.innerHTML = JSON.stringify(out);
	output.innerHTML += "<br /><br />" +
			(new Date().getTime() - start) + " ms";
}

function radixSort(array, bit) {
	var bucketA = [];
	var bucketB = [];
	//console.log("bit " + bit);
	var idx;
	for(idx in array) {
		if(array[idx] & (1 << bit))
			bucketB.push(array[idx]);
		else
			bucketA.push(array[idx]);
	}
	if(bit == 0)
		return bucketA.concat(bucketB);
	return radixSort(bucketA, bit-1).concat(radixSort(bucketB, bit-1));
}
