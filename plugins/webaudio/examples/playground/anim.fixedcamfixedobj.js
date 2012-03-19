console.assert( tAnim.plugins['fixedCamFixedObj'] === undefined );
tAnim.plugins['fixedCamFixedObj']	= {
	init	: function(){
		var world	= tQuery.world;
		world.removeCameraControls();

		tQuery('torus').position(0,1.3,0).rotation(0,0,0);		
		world.camera().position.set(0, 0, 4).normalize().multiplyScalar(4);
		world.camera().lookAt(new THREE.Vector3(0, 0, 0));
	},
	destroy	: function(){
		
	},
	update	: function(deltaTime, present){
	}
};