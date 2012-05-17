tQuery.register('createSkymap', function(opts){
	// handle parameters polymorphisms
	if( typeof(opts) === 'string' )	opts	= {textureCube: opts};
	// handle parameters
	opts	= tQuery.extend(opts, {
		cubeW		: 100,
		cubeH		: 100,
		cubeD		: 100
	});
	console.assert(opts.textureCube);


	var textureCube	= tQuery.createTextureCube(opts.textureCube);

	var shader	= THREE.ShaderUtils.lib[ "cube" ];
	shader.uniforms[ "tCube" ].texture = textureCube;

	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: shader.uniforms,
		depthWrite	: false
	});

	var geometry	= new THREE.CubeGeometry( 100, 100, 100 );
	var mesh	= new THREE.Mesh(geometry, material );
	mesh.flipSided = true;

	return tQuery(mesh);
});