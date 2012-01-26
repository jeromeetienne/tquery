/**
 * implementation of the tQuery.Node
 *
 * @class include THREE.Node
 *
 * @param {THREE.Node} object an instance or an array of instance
*/
tQuery.Node	= function(object){
	// handle parameters
	if( object instanceof Array )	this._lists	= object;
	else if( !object )		this._lists	= [];
	else				this._lists	= [object];
	this.length	= this._lists.length;
};

// Make it pluginable
tQuery.pluginsMixin(tQuery.Node, tQuery.Node.prototype);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve the elements matched by the jQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.get	= function(idx){
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
tQuery.Node.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var element	= this._lists[i];
		var keepLooping	= callback(element)
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
tQuery.Node.prototype.back	= function(value){
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
};



