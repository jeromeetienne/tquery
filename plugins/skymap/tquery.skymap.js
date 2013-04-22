tQuery.registerStatic('createSkymap', function(opts){
	// handle parameters polymorphisms
	if( typeof(opts) === 'string' )		opts	= {cubeTexture: opts};
	if( opts instanceof THREE.Texture )	opts	= {cubeTexture: opts};
	// handle parameters
	opts	= tQuery.extend(opts, {
		cubeW		: 1000,
		cubeH		: 1000,
		cubeD		: 1000
	});
	console.assert(opts.cubeTexture);

	var cubeTexture	= tQuery.createCubeTexture(opts.cubeTexture);

	var shader	= THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value	= cubeTexture;

	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		depthWrite	: false,
		side		: THREE.BackSide
	});

	var geometry	= new THREE.CubeGeometry( opts.cubeW, opts.cubeH, opts.cubeD );
	var mesh	= new THREE.Mesh(geometry, material );

	return tQuery(mesh);
});