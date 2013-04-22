tQuery.registerStatic('LeapViewerHandPalm', function(opts){
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
		
		// create the container
		var mesh	= tQuery.createObject3D().addTo(world)
		userData.mesh	= mesh;	
		// add the ring	
		var color	= Math.random() * 0xffffff;
		var ringGeometry= new THREE.RingGeometry(0.7, 1, 32);
		var ringMaterial= tQuery.createMeshBasicMaterial().color(color).side(THREE.DoubleSide);
		var circle	= tQuery(ringGeometry, ringMaterial).addTo(mesh)
		// add the arrow for the normal		
		var direction	= tQuery.createVector3(0,0,-1)
		var position	= tQuery.createVector3(0,0,0)
		var length	= 1;
		var tMesh	= new THREE.ArrowHelper(direction, position, length, color);
		var arrow	= tQuery(tMesh).addTo(mesh)

		function onUpdate(hand, data){
			// update position
			var position	= controller.convertPosition(hand.palmPosition)
			mesh.position(position)
			// update circle radius			
			var radius	= controller.convertDistance(hand.sphereRadius*0.7)	
			mesh.scale(radius)
			// update circle orientation
			var normal	= tQuery.createVector3(hand.palmNormal);
			var target	= tQuery.createVector3(hand.palmPosition).sub(normal)
			target		= controller.convertPosition(target)
			mesh.lookAt(target)			
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
tQuery.LeapViewerHandPalm.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerHandPalm', function(opts){
	return new tQuery.LeapViewerHandPalm(opts)
});
