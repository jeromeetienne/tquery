/**
 * Handle material
 *
 * @class include THREE.Material
 *
 * @param {THREE.Material} object an instance or array of instance
*/
tQuery.Material	= function(object)
{
	// call parent
	this.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

// inherit form tQuery.Node
tQuery.inherit(tQuery.Material, tQuery.Node);
