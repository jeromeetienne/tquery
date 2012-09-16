tQuery.registerStatic('createSkymap', function(opts){
	// handle parameters polymorphisms
	if( typeof(opts) === 'string' )	opts	= {textureCube: opts};
	// handle parameters
	opts	= tQuery.extend(opts, {
		cubeW		: 1000,
		cubeH		: 1000,
		cubeD		: 1000
	});
	console.assert(opts.textureCube);

	var textureCube	= tQuery.createCubeTexture(opts.textureCube);

	var shader	= THREE.ShaderUtils.lib[ "cube" ];
	shader.uniforms[ "tCube" ].value	= textureCube;

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