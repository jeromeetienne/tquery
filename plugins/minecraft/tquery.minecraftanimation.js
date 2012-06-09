/**
*/
tQuery.register('MinecraftAnimation', function(){
	this._keyframes	= [];	
});

/**
*/
tQuery.MinecraftAnimation.prototype.pushKeyframe	= function(delay, position){
	this._keyframes.push({
		delay	: delay,
		position: position
	});
	return this;	// for chained API
};

