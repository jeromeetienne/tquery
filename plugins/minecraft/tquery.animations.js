/**
 * create a tQuery.Animations
 *
 * @name tQuery.createAnimations
 * @class
*/
tQuery.register('createAnimations', function(){
	return new tQuery.Animations();
});

/**
 * handle multiple tQuery.Animation mutually exclusive
 *
 * @name tQuery.Animations
 * @class
*/
tQuery.register('Animations', function(){
	this._animations	= {};
	this._currentAnim	= null;
});

/**
 * Destructor
*/
tQuery.Animations.prototype.destroy	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Add an animation
 *
 * @param {String} name the name of the animation to add
 * @param {tQuery.Animation} animation the tQuery.Animation to add
*/
tQuery.Animations.prototype.add	= function(name, animation){
	console.assert( animation instanceof tQuery.Animation );
	this._animations[name]	= animation;
	return this;	// for chained api
};

tQuery.Animations.prototype.list	= function(){
	return this._animations;
};

/**
 * return the name of all animations
 * 
 * @returns {String[]} list of the animations names
*/
tQuery.Animations.prototype.names	= function(){
	return Object.keys(this._animations);
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Start a animation. If an animation is already running, it is stopped
 * 
 * @param {string} animationName the name of the animation
*/
tQuery.Animations.prototype.start	= function(animationName){
	if( this.isRunning() )	this.stop();
	console.assert( this._animations[animationName] !== undefined, "unknown animation name: "+animationName)
	this._currentAnim	= this._animations[animationName];
	this._currentAnim.start();
	return this;	// for chained API
};

/**
 * test if an animation is running
 * 
 * @returns {boolean} true if an animation is running, false otherwise
*/
tQuery.Animations.prototype.isRunning	= function(){
	return this._currentAnim ? true : false;
}

/**
 * Stop the running animation if any
*/
tQuery.Animations.prototype.stop	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
	this._currentAnim	= null;
	return this;	// for chained API
}
