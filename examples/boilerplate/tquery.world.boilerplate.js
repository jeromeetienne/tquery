tQuery.World.register('addBoilerplate', function(){
	var _this	= this;
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() !== true );

	// create the context
	tQuery.data(this, '_boilerplateCtx', {});
	// get the context
	var ctx	= tQuery.data(this, "_boilerplateCtx");

	// add Stats.js - https://github.com/mrdoob/stats.js
	ctx.stats	= new Stats();
	ctx.stats.domElement.style.position	= 'absolute';
	ctx.stats.domElement.style.bottom	= '0px';
	document.body.appendChild( ctx.stats.domElement );

	// get some variables
	var camera	= this.camera();
	var renderer	= this.renderer();

	// create a camera contol
	ctx.cameraControls	= new THREEx.DragPanControls(camera)
	ctx.loopCameraControls	= function(){
		ctx.cameraControls.update();
	};
	this.loop().hook(ctx.loopCameraControls);

	// transparently support window resize
	ctx.windowResize	= THREEx.WindowResize.bind(renderer, camera);
	// allow 'p' to make screenshot
	ctx.screenShot		= THREEx.Screenshot.bindKey(renderer);
	// allow 'f' to go fullscreen where this feature is supported
	if( THREEx.FullScreen.available() ){
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
	document.body.removeChild(ctx.stats.domElement );
	// remove camera
	this.loop().unhook(ctx.loopCameraControls)
	// stop windowResize
	ctx.windowResize.stop();
	// unbind screenShot
	ctx.screenShot.unbind();
	// unbind fullscreen
	ctx.fullscreen && ctx.fullscreen.unbind();
});