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

	it('.id() ', function(){
		console.assert( tQuery('#slota').length === 0 );
		tQuery('cube').id('slota');
		console.assert( tQuery('#slota').length === 1 );
		tQuery('cube').id('');
		console.assert( tQuery('#slota').length === 0 );
	});

	it('.addClass() ', function(){
		console.assert( tQuery('.myclass').length === 0 );
		console.assert( tQuery('.otherclass').length === 0 );

		tQuery('cube').addClass('myclass').addClass('otherclass');

		console.assert( tQuery('.myclass').length === 1 );
		console.assert( tQuery('.otherclass').length === 1 );

		tQuery('cube').removeClass('myclass');

		console.assert( tQuery('.myclass').length === 0 );
		console.assert( tQuery('.otherclass').length === 1 );

		tQuery('cube').removeClass('otherclass');

		console.assert( tQuery('.otherclass').length === 0 );
	});
});
