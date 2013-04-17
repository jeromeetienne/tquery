tQuery.registerStatic('LeapViewerSwipe', function(opts){
	// handle arguments polymorphism
//	if( opts instanceof tQuery.LeapController )	opts	= { controller: opts };
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// handle arguments sanity check
//	console.assert( opts.contoller instanceof tQuery.LeapController, "opts.controller MUST be specified" )

	// your code goes here
	var world	= opts.world;
	var controller	= opts.controller;
	controller.addEventListener('gestureTracking', function(gesture, data){
		var userData	= data.userData;

		// keep only circle gesture
		if( gesture.type !== 'swipe' )		return;

		//console.log('swipe start', gesture.id, gesture)

		// create initial mesh
		var origin	= controller.convertPosition(gesture.startPosition)
		var position	= controller.convertPosition(gesture.position)
		var length	= position.distanceTo(origin)
		var direction	= position.clone().sub(origin).normalize()
		var color	= Math.random() * 0xffffff
		var tMesh	= new THREE.ArrowHelper(direction, origin, length, color)
		var mesh	= tQuery(tMesh).addTo(world)
		userData.mesh	= mesh

		// update the mesh as the gesture is updated
		data.emitter.addEventListener('update', function(gesture, data){
			//console.log('swipe update', gesture.id)
			// update position
			var origin	= controller.convertPosition(gesture.startPosition)
			mesh.position(origin)
			// update length
			var position	= controller.convertPosition(gesture.position)
			var length	= position.distanceTo(origin)
			mesh.get(0).setLength( length );
			// update direction
			var direction	= position.clone().sub(origin).normalize()
			mesh.get(0).setDirection( direction );
		})
			
		// remove the mesh
		data.emitter.addEventListener('stop', function(gesture, data){
			//console.log('swipe stop', gesture.id)
			mesh.detach();
		})
	})
});

/**
 * explicit destructor
 */
tQuery.LeapViewerSwipe.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerSwipe', function(opts){
	return new tQuery.LeapViewerSwipe(opts)
});
