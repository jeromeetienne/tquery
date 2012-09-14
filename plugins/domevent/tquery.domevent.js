//////////////////////////////////////////////////////////////////////////////////
//		tQuery.World.*							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * enable DomEvent on this world
*/
tQuery.World.registerInstance('enableDomEvent', function(){
	// sanity check
	console.assert(this.hasDomEvent() === false);
	// create THREEx.DomEvent
	var domEvent	= new THREEx.DomEvent();
	// set the camera in domEvent
	domEvent.camera(this.tCamera());
	// create the context
	var context	= {
		domEvent	: domEvent
	};
	// register the context
	tQuery.data(this, '_DomEvent', context, true);
	// return this for chained API
	return this;
});

/**
 * disable DomEvent on this world
*/
tQuery.World.registerInstance('disableDomEvent', function(){
	// sanity check
	console.assert(this.hasDomEvent() === true);
	// destroy
	var context	= tQuery.data(this, '_DomEvent')
	context.domEvent.destroy();
	tQuery.removeData(this, '_DomEvent', true);
	// return this for chained API
	return this;
});

/**
 * @returns {boolean} true if the world has DomEvent enabled, false otherwise
*/
tQuery.World.registerInstance('hasDomEvent', function(){
	return tQuery.data(this, '_DomEvent') ? true : false;
});

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.Object3D.*						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('on', function(eventType, callback, world){
	// parameter polymorphism
	world	= world	|| tQuery.world;
	// sanity check
	console.assert(world.hasDomEvent() === true, 'world has no domEvents. have you done world.enableDomEvent() ?');
	// get THREEx.DomEvent
	var domEvent	= tQuery.data(world, '_DomEvent').domEvent;
	// set the camera in domEvent
	domEvent.camera(world.tCamera());
	// bind each object3d
	this.each(function(object3d){
		domEvent.bind(object3d, eventType, callback, false);
	});
	// for chained API
	return this;	
});

tQuery.Object3D.registerInstance('off', function(eventType, callback, world){
	// parameter polymorphism
	world	= world	|| tQuery.world;
	// sanity check
	console.assert(world.hasDomEvent() === true, 'world has no domEvents. have you done world.enableDomEvent() ?');
	// get THREEx.DomEvent
	var domEvent	= tQuery.data(world, '_DomEvent').domEvent;
	// set the camera
	domEvent.camera(world.tCamera());
	// unbind each object3d
	this.each(function(object3d){
		domEvent.unbind(object3d, eventType, callback, false);
	});
	// for chained API
	return this;
});
