benchsuite('current time in ms', function(){
	bench('Date.now()', function() {
		Date.now()
	});
	bench('new Date().getTime()', function() {
		new Date().getTime();
	});
});

benchsuite('string to int', function(){
	bench('parseInt', function() {
		parseInt("1326894939");
	});
	bench('Number Constructor', function() {
		Number("1326894939");
	});
});
