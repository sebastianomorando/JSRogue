

function dice(s) {
	d = s.split("d");
	n = 0;
	for(var i = 0; i < d[0]; i++) {
		n += Math.floor(Math.random()*d[1]) + 1;
	}
	return n;
}
