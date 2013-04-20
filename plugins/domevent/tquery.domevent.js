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
	var domEvent	= new THREEx.DomEvent(undefined, this.tRenderer().domElement);
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
	// determine the object to bind
	var boundObject	= this.hasDomEventBoundingBox() ? this.domEventBoundingBox() : this;
	// bind each object3d
	boundObject.each(function(tObject3d){
		domEvent.bind(tObject3d, eventType, callback, false);
	});
	return callback;	
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
	// determine the object to bind
	var boundObject	= this.hasDomEventBoundingBox() ? this.domEventBoundingBox() : this;
	// unbind each object3d
	boundObject.each(function(tObject3d){
		domEvent.unbind(tObject3d, eventType, callback, false);
	});
	return callback;	
});


//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('addDomEventBoundingBox', function(){
	// sanity check
	console.assert( this.hasDomEventBoundingBox() === false )
	// the boundbing box to detect mouse events - make it invisible
	var boundingBox	= tQuery.createCube().addTo(this)
		.addClass('domEventBoundingBox')
		.setBasicMaterial()
			.wireframe(true)
			.back()
		.visible(false)
	// store it in the object
	this.data('domEventBoundingBox', boundingBox)
	// update boundingbox
	this.updateDomEventBoundingBox();
	// return this for chained API
	return this;
})

tQuery.Object3D.registerInstance('updateDomEventBoundingBox', function(){
	// get bounding box
	var boundingBox	= this.domEventBoundingBox();
	// measure mesh size
	var bBoxSize	= this.geometry().computeAll().get(0).boundingBox;
	// set the position
	boundingBox.positionX( (bBoxSize.max.x + bBoxSize.min.x)/2 )
	boundingBox.positionY( (bBoxSize.max.y + bBoxSize.min.y)/2 )
	boundingBox.positionZ( (bBoxSize.max.z + bBoxSize.min.z)/2 )
	// set the scale
	boundingBox.scaleX(bBoxSize.max.x - bBoxSize.min.x)
	boundingBox.scaleY(bBoxSize.max.y - bBoxSize.min.y)
	boundingBox.scaleZ(bBoxSize.max.z - bBoxSize.min.z)
})

tQuery.Object3D.registerInstance('domEventBoundingBox', function(){
	return this.data('domEventBoundingBox')
})

tQuery.Object3D.registerInstance('hasDomEventBoundingBox', function(){
	return this.data('domEventBoundingBox') !== undefined;
})

tQuery.Object3D.registerInstance('removeDomEventBoundingBox', function(){
	// get bounding box
	var boundingBox	= this.domEventBoundingBox();
	// detach it
	boundingBox.detach();
	// remove data
	this.removeData('domEventBoundingBox')
	// for chained API
	return this;
})
