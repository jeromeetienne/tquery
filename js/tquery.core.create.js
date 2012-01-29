/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/

/**
 * Create tQuery.Scene
*/
tQuery.register('createScene', function(){
	return new tQuery.Scene();
});

/**
 * Create tQuery.loop
 * 
 * @param {THREE.Scene} scene the scene to display (optional)
 * @function
*/
tQuery.register('createLoop', function(scene){
	return new tQuery.Loop(scene);
});

/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.register('createCube', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.CubeGeometry(1,1,1);
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createTorus', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.TorusGeometry( 0.5-0.15, 0.15 );
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createSphere', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.SphereGeometry( 0.5, 0.5 );
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/40);
	return tQuery(axis);
});
