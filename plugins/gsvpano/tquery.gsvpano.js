tQuery.registerStatic('createGSVPano', function(opts){
	return new tQuery.GSVPano(opts);
});

tQuery.registerStatic('GSVPano', function(opts){
	// parameter polymorphism
	if( typeof(opts) === 'string' )	opts	= {location: opts};

	opts	= tQuery.extend(opts, {
		zoom	: 3
	});
	console.assert(opts.location !== undefined );


	this._texture	= new THREE.Texture();
	
	this._loader	= new GSVPANO.PanoLoader({
		zoom	: opts.zoom
	});
	this._loader.onPanoramaLoad	= function(){
		this._texture.image	= this._loader.canvas;
		this._texture.needsUpdate = true;
		this.dispatchEvent('load', this._texture)
	}.bind(this);
	
	if( typeof(opts.location) === 'string' ){
		var geocoder	= new google.maps.Geocoder();	
		geocoder.geocode({
			address	: opts.location
		}, function(results, status){
			// notify error if suitable
			if( status !== google.maps.GeocoderStatus.OK ){
				this.dispatchEvent('error', "Geocode failed due to: " + status)
				return;
			}
			//console.log('found Location', results[0].geometry.location );
			var location	= results[0].geometry.location;
			this._loader.load( location );
		}.bind(this));		
	}else if( typeof(opts.location) === 'object' 
			&& typeof(opts.location.lat) === 'number'
			&& typeof(opts.location.lng) === 'number' ){
		var location	= new google.maps.LatLng( opts.location.lat, opts.location.lng );
		this._loader.load( location );
	}else	console.assert(false, 'invalid opts.location');
});


tQuery.MicroeventMixin(tQuery.GSVPano.prototype)


tQuery.GSVPano.prototype.texture	= function(){
	return this._texture;
};

tQuery.GSVPano.prototype.isLoaded	= function(){
	return this._loader.canvas !== undefined ? true : false;
}

tQuery.GSVPano.prototype.buildSkySphere	= function(){
	var tGeometry	= new THREE.SphereGeometry( 500, 60, 40 );
	var tMaterial	= new THREE.MeshBasicMaterial({
		map	: this.texture(),
		side	: THREE.BackSide
	});
	return tQuery(tGeometry, tMaterial);
};



tQuery.GSVPano.prototype.buildMaterial	= function(scale, rAmount){
	// handle parameter polymorphism
	scale		= scale !== undefined ? scale : 1/10;
	rAmount		= rAmount !== undefined ? rAmount : 0.0;	// 0.0 for reflect - 0.8 for refract

	// sanity check
	console.assert(this.isLoaded() === true);

	// scale down
	var canvas	= document.createElement( 'canvas' );
	canvas.width	= this._loader.canvas.width  * scale;
	canvas.height	= this._loader.canvas.height * scale;

	var ctx 	= canvas.getContext( '2d' );
	ctx.drawImage( this._loader.canvas, 0, 0, this._loader.canvas.width, this._loader.canvas.height
				, 0, 0, canvas.width, canvas.height );
	var scaledTexture	= new THREE.Texture(canvas);
	scaledTexture.needsUpdate = true;

	var tMaterial	= new THREE.ShaderMaterial({
		uniforms	: {
			refractTexture	: { type: 't', value: this.texture()	},
			reflectTexture	: { type: 't', value: scaledTexture	},
			rAmount		: { type: 'f', value: 0.0 }	// 0.0 for reflect - 0.8 for refract
		},
		vertexShader	: tQuery.GSVPano._vertexShaderText,
		fragmentShader	: tQuery.GSVPano._fragmentShaderText
	});

	return tMaterial;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.GSVPano._vertexShaderText	= [
'	varying vec3 vReflect;\n',
'	varying vec3 vRefract;\n',
'\n',
'	void main(){\n',
'		// setup varying\n',
'		vec4 mPosition	= modelMatrix * vec4( position, 1.0 );\n',
'		vec3 nWorld	= normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\n',
'		vReflect	= normalize( reflect( normalize( mPosition.xyz - cameraPosition ), nWorld ) );\n',
'		vRefract	= normalize( refract( normalize( mPosition.xyz - cameraPosition ), nWorld, 0.9 ) );\n',
'		// set the vertex at the classical position\n',
'		gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n',
'	}\n',
].join('\n');


tQuery.GSVPano._fragmentShaderText	= [
'	// heavily based on http://www.clicktorelease.com/code/streetViewReflectionMapping/\n',
'	uniform sampler2D refractTexture;\n',
'	uniform sampler2D reflectTexture;\n',
'\n',
'	uniform float rAmount;\n',
'\n',
'	varying vec3 vReflect;\n',
'	varying vec3 vRefract;\n',
'\n',
'	const float PI	= 3.14159265358979323846264;\n',
'\n',
'	void main(void) {\n',
'		// compute reflection color\n',
'		float yaw	= 0.5 - atan( vReflect.z, - vReflect.x ) / ( 2.0 * PI );\n',
'		float pitch	= 0.5 - asin( vReflect.y ) / PI;\n',
'		vec3 color	= texture2D( reflectTexture, vec2( yaw, pitch ) ).rgb * (1.0 - rAmount);\n',
'		// compute refraction color\n',
'		yaw		= 0.5 - atan( vRefract.z, - vRefract.x ) / ( 2.0 * PI );\n',
'		pitch		= 0.5 - asin( vRefract.y ) / PI;\n',
'		color		+=texture2D( refractTexture, vec2( yaw, pitch ) ).rgb * rAmount;\n',
'		// set final color\n',
'		gl_FragColor	= vec4( color, 1.0 );\n',
'	}\n'
].join('\n');
