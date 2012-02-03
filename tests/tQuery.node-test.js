describe('tQuery.node', function(){
	var world;
	
	before(function(){
		// create a world
		world	= tQuery.createWorld();
		// add some objects
		tQuery.createCube().addTo(world);
		tQuery.createTorus().addTo(world);
		tQuery.createTorus().addTo(world);
	});
	after(function(){
		world.destroy();
		world	= null;
	});

	it('.length', function(){
		console.assert( tQuery('text').length === 0 );
		console.assert( tQuery('cube').length === 1 );
		console.assert( tQuery('torus').length === 2 );
	});

	it('.data', function(){
		console.assert( tQuery('cube').data('foo') === undefined);
		tQuery('cube').data('foo', 'bar')
		console.assert( tQuery('cube').data('foo') === 'bar');
		console.assert( tQuery('cube').data('foo') !== 'bla');
	});

	it('.removeData(string)', function(){
		console.assert( tQuery('cube').data('foo') === 'bar' );
		tQuery('cube').removeData('foo')
		console.assert( tQuery('cube').data('foo') === undefined);
	});
	it('.removeData([string])', function(){
		tQuery('cube').data('foo1', 'bar1').data('foo2', 'bar2');
		console.assert( tQuery('cube').data('foo1') === 'bar1' );
		console.assert( tQuery('cube').data('foo2') === 'bar2' );
		tQuery('cube').removeData(['foo1', 'foo2']);
		console.assert( tQuery('cube').data('foo1') === undefined);
		console.assert( tQuery('cube').data('foo2') === undefined);
	});

	it('.each (uninterrupted)', function(){
		var iterations	= 0;
		var result	= tQuery('torus').each(function(element){
			iterations++;
		});
		console.assert(iterations === 2);
		console.assert(result === true);
	});

	it('.each (interrupted)', function(){
		var iterations	= 0;
		var result	= tQuery('torus').each(function(element){
			iterations++;
			return false;
		});
		console.assert(iterations === 1);
		console.assert(result === false);
	});

});
