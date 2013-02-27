/**
 * Create a checkerboard tQuery.Mesh
*/
tQuery.registerStatic('createGrassGround', function(opts){
	// handle parameters default
	opts	= tQuery.extend(opts, {
		width		: 1,
		height		: 1,
		segmentsW	: 1,
		segmentsH	: 1,
		textureRepeatX	: 1,
		textureRepeatY	: 1,
		anisotropy	: 16,
		textureUrl	: tQuery.createGrassGround.baseUrl + 'images/grasslight-big.jpg'
	});
	// create the texture	
	var texture	= THREE.ImageUtils.loadTexture(opts.textureUrl);
	texture.wrapS	= THREE.RepeatWrapping;
	texture.wrapT	= THREE.RepeatWrapping;
	texture.repeat.set(opts.textureRepeatX, opts.textureRepeatY);
	texture.anisotropy = opts.anisotropy;

	var object3D	= tQuery.createPlane(opts.width, opts.height, opts.segmentsW, opts.segmentsH)
		.setBasicMaterial()
			.map(texture)
			.color(0x44FF44)
			.back()
		.rotationX(-Math.PI/2)

	return object3D;
});

tQuery.createGrassGround.baseUrl	= "../../../plugins/grassground/";
