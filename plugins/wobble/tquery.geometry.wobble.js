/**
 * tquery.js plugin to handle keyboard
*/
tQuery.Geometry.registerInstance('wobble', function(){
	this.each(function(geometry){
		THREEx.GeometryWobble.init(geometry);
		THREEx.GeometryWobble.cpuAxis(geometry, 'x', 4);

		tQuery.world.loop().hook(function(delta, present){
			var piSecond	= present * Math.PI;
			var phase	= 200 * piSecond / 180;
			var magnitude	= 0.25;
			THREEx.GeometryWobble.Animate(geometry, phase, magnitude);
		});
	});
	// for chained API
	return this;
});