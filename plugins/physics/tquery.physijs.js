// tQuery API
//
// world.enablePhysics();
// world.physics()		// here access physijs.xScene
// world.hasPhysics()
// world.disablePhysics();
//
// object.enablePhysics()
// object.physics()		// here access physijs.xMesh and physijs.xMaterial
// object.hasPhysics()
// object.disablePhysics()

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.World							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.registerInstance('enablePhysics', function(opts){
	var world	= this;
	var tScene	= world.tScene();
	opts		= opts	|| {};
	opts		= tQuery.extend(opts, {
		maxSteps	: 5,	// see "Custom simulation steps" at https://github.com/chandlerprall/Physijs/wiki/Scene-Configuration
		pathWorker	: '../vendor/physijs/physijs_worker.js',
		xScene		: null
	});
	
	Physijs.scripts.worker	= opts.pathWorker;

	console.assert(tScene._xScene === undefined)
	// TODO use tQuery.data for that
	tScene._xScene	= new Physijs.xScene(opts.xScene);
	
	world.loop().hook(function(delta, now){
		tScene._xScene.simulate(delta, opts.maxSteps);
	}); 
})

tQuery.World.registerInstance('physics', function(){
	console.assert( this.hasPhysics() );
	return world.tScene()._xScene;
});

tQuery.World.registerInstance('hasPhysics', function(){
	return world.tScene()._xScene ? true : false;
});

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.Mesh							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('enablePhysics', function(opts){
	opts		= opts	|| {};
	var mesh	= this;
	var tMesh	= mesh.get(0);
	console.assert(tMesh._xMesh === undefined)
	console.assert(tMesh._physijs === undefined)
	tMesh._xMesh	= new Physijs.xMesh(tMesh.geometry, opts.mass).back(this);
	tMesh._physijs	= tMesh._xMesh._physijs;

	// init the geometry
	var tGeometry	= opts.tGeometry	 || tMesh.geometry;
	if( tGeometry instanceof THREE.CubeGeometry ){
		tGeometry.computeBoundingBox();
		tMesh._xMesh._boxGeometryInit(tGeometry, opts.mass)
	}else if( tGeometry instanceof THREE.SphereGeometry ){
		tGeometry.computeBoundingSphere();
		tMesh._xMesh._sphereGeometryInit(tGeometry, opts.mass)
	}else if( tGeometry instanceof THREE.PlaneGeometry ){
		tGeometry.computeBoundingBox();
		tMesh._xMesh._planeGeometryInit(tGeometry, opts.mass)
	}else if( tGeometry instanceof THREE.CylinderGeometry ){
		tGeometry.computeBoundingBox();
		tMesh._xMesh._cylinderGeometryInit(tGeometry, opts.mass)
	}else{
		console.assert(false, "unknown geometry type");	
	}

	// init the material
	// TODO does it have to be the actual mesh.material ? can it be another struct ?
	var tMaterial	= tMesh.material;
	tMaterial._xMaterial	= new Physijs.xMaterial(tMaterial, opts.friction, opts.restitution);
	if( tMaterial._physijs === undefined){
		tMaterial._physijs	= tMaterial._xMaterial._physijs;	
	}


	// TODO to remove hardcoded
	// - possible solution: here if attached, get the scene to this world
	// - if not yet attached, hook the scene.add function to add the physics world too
	// - TODO this mechanism to hook .add.remove in a scene isnt yet availble
	var tScene	= tQuery.world.tScene();

	tScene._xScene.add(tMesh, function(){
		//console.log("this tMesh has been added")
	});

	return this;	// for chained API
})

tQuery.Mesh.registerInstance('hasPhysics', function(){
	return this.get(0)._xMesh ? true : false;
});

tQuery.Mesh.registerInstance('physics', function(){
	return this.get(0)._xMesh;
});

