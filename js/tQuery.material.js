// constructor
tQuery.Material	= function(object){
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
	// sanity check - all items MUST be THREE.Geometery
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

// handle inheritance - TODO what how jQuery does it 
tQuery.Material.prototype = new THREE.Material();
tQuery.Material.prototype.constructor = tQuery.Material;

tQuery.Plugins.mixin(tQuery.Material);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Material.prototype.get	= function(idx){
	// sanity check - it MUST be defined
	console.assert(this._lists[idx]);
	return this._lists[idx];
};

tQuery.Material.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};


