describe('tQuery.world', function(){
	it('should support webgl', function(){
		var world	= tQuery.createWorld();
		console.assert(tQuery.World.hasWebGL() === true);
		world.destroy();
	});

	it('should not crash on creation', function(done){
		var container	= document.getElementById('container');
		var world	= tQuery.createWorld().appendTo(container);
		var mesh	= tQuery.createTorus().addTo(world);
		setTimeout(function(){
			world.destroy();
			done();
		}, 100);
	});
});
