// create a context
var world	= tQuery.createWorld();
var object	= tQuery.createTorus().id('myId').addClass('myClass').addTo(world);

var suite	= new Benchmark.Suite('Various Selectors');
suite.add('geometry selector', function() {
	tQuery('torus');
});

suite.add('id selector', function() {
	tQuery('#myId');
});

suite.add('class selector', function() {
	tQuery('#myClass');
});

suite.on('cycle', function(event, bench) {
	console.log(String(bench));
})

suite.on('complete', function(){
	console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	displaySuite(this);
});

suite.run({ 'async': true });

console.dir(suite);



suite.on('cycle', function(event, bench){
	displaySuite(this);
}).on('complete', function(event, bench){
	displaySuite(this);
});


var displaySuite	= function(suite){
	jQuery('#benchOutput').empty();

	var templateStr	= jQuery('#suiteHead').text().trim();
	var result	= _.template(templateStr, {
		name	: suite.name,
		running	: suite.running
	});
	jQuery(result).appendTo('#benchOutput')	


	// compute hzMax
	var hzMax	= 0;
	suite.forEach(function(bench, idx){
		hzMax	= Math.max(hzMax, bench.hz)
	});

	suite.forEach(function(bench, idx){
		//console.log("kkk", bench.hz, 'kkk');
		var context	= {
			name	: bench.name,
			hz	: bench.hz,
			ratio	: (bench.hz > 0 && hzMax > 0) ? bench.hz / hzMax : null
		};
		var templateStr	= jQuery('#benchItem').text().trim();
		var result	= _.template(templateStr, context);
		jQuery(result).appendTo('#benchOutput')	
	});	
}

displaySuite(suite);


