tQuery.registerStatic('LeapViewerTap', function(opts){
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
		// keep only keyTap gesture
		if( gesture.type !== 'keyTap' && gesture.type !== 'screenTap')		return;
		// log to debug
		//console.log('gestureTracking', gesture.id, gesture)
		// create the sphere for the contact point
		var color	= new THREE.Color(Math.random() * 0xffffff)
		var sphere	= tQuery.createSphere(0.15, 16, 16).addTo(world)
			.scale(1, 1, 1)
			.setLambertMaterial()
				.color(color)
				.back()
		var position	= controller.convertPosition(gesture.position)
		sphere.position(position)

		// create the riddle for impact
		var torus	= tQuery.createTorus(0.15,0.01, 8, 32).addTo(sphere)
			.setLambertMaterial().color('red').back()
		if( gesture.type === 'keyTap')	torus.rotateX(Math.PI/2)

		// make the torus grow
		var callback	= world.hook(function(delta, now){
			var factor	= 1 + delta * 2;
			if( gesture.type === 'keyTap')	torus.scaleXBy(factor).scaleZBy(factor)
			else				torus.scaleXBy(factor).scaleYBy(factor)
		})
		// remove it after 300ms
		setTimeout(function(){
			world.unhook(callback)
			sphere.detach();
		}, 300)
	})
});

/**
 * explicit destructor
 */
tQuery.LeapViewerTap.prototype.destroy	= function(){
	console.assert(false, 'not yet implemented')	
};

tQuery.registerStatic('createLeapViewerTap', function(opts){
	return new tQuery.LeapViewerTap(opts)
});
