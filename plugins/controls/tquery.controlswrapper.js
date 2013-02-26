/**
 * creator
 * 
 * @return {tQuery.ControlsWrapper} [description]
 */
tQuery.registerStatic('createControlsWrapper', function(opts){
	var controls	= new tQuery.ControlsWrapper(opts)
	return controls;
})

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.ControlsWrapper						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * ControlWrapper offers transparent handling of the rendering loop.
 * automatic update + pausable. and that for any THREE.Controls
 */
tQuery.registerStatic('ControlsWrapper', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		millisecond	: false
	});
	// sanity check
	console.assert(opts.controls, 'controls MUST be set');
	// set some variables
	this._world	= opts.world;
	this._controls	= opts.controls;
	this._opts	= opts;

	this._paused	= false;
})

/**
 * destructor
 */
tQuery.ControlsWrapper.prototype.destroy = function(){
	this.stop()
}

//////////////////////////////////////////////////////////////////////////////////
//		pause handle							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.ControlsWrapper.prototype.start = function() {
	console.assert( this.isStarted() === false );
	
	this._callback	= this._world.loop().hook(function(delta, now){
		// check if it is paused
		if( this._paused )	return;
		// update the wrapped controls
		var inMsec	= this._opts.millisecond;
		this._controls.update(delta * (inMsec ? 1000 : 1), now * (inMsec ? 1000 : 1))		
	}.bind(this))
	return this;	// for chained API
}

tQuery.ControlsWrapper.prototype.stop = function() {
	if( this.isStarted() === false )	return
	this._world.loop().unhook(this._callback)		
	return this;	// for chained API
}

tQuery.ControlsWrapper.prototype.isStarted = function() {
	return this._callback ? true : false
}


//////////////////////////////////////////////////////////////////////////////////
//		pause handle							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * pause toggle - if paused, the controls no more control the object. otherwise it does
 * @return {tQuery.ControlsWrapper} for chained API
 */
tQuery.ControlsWrapper.prototype.pause = function() {
	this._paused	= this._paused ? false : true;
	return this;
}

/**
 * return true if the controls is paused, true otherwise
 * @return {Boolean} the value
 */
tQuery.ControlsWrapper.prototype.isPaused = function() {
	return this._paused;
}
