//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// constructor
tQuery.Scene	= function(){
	// create a scene
	this._scene	= new THREE.Scene();

	// create a renderer
	if( Detector.webgl ){
		this._renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	// uncomment if webgl is required
	//}else{
	//	Detector.addGetWebGLMessage();
	//	return true;
	}else{
		this._renderer	= new THREE.CanvasRenderer();
	}
	// FIXME this window dimension is crap
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	// create a camera in the scene
	// FIXME this window dimension is crap
	this._camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	this._camera.position.set(0, 0, 5);
	this._scene.add(camera);

	requestAnimationFrame( this._render.bind(this) );
};

// make it pluginable
tQuery.Plugins.mixin(tQuery.Scene);


tQuery.Scene.prototype.destroy	= function()
{
	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.add	= function(object3d)
{
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.remove(object3d)
}
tQuery.Scene.prototype.remove	= function(object3d)
{
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.add(object3d)
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype._render	= function()
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame( this._render.bind(this) );

	// actually render the scene
	this._renderer.render( this._scene, this._camera );
}
