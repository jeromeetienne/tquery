describe('tQuery.object3d', function(){
	var world;
	
	before(function(){
		// create a world
		world	= tQuery.createWorld();
		// add some objects
		tQuery.createCube().addTo(world);
	});
	after(function(){
		world.destroy();
		world	= null;
	});

	it('.add(object3d) should not crash', function(){
		console.assert( tQuery('torus').length === 0 );
		tQuery('cube').add( tQuery.createTorus() );
		console.assert( tQuery('torus').length === 1 );
	});

	it('.remove(object3d) should not crash', function(){
		console.assert( tQuery('torus').length === 1 );
		tQuery('cube').remove( tQuery('torus') );
		console.assert( tQuery('torus').length === 0 );
	});
});
