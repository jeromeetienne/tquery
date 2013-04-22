tQuery.registerStatic('createLinearGradient', function(opts){
	var LinearGradient	= new tQuery.LinearGradient(opts);
	return LinearGradient;
});

/**
 * The emitter of particles
*/
tQuery.registerStatic('LinearGradient', function(opts){
	this._keyPoints	= [];
})

tQuery.LinearGradient.prototype.push	= function(x, y){
	this._keyPoints.push({
		x	: x,
		y	: y
	});
	return this;
}

/**
 * Compute a value for this LinearGradient
*/
tQuery.LinearGradient.prototype.get	= function(x){
	for( var i = 0; i < this._keyPoints.length; i++ ){
		var keyPoint	= this._keyPoints[i];
		if( x <= keyPoint.x )	break;
	}

	if( i === 0 )	return this._keyPoints[0].y;

	// sanity check
	console.assert(i < this._keyPoints.length );

	var prev	= this._keyPoints[i-1];
	var next	= this._keyPoints[i];
	
	var ratio	= (x - prev.x) / (next.x - prev.x)
	var y		= prev.y + ratio * (next.y - prev.y)
	
	return y;
};