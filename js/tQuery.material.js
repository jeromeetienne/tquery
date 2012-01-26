/**
 * Handle material
 *
 * @class include THREE.Material
 *
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.Material	= function(object)
{
	// call parent
	this.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Geometery
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

// inherit from Marble.Marble methods
tQuery.Material.prototype		= new tQuery.Node();
tQuery.Material.prototype.constructor	= tQuery.Node;
tQuery.Material.prototype.parent	= tQuery.Node.prototype;
