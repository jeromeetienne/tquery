var suite	= new Benchmark.Suite('Various Selectors')
.add('geometry selector', function() {
	tQuery('torus');
}).add('id selector', function() {
	tQuery('#myId');
}).add('class selector', function() {
	tQuery('#myClass');
});

// for debug only - to be removed
//suite.on('cycle', function(event, bench) {
//	console.log(String(bench));
//}).on('complete', function(){
//	console.log('Fastest is ' + this.filter('fastest').pluck('name'));
//	displaySuite(this);
//});

var world;
suite.on('start', function(){
	world	= tQuery.createWorld();
	var object	= tQuery.createTorus().id('myId').addClass('myClass').addTo(world);
	console.log("onStart");
});

suite.on('complete', function(){
	world.destroy();
	world	= null;
	console.log("onComplete");
});


// hook the ui
ui.hook(suite, '#benchOutput')

suite.run({ 'async': true });

console.dir(suite);


