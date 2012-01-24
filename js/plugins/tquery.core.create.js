/**
 * Create tQuery.Soop
*/
tQuery.register('scene', function(){
	return new tQuery.Scene();
});

/**
 * Create tQuery.loop
 * @param {THREE.Scene} scene the scene to display (optional)
*/
tQuery.register('loop', function(scene){
	return new tQuery.Loop(scene);
});

/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.register('cube', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.CubeGeometry(1,1,1);
	geometry.dynamic	= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('torus', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.TorusGeometry( 0.5-0.15, 0.15 );
	geometry.dynamic	= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('sphere', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.SphereGeometry( 0.5, 0.5 );
	geometry.dynamic	= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});
