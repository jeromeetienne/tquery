tQuery.registerStatic('LeapViewerHandSphere', function(opts){
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
	controller.addEventListener('handTracking', function(hand, data){
		//console.log('hand start', hand.id, hand)
		var userData	= data.userData;

		// create initial mesh
		var color	= Math.random() * 0xffffff;
		var mesh	= tQuery.createSphere().addTo(world)
			.setBasicMaterial().color(color).wireframe(true).back()
		userData.mesh	= mesh;

		function onUpdate(hand, data){
			// update mesh position		
			var position	= controller.convertPosition(hand.sphereCenter)
			mesh.position(position)
			// update circle radius			
			var radius	= controller.convertDistance(hand.sphereRadius)	
			mesh.scale(radius)			
		}
		// initial update
		onUpdate(hand, data)
		// bind update event
		data.emitter.addEventListener('update', onUpdate.bind(this));
		// handle stop event
		data.emitter.addEventListener('stop', function(handId, data){
			mesh.detach();
			//console.log('hand stop', handId)
		})
	})
});

/**
 * explicit destructor
 */
tQuery.LeapViewerHandSphere.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerHandSphere', function(opts){
	return new tQuery.LeapViewerHandSphere(opts)
});
