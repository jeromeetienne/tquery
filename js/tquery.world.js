//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle world (aka scene+camera+renderer)
 *
 * @class tQuery.World
 * 
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.World	= function(opts)
{
	// handle parameters
	opts	= opts	|| {};
	opts	= tQuery.extend(opts, {
		renderW		: window.innerWidth,
		renderH		: window.innerHeight,
		webGLNeeded	: true, 
		autoRendering	: true,
		scene		: null,
		camera		: null,
		renderer	: null
	});
	this._opts	= opts;

	// update default world.
	// - TODO no sanity check ?
	// - not clear what to do with this...
	// - tQuery.world is the user world. like the camera controls
	console.assert( !tQuery.word );
	tQuery.world	= this;

	this._autoRendering	= true;
	
	// create a scene
	this._scene	= opts.scene	||(new THREE.Scene());

 	// create a camera in the scene
	if( !opts.camera ){
		this._camera	= new THREE.PerspectiveCamera(35, opts.renderW / opts.renderH, 0.01, 10000 );
		this._camera.position.set(0, 0, 3);
		this._scene.add(this._camera);
	}else{
		this._camera	= opts.camera;
	}
	
	// create the loop
	this._loop	= new tQuery.Loop();

	// hook the render function in this._loop
	this._$loopCb	= this._loop.hookOnRender(function(delta, now){
		this.render(delta);
	}.bind(this));

	// create a renderer
	if( opts.renderer ){
		this._renderer	= opts.renderer;
	}else if( tQuery.World.hasWebGL() ){
		this._renderer	= new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
	}else if( !opts.webGLNeeded ){
		this._renderer	= new THREE.CanvasRenderer();
	}else{
		this._addGetWebGLMessage();
		throw new Error("WebGL required and not available")
	}
	this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	this._renderer.setSize( opts.renderW, opts.renderH );
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.World);

// make it eventable
tQuery.MicroeventMixin(tQuery.World.prototype)

/**
 * destructor
 */
tQuery.World.prototype.destroy	= function(){
	// microevent.js notification
	this.trigger('destroy');
	// unhook the render function in this._loop
	this._loop.unhookOnRender(this._$loopCb);
	// destroy the loop
	this._loop.destroy();
	// remove this._cameraControls if needed
	this.removeCameraControls();
	// remove renderer element
	var parent	= this._renderer.domElement.parentElement;
	parent	&& parent.removeChild(this._renderer.domElement);
	
	// clear the global if needed
	if( tQuery.world === this )	tQuery.world = null;
}

//////////////////////////////////////////////////////////////////////////////////
//		WebGL Support							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World._hasWebGL	= undefined;
/**
 * @returns {Boolean} true if webgl is available, false otherwise
*/
tQuery.World.hasWebGL	= function(){
	if( tQuery.World._hasWebGL !== undefined )	return tQuery.World._hasWebGL;

	// test from Detector.js
	try{
		tQuery.World._hasWebGL	= !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ){
		tQuery.World._hasWebGL	= false;
	}
	return tQuery.World._hasWebGL;
};

/**
 * display 'add webgl message' - taken from detector.js
 * @param   {DOMElement?} parent dom element to which we hook it
 * @private
 */
tQuery.World.prototype._addGetWebGLMessage	= function(parent)
{
	parent	= parent || document.body;
	
	// message directly taken from Detector.js
	var domElement = document.createElement( 'div' );
	domElement.style.fontFamily	= 'monospace';
	domElement.style.fontSize	= '13px';
	domElement.style.textAlign	= 'center';
	domElement.style.background	= '#eee';
	domElement.style.color		= '#000';
	domElement.style.padding	= '1em';
	domElement.style.width		= '475px';
	domElement.style.margin		= '5em auto 0';
	domElement.innerHTML		= window.WebGLRenderingContext ? [
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

// TODO why not a getter/setter here
tQuery.World.prototype.setCameraControls	= function(control){
	if( this.hasCameraControls() )	this.removeCameraControls();
	this._cameraControls	= control;
	return this;	// for chained API
};

tQuery.World.prototype.getCameraControls	= function(){
	return this._cameraControls;
};

/**
 * remove the camera controls
 * @return {tQuery.World} for chained API
 */
tQuery.World.prototype.removeCameraControls	= function(){
	if( this.hasCameraControls() === false )	return this;
	this._cameraControls	= undefined;
	return this;	// for chained API
};

/**
 * test if there is a camera controls
 * @return {Boolean} true if there is, false otherwise
 */
tQuery.World.prototype.hasCameraControls	= function(){
	return this._cameraControls !== undefined ? true : false;
};

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.World.prototype.add	= function(object3d)
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
tQuery.World.prototype.remove	= function(object3d)
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

/**
 * append renderer domElement
 * @param  {DOMElement} domElement the domelement which will be parent
 * @return {tQuery.World} for chained API
 */
tQuery.World.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	// for chained API
	return this;
}

/**
 * Start the loop
*/
tQuery.World.prototype.start	= function(){
	this._loop.start();
	return this;	// for chained API
}
/**
 * Stop the loop
*/
tQuery.World.prototype.stop	= function(){
	this._loop.stop();
	return this;	// for chained API
}

tQuery.World.prototype.loop	= function(){ return this._loop;	}

tQuery.World.prototype.tRenderer= function(){ return this._renderer;	}
tQuery.World.prototype.tScene	= function(){ return this._scene;	}
tQuery.World.prototype.tCamera	= function(){ return this._camera;	}


// backward compatible functions to remove
tQuery.World.prototype.renderer	= function(){  console.trace();console.warn("world.renderer() is ovbslete, use .tRenderer() instead");
						return this._renderer;	}
tQuery.World.prototype.camera	= function(){ console.trace();console.warn("world.camera() is obsolete, use .tCamerar() instead");
						return this._camera;	}
tQuery.World.prototype.scene	= function(){ console.trace();console.warn("world.scene() is obsolete, use .tScene() instead");
						return this._scene;	}
tQuery.World.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.prototype.autoRendering	= function(value){
	if(value === undefined)	return this._autoRendering;
	this._autoRendering	= value;
	return this;
}


tQuery.World.prototype.render	= function(delta)
{
	// update the cameraControl
	if( this.hasCameraControls() )	this._cameraControls.update(delta);
	// render the scene 
	if( this._autoRendering )	this._renderer.render( this._scene, this._camera );
}
