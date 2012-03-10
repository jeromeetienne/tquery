/**
 * Handle directional light
 *
 * @class include THREE.LambertMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.LambertMaterial} element an instance or array of instance
*/
tQuery.LambertMaterial	= function(elements)
{
	// call parent ctor
	tQuery.LambertMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.LambertMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.LambertMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.LambertMaterial, {
	color	: tQuery.convert.toThreeColor,
	ambient	: tQuery.convert.toThreeColor
});


