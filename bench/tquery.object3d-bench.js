// create a context
var world	= tQuery.createWorld().fullpage().start();
var object	= tQuery.createTorus().id('myId').addClass('myClass').addTo(world);
world.stop();

var suite = new Benchmark.Suite;
suite.add('geometry selector', function() {
	tQuery('torus');
}).add('id selector', function() {
	tQuery('#myId');
}).add('class selector', function() {
	tQuery('#myClass');
}).on('cycle', function(event, bench) {
	console.log(String(bench));
}).on('complete', function(){
	console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true });