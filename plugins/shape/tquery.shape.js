tQuery.registerStatic('Shape', function(tShape){
	this._tShape	= tShape	|| new THREE.Shape();
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Shape.prototype.extrude	= function(options){
	// handle parameters
	options	= tQuery.extend(options, tQuery.defaultExtrudeSettings);
	// do the extrude
	var tGeometry	= this._tShape.extrude( options );
	// set the geometry.dynamic by default
	tGeometry.dynamic= true;
	// return the tQuery
	return tQuery(tGeometry)
}

//////////////////////////////////////////////////////////////////////////////////
//		forward functions directly to THREE.Shape			//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Shape.forwardFns	= [
	'moveTo',
	'lineTo',
	'bezierCurveTo',
	'quadraticCurveTo'
];

tQuery.Shape.forwardFns.forEach(function(fn){
	tQuery.Shape.prototype[fn]	= function(){
		// actually call the function
		this._tShape[fn].apply(this._tShape, arguments)
		// for chained API
		return this;
	}
})
