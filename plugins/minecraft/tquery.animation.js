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
});


// make it eventable
tQuery.MicroeventMixin(tQuery.Animation.prototype);


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

tQuery.Animation.prototype.done	= function(){
	this._totalTime	= 0;
	this._keyframes.forEach(function(keyframe){
		keyframe._startTime	= this._totalTime;
		this._totalTime		+= keyframe.duration;
		keyframe._endTime	= this._totalTime;
	}.bind(this))
	return this;	// for chained API
};

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

tQuery.Animation.prototype.buildPosition	= function(delta){
	// sanity check 
	console.assert(delta < this.duration() );
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
	var frameOffset		= delta - baseFrame._startTime;
	var frameProgress	= frameOffset / baseFrame.duration;
	var nextFrame		= this._keyframes[ (frameIdx+1) % this._keyframes.length ];

	//console.log("delta", delta)
	//console.log("frameIdx", frameIdx)
	//console.log("frameOffset", frameOffset)
	//console.log("frameProgress", frameProgress)
	
	// compute the result based on the linear interpolation between the two frames based on time offset within the frame
	var result	= {};
	for( var property in baseFrame.position ){
		// check the property exists
		console.assert( nextFrame.position[property]	!== undefined );
		console.assert( baseFrame.position[property]	!== undefined );
		// linear interpolation between the values
		var baseValue	= baseFrame.position[property];
		var nextValue	= nextFrame.position[property];
		result[property]= (1-frameProgress) * baseValue + frameProgress * nextValue;
	}
	// return the result
	return result;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animation.prototype.start	= function(){
	this.done();

	var startDate	= Date.now()/1000;
	var duration	= this.duration();
	this._$loopCb	= world.loop().hook(function(){
		var age		= Date.now()/1000 - startDate;
		var position	= this.buildPosition(age % duration)
		this.trigger('updatePosition', position)
	}.bind(this));
}

tQuery.Animation.prototype.isRunning	= function(){
	return this._$loopCb	? true : false;
};

tQuery.Animation.prototype.stop	= function(){
	this._$loopCb	&& world.loop().unhook(this._$loopCb);
	this._$loopCb	= null;
}
