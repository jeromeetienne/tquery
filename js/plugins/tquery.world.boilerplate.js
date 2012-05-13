// backward compatibility only
tQuery.World.register('fullpage', function(){
	console.log("world.fullpage() is obsolete. use world.boilerplate() instead.");
	return this.boilerplate();
});

tQuery.World.register('boilerplate', function(opts){
	// put renderer fullpage
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	this.appendTo(domElement);
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
	
	// add the boilerplate
	this.addBoilerplate(opts);
	
	// for chained API
	return this;
});

tQuery.World.register('addBoilerplate', function(opts){
	var _this	= this;
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() !== true );
	// handle parameters	
	opts	= tQuery.extend(opts, {
		honorInfo	: true,
		stats		: true,
		cameraControls	: true,
		windowResize	: true,
		screenshot	: true,
		fullscreen	: true
	});
	// get the context
	var ctx	= {};

	// create the context
	tQuery.data(this, '_boilerplateCtx', ctx);

	// add css for the info element if any
	if( opts.honorInfo ){
		var element	= document.getElementById('info');
		if( element ){
			element.style.position	= "absolute";
			element.style.width	= "100%";
			element.style.textAlign	= "center";
		}
	}

	// add Stats.js - https://github.com/mrdoob/stats.js
	if( opts.stats ){
		ctx.stats	= new Stats();
		ctx.stats.domElement.style.position	= 'absolute';
		ctx.stats.domElement.style.bottom	= '0px';
		document.body.appendChild( ctx.stats.domElement );
		ctx.loopStats	= function(){
			ctx.stats.update();
		};
		this.loop().hook(ctx.loopStats);		
	}

	// get some variables
	var camera	= this.camera();
	var renderer	= this.renderer();

	// create a camera contol
	if( opts.cameraControls ){
		ctx.cameraControls	= new THREEx.DragPanControls(camera);
		this.setCameraControls(ctx.cameraControls);		
	}

	// transparently support window resize
	if( opts.windowResize ){
		ctx.windowResize	= THREEx.WindowResize.bind(renderer, camera);		
	}
	// allow 'p' to make screenshot
	if( opts.screenshot ){		
		ctx.screenshot		= THREEx.Screenshot.bindKey(renderer);
	}
	// allow 'f' to go fullscreen where this feature is supported
	if( opts.fullscreen && THREEx.FullScreen.available() ){
		ctx.fullscreen	= THREEx.FullScreen.bindKey();		
	}

	// bind 'destroy' event on tQuery.world
	ctx._$onDestroy	= this.bind('destroy', function(){
		if( this.hasBoilerplate() === false )	return;
		this.removeBoilerplate();	
	});
	
	// for chained API
	return this;
});

tQuery.World.register('hasBoilerplate', function(){
	// get the context
	var ctx	= tQuery.data(this, "_boilerplateCtx")
	// return true if ctx if defined, false otherwise
	return ctx === undefined ? false : true;
});

tQuery.World.register('removeBoilerplate', function(){
	// get context
	var ctx	= tQuery.data(this, '_boilerplateCtx');
	// if not present, return now
	if( ctx === undefined )	return	this;
	// remove the context from this
	tQuery.removeData(this, '_boilerplateCtx');

	// unbind 'destroy' for tQuery.World
	this.unbind('destroy', this._$onDestroy);

	// remove stats.js
	ctx.stats		&& document.body.removeChild(ctx.stats.domElement );
	ctx.stats		&& this.loop().unhook(ctx.loopStats);
	// remove camera
	ctx.cameraControls	&& this.removeCameraControls()
	// stop windowResize
	ctx.windowResize	&& ctx.windowResize.stop();
	// unbind screenshot
	ctx.screenshot		&& ctx.screenshot.unbind();
	// unbind fullscreen
	ctx.fullscreen		&& ctx.fullscreen.unbind();
});