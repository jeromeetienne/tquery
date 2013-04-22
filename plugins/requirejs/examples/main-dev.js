require(['tquery.planets'], function(){

	var world	= tQuery.createWorld().boilerplate().start();
	var planet	= tQuery.createPlanet().id('obj').addTo(world);

	// setup light
	tQuery.createDirectionalLight().addTo(world).position(1,1,1);
	tQuery.createDirectionalLight().addTo(world).position(-1,1,1);
	tQuery.createAmbientLight().addTo(world).color(0xFFFFFF);

	// make the object rotate
	world.hook(function(delta, now){
		var angle	= 0.05 * now * Math.PI * 2;
		planet.get(0).rotation.y	= angle;
	});

});
