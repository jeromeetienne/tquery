tQuery.register('createMinecraftCharAnimation', function(){
	return new tQuery.MinecraftCharAnimation();
});

tQuery.register('MinecraftCharAnimation', function(){
	this._animations	= {};
	this._currentAnim	= null;
});

tQuery.MinecraftCharAnimation.prototype.destroy	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MinecraftCharAnimation.prototype.addAnimation	= function(name, animation){
	console.assert( animation instanceof tQuery.Animation );
	this._animations[name]	= animation;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MinecraftCharAnimation.prototype.start	= function(animationName){
	if( this.isRunning() )	this.stop();
	console.assert( this._animations[animationName] !== undefined )
	this._currentAnim	= this._animations[animationName];
	this._currentAnim.start();
};

tQuery.Animation.prototype.isRunning	= function(){
	return this._currentAnim ? true : false;
}


tQuery.MinecraftCharAnimation.prototype.stop	= function(){
	this._currentAnim	&& this._currentAnim.destroy();
	this._currentAnim	= null;
}
