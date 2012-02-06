tQuery.World.register('addBoilerplate', function(){
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() === true );

	// create the context
	var ctx		= this._extBoilerplate	= {};

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
	// for chained API
	return this;
});

tQuery.World.register('hasBoilerplate', function(){
	return this._extBoilerplate === undefined ? true : false;
});

tQuery.World.register('removeBoilerplate', function(){
	// if not present, return now
	if( this._extBoilerplate === undefined )	return	this;
	// remove the context from this
	var ctx		= this._extBoilerplate;
	delete this._extBoilerplate;

	// remove camera
	this.loop().unhook(ctx.loopCameraControls)
	// stop windowResize
	ctx.windowResize.stop();
	// unbind screenShot
	ctx.screenShot.unbind();
	// unbind fullscreen
	ctx.fullscreen && ctx.fullscreen.unbind();
});