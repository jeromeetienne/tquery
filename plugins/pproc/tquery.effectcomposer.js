//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.register('createEffectComposer', function(opts){
	return new tQuery.EffectComposer(opts);
});

tQuery.register('EffectComposer', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	console.assert(opts.world);
	this._opts	= opts;

// TODO how effectComposer and world are linked is still undetermined
	opts.world.autoRendering(false);


	var renderer	= opts.world.renderer();
	//renderer.setClearColorHex( 0x000000, 1 );
	renderer.autoClear = false;

	this._composer	= new THREE.EffectComposer( renderer );
	
	world.loop().hookOnRender(function(){
		renderer.clear();
		this._composer.render();
	}.bind(this));
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.EffectComposer.prototype.composer	= function(){
	return this._composer;
}

tQuery.EffectComposer.prototype.finish	= function(){
	var composer	= this._composer;
	if( composer.passes.length === 0 )	return this;
	
	composer.passes[composer.passes.length -1 ].renderToScreen	= true;
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.EffectComposer.prototype.renderPass	= function(scene, camera){
	// handle parameters default values
	scene	= scene		|| this._opts.world.scene();
	camera	= camera	|| this._opts.world.camera();
	// create the effect
	var effect	= new THREE.RenderPass( scene, camera );
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.vignette	= function(offset, darkness){
	// handle parameters default values
	offset	= offset 	!== undefined ? offset	: 1.05;
	darkness= darkness	!== undefined ? darkness: 1.5;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "vignette" ] );
	// setup the effect
	effect.uniforms[ "offset"	].value	= offset;
	effect.uniforms[ "darkness"	].value = darkness;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.fxaa	= function(resolutionX, resolutionY){
	// handle parameters default values
	resolutionX	= resolutionX 	!== undefined ? resolutionX	: 1;
	resolutionY	= resolutionY 	!== undefined ? resolutionY	: 1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "fxaa" ] );
	// setup the effect
	effect.uniforms[ "resolution"	].value.x	= resolutionX / window.innerWidth;
	effect.uniforms[ "resolution"	].value.y	= resolutionX / window.innerHeight;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.bloom	= function(strength, kernelSize, sigma, resolution){
	// let default to original function
	// create the effect
	var effect	= new THREE.BloomPass(strength, kernelSize, sigma, resolution);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.film	= function(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale){
	// let default to original function
	// create the effect
	var effect	= new THREE.FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.colorify	= function(color){
	// handle parameters default values
	color	= color	|| new THREE.Color(0xffdddd);
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "colorify" ] );
	// setup the effect
	effect.uniforms[ 'color' ].value.copy(color);
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.sepia	= function(amount){
	// handle parameters default values
	amount	= amount !== undefined ? amount	: 0.9;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "sepia" ] );
	// setup the effect
	effect.uniforms[ "amount" ].value = amount;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.bleachbypass	= function(opacity){
	// handle parameters default values
	opacity	= opacity !== undefined ? opacity	: 0.95;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "bleachbypass" ] );
	// setup the effect
	effect.uniforms[ "opacity" ].value = opacity;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.screen	= function(opacity){
	// handle parameters default values
	opacity	= opacity !== undefined ? opacity	: 0.95;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "screen" ] );
	// setup the effect
	effect.uniforms[ "opacity" ].value = opacity;
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.horizontalBlur	= function(h){
	// handle parameters default values
	h	= h !== undefined ? h	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "horizontalBlur" ] );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'h' ].value		= h / ( window.innerWidth/2 );
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
}

tQuery.EffectComposer.prototype.verticalBlur	= function(v){
	// handle parameters default values
	v	= v !== undefined ? v	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ShaderExtras[ "verticalBlur" ] );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'v' ].value	= v / ( window.innerHeight/2 );
	// add the effect
	this._composer.addPass( effect );
	return this;	// for chained API
}

tQuery.EffectComposer.prototype.motionBlur	= function(mixRatio){
	// handle parameters default values
	mixRatio	= mixRatio !== undefined ? mixRatio	: 0.8;

	var renderTarget= new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
		minFilter	: THREE.LinearFilter,
		magFilter	: THREE.LinearFilter,
		format		: THREE.RGBFormat,
		stencilBuffer	: false
	});
	var effectSave	= new THREE.SavePass( renderTarget );
	var effectBlend	= new THREE.ShaderPass( THREE.ShaderExtras["blend"], "tDiffuse1" );
	effectBlend.uniforms[ 'tDiffuse2' ].texture	= effectSave.renderTarget;
	effectBlend.uniforms[ 'mixRatio' ].value	= mixRatio;
	this._composer.addPass( effectBlend );
	this._composer.addPass( effectSave );
	return this;	// for chained API
}