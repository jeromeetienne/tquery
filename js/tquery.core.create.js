/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Create tQuery.World
*/
tQuery.registerStatic('createWorld', function(opts){
	return new tQuery.World(opts);
});

/**
 * Create tQuery.World
*/
tQuery.registerStatic('createObject3D', function(){
	var object3d	= new THREE.Object3D();
	return tQuery(object3d);
});


/**
 * Create tQuery.loop
 * 
 * @param {tQuery.World} world the world to display (optional)
 * @function
*/
tQuery.registerStatic('createLoop', function(world){
	return new tQuery.Loop(world);
});


tQuery.registerStatic('createDirectionalLight', function(){
	var tLight	= new THREE.DirectionalLight();
	return new tQuery.DirectionalLight([tLight]);
});

tQuery.registerStatic('createSpotLight', function(){
	var tLight	= new THREE.SpotLight();
	return new tQuery.SpotLight([tLight]);
});

tQuery.registerStatic('createPointLight', function(){
	var tLight	= new THREE.PointLight();
	return new tQuery.PointLight([tLight]);
});

tQuery.registerStatic('createAmbientLight', function(){
	var tLight	= new THREE.AmbientLight();
	return new tQuery.AmbientLight([tLight]);
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
tQuery.registerStatic('defaultObject3DMaterial', new THREE.MeshNormalMaterial());

tQuery.Geometry.prototype.toMesh	= function(material){
	var meshes	= [];
	this.each(function(tGeometry){
		// handle paramters
		material	= material || tQuery.defaultObject3DMaterial;
		// create the THREE.Mesh
		var mesh	= new THREE.Mesh(tGeometry, material)
		// return it
		meshes.push(mesh);
	});
	return new tQuery.Mesh(meshes);
};


/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.registerStatic('createCube', function(){
	var ctor	= THREE.CubeGeometry;
	var dflGeometry	= [1, 1, 1];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var dflGeometry	= [0.5-0.15, 0.15];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createVector3', function(x, y, z){
	return new THREE.Vector3(x, y, z);
});

tQuery.registerStatic('createVector2', function(x, y){
	return new THREE.Vector2(x, y);
});

tQuery.registerStatic('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var dflGeometry	= [0.5, 32, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createPlane', function(){
	var ctor	= THREE.PlaneGeometry;
	var dflGeometry	= [1, 1, 16, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createCylinder', function(){
	var ctor	= THREE.CylinderGeometry;
	var dflGeometry	= [0.5, 0.5, 1, 16, 4];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('_createMesh', function(ctor, dflGeometry, args)
{
	// convert args to array if it is instanceof Arguments
	// FIXME if( args instanceof Arguments )
	args	= Array.prototype.slice.call( args );
	
	// init the material
	var material	= tQuery.defaultObject3DMaterial;
	// if the last arguments is a material, use it
	if( args.length && args[args.length-1] instanceof THREE.Material ){
		material	= args.pop();
	}
	
	// ugly trick to get .apply() to work 
	var createFn	= function(ctor, a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(arguments.length <= 9);
		//console.log("createFn", arguments)
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}
	if( args.length === 0 )	args	= dflGeometry.slice();
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

tQuery.registerStatic('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/100);
	return tQuery(axis);
});
