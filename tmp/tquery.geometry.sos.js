/**
 * Handle geometry
 *
 * @class include THREE.Geometry
 *
 * @param {THREE.Geometry} object an instance or an array of instance
*/
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

// make it pluginable
tQuery.pluginsMixin(tQuery.Geometry);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// TODO all this is in material too.
// - should i make it a subclass ?
// - thus tquery.loop/tquery.scene which are funky are they are single stuff
// - they will use the same stuff

/**
 * Retrieve the elements matched by the jQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Geometry.prototype.get	= function(idx){
	if( idx === undefined )	return this._lists;

	// sanity check - it MUST be defined
	console.assert(this._lists[idx], "element not defined");
	return this._lists[idx];
};

/**
 * loop over element
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Geometry.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};

/**
 * getter/setter of the back pointer
 *
 * @param {Object} back the value to return when .back() is called. optional
 * 
*/
tQuery.Geometry.prototype.back	= function(value){
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
};

