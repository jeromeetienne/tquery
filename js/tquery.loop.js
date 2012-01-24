//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.loop	= function(scene){
	return new tQuery.Loop(scene);
}

// constructor
tQuery.Loop	= function(scene)
{
	// internally if scene present do that
	this._scene	= scene;
	this._hooks	= [];

	// if scene is available, hook it ON_RENDER
	this._scene && this.hookOnRender(function(){
		this._scene.render();
	}.bind(this));
};

// make it pluginable
tQuery.Plugins.mixin(tQuery.Loop);


tQuery.Loop.prototype.destroy	= function()
{
	this.stop();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Loop.prototype.start	= function()
{
	if( this._timerId )	this.stop();
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );
	// for chained API
	return this;
}

tQuery.Loop.prototype.stop	= function()
{
	cancelAnimationFrame(this._timerId);
	this._timerId	= null;
	// for chained API
	return this;
}

tQuery.Loop.prototype._onAnimationFrame	= function(time)
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );

	// run all the hooks - from lower level to higher - in order of registration
	for(var level = 0; level <= this._hooks.length; level++){
		if( this._hooks[level] === undefined )	continue;
		var callbacks	= this._hooks[level].slice(0)
		for(var i = 0; i < callbacks.length; i++){
			callbacks[i](time);
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle the hooks						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Loop.prototype.PRE_RENDER		= 20;
tQuery.Loop.prototype.ON_RENDER		= 50;
tQuery.Loop.prototype.POST_RENDER	= 80;

tQuery.Loop.prototype.hook	= function(level, callback)
{
	this._hooks[level]	= this._hooks[level] || [];
	console.assert(this._hooks[level].indexOf(callback) === -1)
	this._hooks[level].push(callback);
	// for chained API
	return this;
}

tQuery.Loop.prototype.unhook	= function(level, callback)
{
	var index	= this._hooks[level].indexof(callback);
	console.assert(index !== -1);
	this._hooks[level].splice(idx, 1);
	this._hooks[level].length === 0 && delete this._hooks[level]
	// for chained API
	return this;
}


// bunch of shortcut

tQuery.Loop.prototype.hookPreRender	= function(callback){
	return this.hook(this.PRE_RENDER, callback)
}

tQuery.Loop.prototype.hookOnRender	= function(callback){
	return this.hook(this.ON_RENDER, callback)
}
tQuery.Loop.prototype.hookPostRender	= function(callback){
	return this.hook(this.POST_RENDER, callback)
}
