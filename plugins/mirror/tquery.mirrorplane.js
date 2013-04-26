tQuery.registerStatic('MirrorPlane', function(opts){
	// call parent ctor
	tQuery.MirrorPlane.parent.constructor.call(this)

	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		textureW: 512,
		textureH: 512,
	});

	// set some local variable
	var world	= opts.world;
	var textureW	= opts.textureW;
	var textureH	= opts.textureH;

	// init the container
	var container	= new THREE.Object3D()
	this.add(container)

	
	// setup the RenderTarget
	var rtTexture	= new THREE.WebGLRenderTarget(textureW, textureH, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.NearestFilter,
		format		: THREE.RGBFormat
	});

	// create the mirror plane
	var mirrorPlane	= tQuery.createPlane().addTo(container)
		.scaleX(1)
		.scaleY(textureH/textureW)
		.addClass('plane')
		.setBasicMaterial()
			.map(rtTexture)
			.back()
	// mirror the x in the UVs
	mirrorPlane.geometry().get(0).faceVertexUvs[0].forEach(function(uvs){
		uvs.forEach(function(uv){
			uv.x	= 1-uv.x;
		})
	})
	
	var planeW	= 1 * mirrorPlane.scaleX();
	var planeH	= 1 * mirrorPlane.scaleY();
	var tPlaneCam	= new THREE.PerspectiveCamera(50, planeW/planeH, 0.0001, 10000);
	var mirrorCamera= tQuery(tPlaneCam).addTo(container)
		.addClass('camera')
	
	if( false ){
		var cameraPerspectiveHelper = new THREE.CameraHelper( mirrorCamera.get(0) );
		world.add( cameraPerspectiveHelper ); 
		world.hook(function(delta, now){
			cameraPerspectiveHelper.update();
		})

		tQuery.createAxis().addTo(mirrorCamera)
		var cameraObj	= tQuery.createCube().addTo(mirrorCamera)
			//.scale(1/10)
			.setBasicMaterial()
				.wireframe(true)
				.color('hotpink')
				.back()		
	}
	
	// Render the scene
	world.hook(function(delta, now){
		var tRenderer	= world.tRenderer()
		var tScene	= world.tScene()
		var tCamera	= mirrorCamera.get(0)
		tRenderer.render(tScene, tCamera, rtTexture, true);	
	})
	
	// update mirrorCamera position based on worldCamera positions	
	world.hook(function(delta, now){
		var worldCamera	= world.camera();
		// update matrix world
		worldCamera.get(0).updateMatrixWorld();
		mirrorPlane.get(0).updateMatrixWorld();
		
		// get local worldCam
		var position	= world.camera().worldPosition().clone();
		// switch that mirror local 
		mirrorPlane.get(0).worldToLocal(position)
		// go on the other side of the mirror
		position.z	*= -1;
		// use this as mirror position
		mirrorCamera.position( position )
		// mirror camera always look at the center of the mirror
		mirrorCamera.lookAt(0,0,0)
		
		// set near to the mirror distance, and compute fov to fit mirror size
		var tMirrorCam	= mirrorCamera.get(0)
		var distance	= tMirrorCam.position.length();
		tMirrorCam.fov	= Math.atan2(1/tMirrorCam.aspect, distance)*180/Math.PI;
		tMirrorCam.near	= distance;
		tMirrorCam.updateProjectionMatrix()
	})
});

// inherit from tQuery.Object3D
tQuery.inherit(tQuery.MirrorPlane, tQuery.Object3D);


tQuery.registerStatic('createMirrorPlane', function(opts){
	return new tQuery.MirrorPlane(opts)
});


