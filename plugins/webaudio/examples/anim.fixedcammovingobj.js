console.assert( tAnim.plugins['fixedCamMovingObj'] === undefined );
tAnim.plugins['fixedCamMovingObj']	= {
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
		var angle	= 0.3 * present * Math.PI * 2;
		var object	= tQuery('torus').get(0);
		var radiusX	= 3;
		var radiusZ	= 10;
		object.position.x	= Math.cos(angle)*radiusX;
		object.position.z	= Math.sin(angle)*radiusZ - radiusZ;			
	}
};