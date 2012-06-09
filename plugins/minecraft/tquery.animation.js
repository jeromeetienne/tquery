tQuery.register('createAnimation', function(){
	return new tQuery.Animation();
});



//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

/**
*/
tQuery.register('Animation', function(){
	this._keyframes	= new Array;
	this._totalTime	= null;
	this._onUpdate	= null;
	this._onCapture	= function(position){};
	this._initialPos= {};
});


tQuery.Animation.prototype.destroy	= function(){
	this.stop();
};	


//////////////////////////////////////////////////////////////////////////////////
//		setup								//
//////////////////////////////////////////////////////////////////////////////////

/**
*/
tQuery.Animation.prototype.pushKeyframe	= function(duration, position){
	this._keyframes.push({
		duration	: duration,
		position	: position
	});
	return this;	// for chained API
};

tQuery.Animation.prototype.onUpdate	= function(fn){
	this._onUpdate	= fn
	return this;	// for chained API
}
tQuery.Animation.prototype.onCapture	= function(fn){
	this._onCapture	= fn
	return this;	// for chained API
}

/**
 * @returns {Number} the duration of the whole animation
*/
tQuery.Animation.prototype.duration	= function(){
	if( this._keyframes.length === 0 )	return 0;
	var lastKeyframe	= this._keyframes[this._keyframes.length - 1];
	return lastKeyframe._endTime;
};


//////////////////////////////////////////////////////////////////////////////////
//		interpolation							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animation.prototype.buildPosition	= function(age){
	// compute the deltatime
	var delta	= age % this.duration();
	// find baseFrame based on delta
	for(var frameIdx = 0; frameIdx < this._keyframes.length; frameIdx++){
		var baseFrame	= this._keyframes[frameIdx];
		if( delta <  baseFrame._startTime )	continue;
		if( delta >= baseFrame._endTime )	continue;
		break;
	}
	// sanity check - the baseFrame has to be known
	console.assert( frameIdx !== this._keyframes.length );
	// compute some variables
	var timeOffset	= delta - baseFrame._startTime;
	var timePercent	= timeOffset / baseFrame.duration;
	var nextFrame	= this._keyframes[ (frameIdx+1) % this._keyframes.length ];

	//console.log("delta", delta)
	//console.log("frameIdx", frameIdx)
	//console.log("timeOffset", timeOffset)
	//console.log("timePercent", timePercent)

	var basePosition= baseFrame.position;
	var nextPosition= nextFrame.position;

	// zero this._initialPos if age > baseFrame.duration - it wont be usefull anymore
	if( age > baseFrame.duration && this._initialPos )	this._initialPos= null;
	// if frameIdx === 0 and there is a this._initialPos, use it as basePosition
	if( frameIdx === 0 && this._initialPos )	basePosition	= this._initialPos;
	
	// compute the result based on the linear interpolation between the two frames based on time offset within the frame
	var result	= {};
	for( var property in baseFrame.position ){
		// check the property exists
		console.assert( nextPosition[property]	!== undefined );
		console.assert( basePosition[property]	!== undefined );
		// linear interpolation between the values
		var baseValue	= basePosition[property];
		var nextValue	= nextPosition[property];
		result[property]= (1-timePercent) * baseValue + timePercent * nextValue;
	}
	// return the result
	return result;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animation.prototype.start	= function(){
	// update _startTime and _endTime
	this._totalTime	= 0;
	this._keyframes.forEach(function(keyframe){
		keyframe._startTime	= this._totalTime;
		this._totalTime		+= keyframe.duration;
		keyframe._endTime	= this._totalTime;
	}.bind(this));
	
	// get this._initialPos from this._onCapture()
	// - the initial position is the position when the animation started.
	// - it will be used as basePosition during the first keyframe of the animation
	// - it is optional
	this._initialPos= tQuery.extend({}, this._keyframes[0].position)
	this._onCapture(this._initialPos);

	// init the loop callback
	var startDate	= Date.now()/1000;
	var duration	= this.duration();
	this._$loopCb	= world.loop().hook(function(){
		var age		= Date.now()/1000 - startDate;
		var position	= this.buildPosition(age)
		this._onUpdate(position)
	}.bind(this));
}

tQuery.Animation.prototype.isRunning	= function(){
	return this._$loopCb	? true : false;
};

tQuery.Animation.prototype.stop	= function(){
	this._$loopCb	&& world.loop().unhook(this._$loopCb);
	this._$loopCb	= null;
}
