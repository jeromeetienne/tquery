/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Create tQuery.World
*/
tQuery.register('createWorld', function(){
	return new tQuery.World();
});

/**
 * Create tQuery.loop
 * 
 * @param {tQuery.World} world the world to display (optional)
 * @function
*/
tQuery.register('createLoop', function(world){
	return new tQuery.Loop(world);
});


tQuery.register('createDirectionalLight', function(){
	var tLight	= new THREE.DirectionalLight(0xFFFFFF * Math.random());
	tLight.position.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
	return tQuery(tLight);
});

tQuery.register('createAmbientLight', function(){
	var tLight	= new THREE.AmbientLight(0xFFFFFF);
	return tQuery(tLight);
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * contains the default material to use when create tQuery.Object3D
 * 
 * @fieldOf tQuery
 * @name defaultObject3DMaterial
*/
tQuery.register('defaultObject3DMaterial', new THREE.MeshNormalMaterial());

/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.register('createCube', function(){
	var ctor	= THREE.CubeGeometry;
	var defaults	= [1, 1, 1, tQuery.defaultObject3DMaterial];
	return this._createMesh(ctor, defaults, arguments)
});

tQuery.register('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var defaults	= [0.5-0.15, 0.15, tQuery.defaultObject3DMaterial];
	return this._createMesh(ctor, defaults, arguments)
});

tQuery.register('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var defaults	= [0.5, 32, 16, tQuery.defaultObject3DMaterial];
	return this._createMesh(ctor, defaults, arguments)
});

tQuery.register('createPlane', function(){
	var ctor	= THREE.PlaneGeometry;
	var defaults	= [1, 1, 16, 16, tQuery.defaultObject3DMaterial];
	return this._createMesh(ctor, defaults, arguments)
});

tQuery.register('createCylinder', function(){
	var ctor	= THREE.CylinderGeometry;
	var defaults	= [0.5, 0.5, 1, 16, 4, tQuery.defaultObject3DMaterial];
	return this._createMesh(ctor, defaults, arguments)
});

tQuery.register('_createMesh', function(ctor, defaults, origArguments){
	var args	= Array.prototype.slice.call( origArguments.length ? origArguments : defaults);

	// init the material
	var material	= tQuery.defaultObject3DMaterial;
	// if the last arguments is a material, use it
	if( args.length && args[args.length-1] instanceof THREE.Material ){
		material	= args.pop();
	}
	
	// ugly trick to get .apply() to work 
	var createFn	= function(ctor, a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(arguments.length <= 9);
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}
	args.unshift(ctor);
	var geometry	= createFn.apply(this, args);

	// set the geometry.dynamic by default
	geometry.dynamic= true;
	// create the THREE.Mesh
	var mesh	= new THREE.Mesh(geometry, material)
	// return it
	return tQuery(mesh);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/40);
	return tQuery(axis);
});
