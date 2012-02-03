/**
 * implementation of the tQuery.Node
 *
 * @class base class for tQuery objects
 *
 * @param {Object} object an instance or an array of instance
*/
tQuery.Node	= function(object)
{
	// handle parameters
	if( object instanceof Array )	this._lists	= object;
	else if( !object )		this._lists	= [];
	else				this._lists	= [object];
	this.length	= this._lists.length;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve the elements matched by the tQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.get	= function(idx)
{
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
tQuery.Node.prototype.each	= function(callback)
{
	return tQuery.each(this._lists, callback)
};

/**
 * getter/setter of the back pointer
 *
 * @param {Object} back the value to return when .back() is called. optional
*/
tQuery.Node.prototype.back	= function(value)
{
	if( value  === undefined )	return this._back;
	this._back	= value;
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.data	= function(key, value)
{
	// handle the setter case
	if( value ){
		this.each(function(element){
			tQuery.data(element, key, value);
		});
		return this;	// for chained API
	}
	// return the value of the first element
	if( this.length > 0 )	return tQuery.data(this.get(0), key)
	// return undegined if the list is empty
	console.assert(this.length === 0);
	return undefined
}


/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.removeData	= function(key)
{
	this.each(function(element){
		tQuery.removeData(element, key);
	});
	return this;	// for chained API
}