//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createCameraFpsControls', function(opts){
	return new tQuery.CameraFpsControls(opts)
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('CameraFpsControls', function(opts){
	// handle default values
	opts		= this._opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		deltaTarget	: tQuery.createVector3(0, 0, +3),
		deltaCamera	: tQuery.createVector3(0, 2, -3),
		debug		: false 
	});
	// sanity check
	console.assert( opts.trackedObject instanceof THREE.Object3D )
	console.assert( opts.tCamera instanceof THREE.Camera )

	// create target object
	var deltaTarget	= !opts.debug ? tQuery.createObject3D() : tQuery.createSphere()
					.setBasicMaterial().wireframe(true).back()	
					.geometry().scaleBy(1/4).back()
	this._deltaTarget	= deltaTarget;
	deltaTarget.addTo(opts.trackedObject)
		.position(opts.deltaTarget);

	// create camera
	var deltaCamera	= !opts.debug ? tQuery.createObject3D() : tQuery.createSphere()
					.setBasicMaterial().wireframe(true).back()	
					.geometry().scaleBy(1/4).back()
	this._deltaCamera	= deltaCamera;
	deltaCamera.addTo(opts.trackedObject)
		.position(opts.deltaCamera);
		// .position(0, 2, -3)
		//.position(0, 1, 0)
		//.position(0, 0.7, -0.07)

	// add the camera
	tQuery(opts.tCamera).position(0,0,0).addTo(deltaCamera);
});

tQuery.CameraFpsControls.prototype.update	= function(delta, now){
	var delta	= this._deltaTarget.get(0).position.clone()
	delta.subSelf(this._deltaCamera.get(0).position);
	this._opts.tCamera.lookAt(delta);
}

tQuery.CameraFpsControls.prototype.deltaTarget	= function(){
	return this._deltaTarget
}

tQuery.CameraFpsControls.prototype.deltaCamera	= function(){
	return this._deltaCamera
}

