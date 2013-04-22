tQuery.SpaceShips.registerStatic('createDetonation', function(){
	var url		= '../../lensflare/images/lensflare0.png';
	var texture	= THREE.ImageUtils.loadTexture(url);
	// do the material	
	var material	= new THREE.MeshBasicMaterial({
		color		: 0x00ffff,
		map		: texture,
		side		: THREE.DoubleSide,
		blending	: THREE.AdditiveBlending,
		depthWrite	: false,
		transparent	: true
	})

	
	var object3D	= tQuery.createPlane(material)
		.scaleBy(0.75)

	return object3D;
});