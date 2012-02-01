tQuery.World.register('boilerplate', function(){
	var camera	= this.camera();
	var renderer	= this.renderer();

	// create a camera contol
	var cameraControls	= new THREEx.DragPanControls(camera)
	tQuery.loop.hook(function(){
		cameraControls.update();
	})
	// transparently support window resize
	var windowResize	= THREEx.WindowResize.bind(renderer, camera);
	// allow 'p' to make screenshot
	var screenShot		= THREEx.Screenshot.bindKey(renderer);
	// allow 'f' to go fullscreen where this feature is supported
	if( THREEx.FullScreen.available() ){
		var fullscreen	= THREEx.FullScreen.bindKey();		
	}
	
	return this;	// for chained API
});
