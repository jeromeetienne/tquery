/**
 * Create a checkerboard tQuery.Mesh
*/
tQuery.registerStatic('createGrassGround', function(opts){
	// handle parameters
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

	var texture	= THREE.ImageUtils.loadTexture(opts.textureUrl);
	texture.wrapS	= THREE.RepeatWrapping;
	texture.wrapT	= THREE.RepeatWrapping;
	texture.repeat.set(opts.textureRepeatX, opts.textureRepeatY);
	texture.anisotropy = opts.anisotropy;

	var material	= new THREE.MeshBasicMaterial({
		map	: texture,
		color	: 0x44FF44
	})

	// create the geometry	
	var geometry	= new THREE.PlaneGeometry( opts.width, opts.height, opts.segmentsW, opts.segmentsH);
	// create the mesh
	var mesh	= new THREE.Mesh(geometry, material);
	mesh.rotation.x	= -Math.PI/2;
	// return the tQuery
	return tQuery(mesh);
});

tQuery.createGrassGround.baseUrl	= "../../../plugins/grassground/";
