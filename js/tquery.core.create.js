/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/

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
	return this._createObj(ctor, defaults, arguments)
});

tQuery.register('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var defaults	= [0.5-0.15, 0.15, tQuery.defaultObject3DMaterial];
	return this._createObj(ctor, defaults, arguments)
});

tQuery.register('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var defaults	= [0.5, 32, 16, tQuery.defaultObject3DMaterial];
	return this._createObj(ctor, defaults, arguments)
});

tQuery.register('_createObj', function(ctor, defaults, origArguments){
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

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/40);
	return tQuery(axis);
});
