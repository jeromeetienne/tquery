// constructor
tQuery.Geometry	= function(object){
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
	// sanity check - all items MUST be THREE.Geometery
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Geometry);	});
	
	// compute bounding boxes
	this.each(function(geometry){
		geometry.computeBoundingBox();
	});
};

// handle inheritance - TODO what how jQuery does it 
tQuery.Geometry.prototype = new THREE.Geometry();
tQuery.Geometry.prototype.constructor = tQuery.Geometry;

tQuery.Plugins.mixin(tQuery.Geometry);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.prototype.get	= function(idx){
	// sanity check - it MUST be defined
	console.assert(this._lists[idx]);
	return this._lists[idx];
};

tQuery.Geometry.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};


