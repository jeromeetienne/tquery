/**
 * Base class for animation 
*/
tQuery.Animation	= function()
{
	this._attachedLoop	= null;
}

tQuery.Animation.prototype.destroy	= function()
{
	if( this.isRunning() )	this.stop();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Start the animation
*/
tQuery.Animation.prototype.start	= function(loop)
{
	console.assert(this.isRunning() === false);

	this._attachedLoop	= loop || tQuery.world.loop();
	this._loopCallback	= function(){
		this.update();
	}.bind(this);

	loop.hook(this._loopCallback);

	return this;	// for chained API
}

/**
 * Stop the animation
*/
tQuery.Animation.prototype.stop	= function()
{
	if(this.isRunning() === false)	return this;

	this._attachedLoop.removeHook(this._loopCallback);
	this._attachedLoop	= null;
	this._loopCallback	= null;

	return this;	// for chained API
}

/**
 * @returns {Boolean} true if the animation is running, false otherwise
*/
tQuery.Animation.prototype.isRunning	= function()
{
	return this._attachedLoop ? true : false;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Update the animation
*/
tQuery.Animation.prototype.update	= function()
{
	console.log("dummy update function");
	return this;	// for chained API
}
