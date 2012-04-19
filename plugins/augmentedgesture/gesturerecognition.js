AugmentedGesture.GestureRecognition	= function(){
	this._lastEvent	= null;
};


AugmentedGesture.GestureRecognition.prototype.update	= function(x, y, areaW, areaH)
{
	var sectionW	= areaW/3;
	var sectionH	= areaH/3;

	var event	= null;
	if( x < 1*sectionW )		event	= 'left';
	else if( x < 2*sectionW )	event	= 'middle';
	else 				event	= 'right';

//console.log("x", x, "areaW", areaW, "sectionW", sectionW, "event", event)
	if( event === this._lastEvent ){
		event	= null;
	}else{
		this._lastEvent	= event;
	}
	return event;
}

