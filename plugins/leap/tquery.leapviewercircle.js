tQuery.registerStatic('LeapViewerCircle', function(opts){
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
		if( gesture.type !== 'circle' )		return;

		console.log('start gesture', gesture.id, gesture)
	
		// create the container
		var mesh	= tQuery.createObject3D().addTo(world)
		userData.mesh	= mesh;	
		// add the ring	
		var color	= Math.random() * 0xffffff;
		var ringGeometry= new THREE.RingGeometry(0.7, 1, 32);
		var ringMaterial= tQuery.createMeshBasicMaterial().color(color).side(THREE.DoubleSide);
		var circle	= tQuery(ringGeometry, ringMaterial).addTo(mesh)

		// add the arrow for the normal		
		var direction	= tQuery.createVector3(0,0,1)
		var position	= tQuery.createVector3(0,0,0)
		var length	= 1;
		var tMesh	= new THREE.ArrowHelper(direction, position, length, color);
		var arrow	= tQuery(tMesh).addTo(mesh)

		function onUpdate(gesture, data){
			// update position
			var position	= controller.convertPosition(gesture.center)
			mesh.position(position)
			// update circle radius			
			var radius	= controller.convertDistance(gesture.radius)	
			mesh.scale(radius)
			// update circle orientation
			var normal	= tQuery.createVector3(gesture.normal);
			var target	= tQuery.createVector3(gesture.center).sub(normal)
			target		= controller.convertPosition(target)
			mesh.lookAt(target)			
		}
		// initial update
		onUpdate(gesture, data)
		// bind update event
		data.emitter.addEventListener('update', onUpdate.bind(this));	
		// remove the mesh
		data.emitter.addEventListener('stop', function(gesture, data){
			mesh.detach();
			//console.log('stop', gesture.id)
		})
	})
});

/**
 * explicit destructor
 */
tQuery.LeapViewerCircle.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerCircle', function(opts){
	return new tQuery.LeapViewerCircle(opts)
});
