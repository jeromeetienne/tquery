/**
 * @fileOverview This file has the implementation of {@link HTTP} module.
*/
  
require([
	"../js/tquery.core.js",
], function(){

	tQuery.register('create', {
		scene	: function(){
			console.assert( tQuery.Scene, "tquery.scene plugin isnt present")
			return new tQuery.Scene();
		},
		mesh	: function(){
			console.assert( tQuery.Mesh, "tquery.mesh plugin isnt present")
			return new tQuery.Mesh();
		}
	});

	/**
	 * Crearte tQuery.Soop
	*/
	tQuery.register('scene', function(){
		return new tQuery.Scene();
	});
	
	/**
	 * Crearte tQuery.loop
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
});	// require.js end