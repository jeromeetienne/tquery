tQuery.registerStatic('createPlanet', function(opts){
	// handle parameters polymorphism
	if( typeof(opts) === 'string' )	opts	= { type: opts };
	// handle options default
	opts	= tQuery.extend(opts, {
		type	: 'moon'
		//type	: 'earth'
	});
	
	var baseUrl	= tQuery.createPlanet.baseUrl;
	if( opts.type === 'moon' ){
		var url		= baseUrl + 'images/moon_1024.jpg';	
		var object	= tQuery.createSphere()
					.addClass('planet')
		object.material(new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture(url)
		}));
	}else if( opts.type === 'earth' ){
		var object	= tQuery.createObject3D()

		var earth	= tQuery.createSphere(0.5, 100, 50).addTo(object)
					.addClass('planet')
		var url		= baseUrl + 'images/earth_atmos_2048.jpg';
		earth.material(new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture(url)
		}));

		var cloud	= tQuery.createSphere(0.52, 100, 50).addTo(object)
					.addClass('cloud')
		var url		= baseUrl + 'images/earth_clouds_1024.png';
		cloud.material(new THREE.MeshBasicMaterial({
			map		: THREE.ImageUtils.loadTexture(url),
			transparent	: true
		}));
	}else if( opts.type === 'earthNormal' ){
		var object	= tQuery.createObject3D()

		var planetTex	= THREE.ImageUtils.loadTexture( baseUrl+"images/earth_atmos_2048.jpg" );
		var normalTex	= THREE.ImageUtils.loadTexture( baseUrl+"images/earth_normal_2048.jpg" );
		var specularTex	= THREE.ImageUtils.loadTexture( baseUrl+"images/earth_specular_2048.jpg" );

		var shader	= THREE.ShaderUtils.lib[ "normal" ];
		var uniforms	= THREE.UniformsUtils.clone( shader.uniforms );

		uniforms[ "tNormal" ].value	= normalTex;
		uniforms[ "uNormalScale" ].value.set(0.85, 0.85);

		uniforms[ "tDiffuse" ].value	= planetTex;
		uniforms[ "tSpecular" ].value	= specularTex;

		uniforms[ "enableAO" ].value		= false;
		uniforms[ "enableDiffuse" ].value	= true;
		uniforms[ "enableSpecular" ].value	= true;

		uniforms[ "uDiffuseColor" ].value.setHex( 0xffffff );
		uniforms[ "uSpecularColor" ].value.setHex( 0x666666 );
		uniforms[ "uAmbientColor" ].value.setHex( 0x000000 );

		uniforms[ "uShininess" ].value		= 20;

		uniforms[ "uDiffuseColor" ].value.convertGammaToLinear();
		uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
		uniforms[ "uAmbientColor" ].value.convertGammaToLinear();

		var materialNormalMap = new THREE.ShaderMaterial({
			fragmentShader	: shader.fragmentShader,
			vertexShader	: shader.vertexShader,
			uniforms	: uniforms,
			lights		: true
		});

		var geometry	= new THREE.SphereGeometry(0.5, 30, 15 );
		geometry.computeTangents();

		tQuery(geometry, materialNormalMap).addTo(object)
			.addClass('planet')

		// clouds
		var url		= baseUrl + 'images/earth_clouds_1024.png';
		var texture	= THREE.ImageUtils.loadTexture(url)
		var materialClouds = new THREE.MeshLambertMaterial({
			color		: 0xffffff,
			map		: texture,
			transparent	: true
		});

		tQuery( geometry, materialClouds ).addTo(object)
			.addClass('cloud')
			.scaleBy(1.01)
	}else	console.assert(false, 'unknown opts.type: '+opts.type)

	return object;
});

tQuery.createPlanet.baseUrl	= "../../../plugins/planets/";
