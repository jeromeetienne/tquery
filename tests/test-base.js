describe('tQuery', function(){
	describe('minimal page', function(){

		it('should support webgl', function(){
			var world	= tQuery.createWorld();
			console.assert(world._hasWebGL === true);
			world.destroy();
		});

		it('should not crash on creation', function(done){
			var container	= document.getElementById('container');
			var world	= tQuery.createWorld().appendTo(container);
			var mesh	= tQuery.createTorus().addTo(world);
			var loop	= tQuery.createLoop(world).start();
			setTimeout(function(){
				world.destroy();
				loop.destroy();
				done();
			}, 1000);
		});

	});
});
