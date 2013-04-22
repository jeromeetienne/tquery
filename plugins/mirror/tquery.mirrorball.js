tQuery.registerStatic('MirrorBall', function(opts){
	// call parent ctor
	tQuery.MirrorBall.parent.constructor.call(this)

	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		textureW: 512,
	});
	// setup local variables
	var world	= opts.world;
	var container	= this;

	// create the camera
	var tCamera	= new THREE.CubeCamera( 0.001, 1000, opts.textureW );
	tQuery(tCamera).addTo(container)
		.addClass('camera')
	// to avoid flickering on the border of the sphere
	tCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;

	// create the sphere
	var sphere	= tQuery.createSphere().addTo(container)
		.addClass('sphere')
		.setBasicMaterial()
			.envMap(tCamera.renderTarget)
			.color('gold')
			.back()
	// render the CubeMap 
	var callback	= world.hook(function(){
		sphere.visible(false)	// *cough*

		tCamera.updateCubeMap( world.tRenderer(), world.tScene() );

		sphere.visible(true)	// *cough*
	})
	// unhook callback on destroy
	this.addEventListener('destroy', function(){ world.unhook(callback)	});
});

// inherit from tQuery.Object3D
tQuery.inherit(tQuery.MirrorBall, tQuery.Object3D);

// make it eventable
tQuery.MicroeventMixin(tQuery.MirrorBall.prototype)

/**
 * explicit destructor
 */
tQuery.MirrorBall.prototype.destroy	= function(){
	// call parent function
	tQuery.MirrorBall.prototype.destroy.call(this)
	// dispatch event
	this.dispatchEvent('destroy')
};

tQuery.registerStatic('createMirrorBall', function(opts){
	return new tQuery.MirrorBall(opts)
});


