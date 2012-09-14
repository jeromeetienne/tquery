// backward compatibility only
tQuery.World.registerInstance('fullpage', function(){
	console.log("world.fullpage() is obsolete. use world.boilerplate() instead.");
	return this.boilerplate();
});

tQuery.World.registerInstance('boilerplate', function(opts){
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

/**
 * Define a page title
*/
tQuery.World.registerInstance('pageTitle', function(element){
	// handle parameters polymorphism
	if( typeof(element) === 'string' ){
		var element	= document.querySelector(element);
	}
	// sanity check
	console.assert( element instanceof HTMLElement, ".pageTitle(element) needs a HTMLElement");
	// set element.style
	element.style.position	= "absolute";
	element.style.width	= "100%";
	element.style.textAlign	= "center";
	element.style.fontWeight= "bolder";
	element.style.fontColor	= "white";
	element.style.paddingTop= "0.5em";
	element.style.fontFamily= "arial";
	// for chained API
	return this;
});

tQuery.World.registerInstance('addBoilerplate', function(opts){
	var _this	= this;
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() !== true );
	// handle parameters	
	opts	= tQuery.extend(opts, {
		stats		: true,
		cameraControls	: true,
		windowResize	: true,
		screenshot	: true,
		fullscreen	: true
	});
	// get the context
	var ctx	= {};
	
	// make tRenderer.domElement style "display: block" - by default it is inline-block
	// - so it is affected by line-height and create a white line at the bottom
	this.tRenderer().domElement.style.display = "block"

	// create the context
	tQuery.data(this, '_boilerplateCtx', ctx);

	// get some variables
	var tCamera	= this.tCamera();
	var tRenderer	= this.tRenderer();

	// add Stats.js - https://github.com/mrdoob/stats.js
	if( opts.stats ){
		ctx.stats	= new Stats();
		ctx.stats.domElement.style.position	= 'absolute';
		ctx.stats.domElement.style.bottom	= '0px';
		tRenderer.domElement.parentNode && tRenderer.domElement.parentNode.appendChild( ctx.stats.domElement );
		ctx.loopStats	= function(){
			ctx.stats.update();
		};
		this.loop().hook(ctx.loopStats);		
	}

	// create a camera contol
	if( opts.cameraControls ){
		ctx.cameraControls	= new THREEx.DragPanControls(tCamera);
		this.setCameraControls(ctx.cameraControls);		
	}

	// transparently support window resize
	if( opts.windowResize ){
		ctx.windowResize	= THREEx.WindowResize.bind(tRenderer, tCamera);		
	}
	// allow 'p' to make screenshot
	if( opts.screenshot ){		
		ctx.screenshot		= THREEx.Screenshot.bindKey(tRenderer);
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

tQuery.World.registerInstance('hasBoilerplate', function(){
	// get the context
	var ctx	= tQuery.data(this, "_boilerplateCtx")
	// return true if ctx if defined, false otherwise
	return ctx === undefined ? false : true;
});

tQuery.World.registerInstance('removeBoilerplate', function(){
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