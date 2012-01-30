//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle scene
 *
 * @class include THREE.Material
 *
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.Scene	= function()
{
	// update default scene.
	// - TODO no sanity check ?
	tQuery.scene	= this;
	
	// create a scene
	this._scene	= new THREE.Scene();

	// create a renderer
	if( this._hasWebGL ){
		this._renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	}else{
		this._addGetWebGLMessage();
		throw new Error("WebGL required and not available")
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
tQuery.pluginsMixin(tQuery.Scene);


tQuery.Scene.prototype.destroy	= function()
{
}

//////////////////////////////////////////////////////////////////////////////////
//		WebGL Support							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * true if webgl is available, false otherwise
*/
tQuery.Scene.prototype._hasWebGL	= (function(){
	// test from Detector.js
	try{
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ){
		return false;
	}
})();

/**
*/
tQuery.Scene.prototype._addGetWebGLMessage	= function(parent)
{
	parent	= parent || document.body;
	
	// message directly taken from Detector.js
	var domElement = document.createElement( 'div' );
	domElement.style.fontFamily = 'monospace';
	domElement.style.fontSize = '13px';
	domElement.style.textAlign = 'center';
	domElement.style.background = '#eee';
	domElement.style.color = '#000';
	domElement.style.padding = '1em';
	domElement.style.width = '475px';
	domElement.style.margin = '5em auto 0';
	domElement.innerHTML = window.WebGLRenderingContext ? [
		'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' ) : [
		'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' );

	parent.appendChild(domElement);
}

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.Scene.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.add(object3d)		
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

/**
 * remove an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.Scene.prototype.remove	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.remove(object3d)
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.remove(object3d)
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

tQuery.Scene.prototype.fullpage	= function()
{
	// FIXME i dont like this function. way too cooked for tquery core stuff
	// put it elsewhere ? in a plugin ?
	
	// Should that be in pluging
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	return this.appendTo(domElement);
}


tQuery.Scene.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
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
