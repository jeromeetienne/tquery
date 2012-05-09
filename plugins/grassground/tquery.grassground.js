/**
 * Create a checkerboard tQuery.Mesh
*/
tQuery.register('createGrassGround', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		width		: 1,
		height		: 1,
		segmentsW	: 1,
		segmentsH	: 1,
		textureRepeatX	: 1,
		textureRepeatY	: 1,
		textureUrl	: '../images/grasslight-big.jpg'
	});

	var texture	= THREE.ImageUtils.loadTexture(opts.textureUrl);
	texture.wrapS	= THREE.RepeatWrapping;
	texture.wrapT	= THREE.RepeatWrapping;
	texture.repeat.set(opts.textureRepeatX, opts.textureRepeatY);

	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		color	: 0x44FF44
	})

	// create the geometry	
	var geometry	= new THREE.PlaneGeometry( opts.width, opts.height, opts.segmentsW, opts.segmentsH);
	// create the mesh
	var mesh	= new THREE.Mesh(geometry, material);
	// return the tQuery
	return tQuery(mesh);
});