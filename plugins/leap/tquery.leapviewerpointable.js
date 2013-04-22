tQuery.registerStatic('LeapViewerPointable', function(opts){
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
	controller.addEventListener('pointableTracking', function(pointable, data){
		//console.log('== start pointable', pointable.id, pointable)
//return;
		var userData	= data.userData;
		// create initial mesh
		var direction	= tQuery.createVector3(pointable.direction)
		var length	= controller.convertDistance(pointable.length)
		var position	= controller.convertPosition(pointable.tipPosition)
		var color	= Math.random() * 0xffffff;
		var tMesh	= new THREE.ArrowHelper(direction, position, length, color);
		var mesh	= tQuery(tMesh).addTo(world)
		userData.mesh	= mesh;


		data.emitter.addEventListener('update', function(pointable, data){
			//console.log('== update pointable', pointable.id)
			// update position
			var position	= controller.convertPosition(pointable.tipPosition)
			mesh.position(position)
			// update direction
			var direction	= tQuery.createVector3(pointable.direction)
			mesh.get(0).setDirection(direction)
			// update length
			var length	= controller.convertDistance(pointable.length)
			mesh.get(0).setLength(length)
		});

		data.emitter.addEventListener('stop', function(pointableId, data){
			mesh.detach();
			//console.log('== stop pointable', pointableId)
		})
	})
});

/**
 * explicit destructor
 */
tQuery.LeapViewerPointable.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerPointable', function(opts){
	return new tQuery.LeapViewerPointable(opts)
});
