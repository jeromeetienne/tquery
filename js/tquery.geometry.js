/**
 * Handle geometry
 *
 * @class include THREE.Geometry
 *
 * @param {THREE.Geometry} object an instance or an array of instance
*/
tQuery.Geometry	= function(object)
{
	// call parent
	this.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Geometry
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Geometry); });
};

// inherit form tQuery.Node
tQuery.inherit(tQuery.Geometry, tQuery.Node);


// Make it pluginable
tQuery.pluginsMixin(tQuery.Geometry);