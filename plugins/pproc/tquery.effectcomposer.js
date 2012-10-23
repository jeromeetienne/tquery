//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createEffectComposer', function(opts){
	return new tQuery.EffectComposer(opts);
});


// TODO make it plugin
tQuery.World.prototype.addEffectComposer	= function(composer){
	this._composer	= composer || tQuery.createEffectComposer({world: this, back: this}).renderPass();
	return this._composer;
}
tQuery.World.prototype.getEffectComposer	= function(){
	return this._composer;
}
tQuery.World.prototype.removeEffectComposer	= function(){
	this._composer	= null;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('EffectComposer', function(opts){
	// handle parameters
	this._opts	= opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		back	: null
	});
	console.assert(opts.world);

	var world	= opts.world;
	var tRenderer	= world.tRenderer();

	this._tComposer	= new THREE.EffectComposer( tRenderer );

	world.autoRendering(false);
	tRenderer.autoClear = false;

	world.loop().hookOnRender(function(delta, now){
		tRenderer.clear();
		this._tComposer.render(delta);
	}.bind(this))
});


tQuery.EffectComposer.prototype.destroy	= function(){
}
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


tQuery.EffectComposer.prototype.tComposer	= function(){
	return this._tComposer;
}

tQuery.EffectComposer.prototype.finish	= function(){
	var composer	= this._tComposer;
	if( composer.passes.length === 0 )	return this;
	
	composer.passes[composer.passes.length -1 ].renderToScreen	= true;

	return this._opts.back;
};

tQuery.EffectComposer.prototype.back		= tQuery.EffectComposer.prototype.finish;

//////////////////////////////////////////////////////////////////////////////////
//		List of all the Passes						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.EffectComposer.prototype.renderPass	= function(scene, camera){
	// handle parameters default values
	scene	= scene		|| this._opts.world.tScene();
	camera	= camera	|| this._opts.world.tCamera();
	// create the effect
	var effect	= new THREE.RenderPass( scene, camera );
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.vignette	= function(offset, darkness){
	// handle parameters default values
	offset	= offset 	!== undefined ? offset	: 1.05;
	darkness= darkness	!== undefined ? darkness: 1.5;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.VignetteShader );
	// setup the effect
	effect.uniforms[ "offset"	].value	= offset;
	effect.uniforms[ "darkness"	].value = darkness;
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.fxaa	= function(resolutionX, resolutionY){
	// handle parameters default values
	resolutionX	= resolutionX 	!== undefined ? resolutionX	: 1;
	resolutionY	= resolutionY 	!== undefined ? resolutionY	: 1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.FXAAShader );
	// setup the effect
	effect.uniforms[ "resolution"	].value.x	= resolutionX / window.innerWidth;
	effect.uniforms[ "resolution"	].value.y	= resolutionX / window.innerHeight;
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.bloom	= function(strength, kernelSize, sigma, resolution){
	// let default to original function
	// create the effect
	var effect	= new THREE.BloomPass(strength, kernelSize, sigma, resolution);
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.film	= function(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale){
	// let default to original function
	// create the effect
	var effect	= new THREE.FilmPass(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale);
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.colorify	= function(color){
	// handle parameters default values
	color	= color	|| new THREE.Color(0xffdddd);
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.ColorifyShader );
	// setup the effect
	effect.uniforms[ 'color' ].value.copy(color);
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.sepia	= function(amount){
	// handle parameters default values
	amount	= amount !== undefined ? amount	: 0.9;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.SepiaShader );
	// setup the effect
	effect.uniforms[ "amount" ].value = amount;
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.bleachbypass	= function(opacity){
	// handle parameters default values
	opacity	= opacity !== undefined ? opacity	: 0.95;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.BleachBypassShader );
	// setup the effect
	effect.uniforms[ "opacity" ].value = opacity;
	// add the effect
	this._tComposer.addPass( effect );
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
	this._tComposer.addPass( effect );
	return this;	// for chained API
};

tQuery.EffectComposer.prototype.horizontalBlur	= function(h){
	// handle parameters default values
	h	= h !== undefined ? h	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.HorizontalBlurShader );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'h' ].value		= h / ( window.innerWidth/2 );
	// add the effect
	this._tComposer.addPass( effect );
	return this;	// for chained API
}

tQuery.EffectComposer.prototype.verticalBlur	= function(v){
	// handle parameters default values
	v	= v !== undefined ? v	: 1.1;
	// create the effect
	var effect	= new THREE.ShaderPass( THREE.VerticalBlurShader );
	// setup the effect
	// TODO how to handle this renderer size thing
	effect.uniforms[ 'v' ].value	= v / ( window.innerHeight/2 );
	// add the effect
	this._tComposer.addPass( effect );
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
	var effectBlend	= new THREE.ShaderPass( THREE.BlendShader, "tDiffuse1" );
	effectBlend.uniforms[ 'tDiffuse2' ].value	= effectSave.renderTarget;
	effectBlend.uniforms[ 'mixRatio' ].value	= mixRatio;
	this._tComposer.addPass( effectBlend );
	this._tComposer.addPass( effectSave );
	return this;	// for chained API
}