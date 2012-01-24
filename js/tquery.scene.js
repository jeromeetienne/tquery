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
	this._scene.add(this._camera);
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
	// TODO make objects3d a possible array
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.add(object3d)
	// for chained API
	return this;
}
tQuery.Scene.prototype.remove	= function(object3d)
{
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.remove(object3d)
	// for chained API
	return this;
}

tQuery.Scene.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	// for chained API
	return this;
}

tQuery.Scene.prototype.renderer	= function(){ return this._renderer;	}
tQuery.Scene.prototype.camera	= function(){ return this._camera;	}
tQuery.Scene.prototype.scene	= function(){ return this._scene;	}
tQuery.Scene.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.render	= function()
{
	// actually render the scene
	this._renderer.render( this._scene, this._camera );
}
