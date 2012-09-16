/**
 * lava shader by TheGameMaker - http://irrlicht.sourceforge.net/forum/viewtopic.php?t=21057
*/
tQuery.Object3D.registerInstance('setLavaMaterial', function(opts){
	opts	= tQuery.extend(opts, {
		fogDensity	: 0.45,
		fogColor	: new THREE.Vector3( 0, 0, 0 ),
		uvScale		: new THREE.Vector2( 3.0, 1.0 ),
		texture1Url	: tQuery.Object3D.prototype.setLavaMaterial.baseUrl+"images/cloud.png",
		texture2Url	: tQuery.Object3D.prototype.setLavaMaterial.baseUrl+"images/lavatile.jpg",
		timeSpeed	: 1
	})
	this.each(function(object3d){
		var uniforms	= {
			fogDensity	: { type: "f"	, value: opts.fogDensity },
			fogColor	: { type: "v3"	, value: opts.fogColor },
			time		: { type: "f"	, value: 1.0 },
			resolution	: { type: "v2"	, value: new THREE.Vector2( window.innerWidth, window.innerHeight ) },
			uvScale		: { type: "v2"	, value: opts.uvScale },
			texture1	: { type: "t"	, value: THREE.ImageUtils.loadTexture( opts.texture1Url ) },
			texture2	: { type: "t"	, value: THREE.ImageUtils.loadTexture( opts.texture2Url ) }
		};
		
		uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
		uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;
		
		var material	= new THREE.ShaderMaterial({
			uniforms	: uniforms,
			vertexShader	: tQuery.Object3D.prototype.setLavaMaterial._vertexShaderText,
			fragmentShader	: tQuery.Object3D.prototype.setLavaMaterial._fragmentShaderText
		});
		
		object3d.material	= material;
		
		tQuery.world.loop().hook(function(delta, now){
			uniforms.time.value += opts.timeSpeed * delta;
		});
	});
	// for chained API
	return this;
});	


// define the baseUrl for this plugins
tQuery.Object3D.prototype.setLavaMaterial.baseUrl	= '../';

// converted by document.getElementById( 'vertexShader' ).textContent.split('\n').map(function(line){ return "\'"+line+"\',"; }).join('\n');
tQuery.Object3D.prototype.setLavaMaterial._vertexShaderText = [
'	uniform vec2 uvScale;',
'	varying vec2 vUv;',
'',
'	void main()',
'	{',
'',
'		vUv		= uvScale * uv;',
'		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
'		gl_Position	= projectionMatrix * mvPosition;',
'',
'	}'
].join('\n');

// converted by document.getElementById( 'fragmentShader' ).textContent.split('\n').map(function(line){ return "\""+line+"\","; }).join('\n');
tQuery.Object3D.prototype.setLavaMaterial._fragmentShaderText = [
'	uniform float time;',
'	uniform vec2 resolution;',
'',
'	uniform float fogDensity;',
'	uniform vec3 fogColor;',
'',
'	uniform sampler2D texture1;',
'	uniform sampler2D texture2;',
'',
'	varying vec2 vUv;',
'',
'	void main( void ) {',
'',
'		vec2 position = -1.0 + 2.0 * vUv;',
'',
'		vec4 noise = texture2D( texture1, vUv );',
'		vec2 T1 = vUv + vec2( 1.5, -1.5 ) * time  *0.02;',
'		vec2 T2 = vUv + vec2( -0.5, 2.0 ) * time * 0.01;',
'',
'		T1.x += noise.x * 2.0;',
'		T1.y += noise.y * 2.0;',
'		T2.x -= noise.y * 0.2;',
'		T2.y += noise.z * 0.2;',
'',
'		float p = texture2D( texture1, T1 * 2.0 ).a;',
'',
'		vec4 color = texture2D( texture2, T2 * 2.0 );',
'		vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );',
'',
'		if( temp.r > 1.0 ){ temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }',
'		if( temp.g > 1.0 ){ temp.rb += temp.g - 1.0; }',
'		if( temp.b > 1.0 ){ temp.rg += temp.b - 1.0; }',
'',
'		gl_FragColor = temp;',
'',
'		float depth = gl_FragCoord.z / gl_FragCoord.w;',
'		const float LOG2 = 1.442695;',
'		float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );',
'		fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',
'',
'		gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );',
'',
'	}'
].join('\n');
