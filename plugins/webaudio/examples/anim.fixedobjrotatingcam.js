console.assert( tAnim.plugins['fixedObjRotatingCam'] === undefined );
tAnim.plugins['fixedObjRotatingCam']	= {
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
		var angle	= 0.2 * present * Math.PI * 2;
		var object	= world.camera();
		var angleX	= angle*0;
		var angleY	= angle*1;
		object.rotation.set(angleX, angleY, 0);
	}
};