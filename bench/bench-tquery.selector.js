benchsuite('Various Selectors', function(){
	var world;

	before(function(){
		world	= tQuery.createWorld();
		tQuery.createTorus().id('myId').addClass('myClass').addTo(world);
	});	

	after(function(){
		world.destroy();
		world	= null;
	});

	bench('geometry selector', function() {
		tQuery('torus');
	});
	bench('id selector', function() {
		tQuery('#myId');
	})
	bench('class selector', function() {
		tQuery('.myClass');
	});
});
