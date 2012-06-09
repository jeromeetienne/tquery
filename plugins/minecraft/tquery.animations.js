tQuery.register('createAnimations', function(){
	return new tQuery.Animations();
});

tQuery.register('Animations', function(){
	this._animations	= {};
	this._currentAnim	= null;
});

tQuery.Animations.prototype.destroy	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animations.prototype.add	= function(name, animation){
	console.assert( animation instanceof tQuery.Animation );
	this._animations[name]	= animation;
};

tQuery.Animations.prototype.list	= function(){
	return this._animations;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animations.prototype.start	= function(animationName){
	if( this.isRunning() )	this.stop();
	console.assert( this._animations[animationName] !== undefined, "unknown animation name: "+animationName)
	this._currentAnim	= this._animations[animationName];
	this._currentAnim.start();
};

tQuery.Animations.prototype.isRunning	= function(){
	return this._currentAnim ? true : false;
}


tQuery.Animations.prototype.stop	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
	this._currentAnim	= null;
}
