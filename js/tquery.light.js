/**
 * Handle light
 *
 * @class include THREE.Light. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Light} object an instance or array of instance
*/
tQuery.Light	= function(elements)
{
	// make a new if the ctor is used directly
	if( this instanceof tQuery.Light === false )	return new tQuery.Light(elements);
	// call parent
	this.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Light); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Light, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Light);