/**
 * Handle directional light
 *
 * @class include THREE.PointLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.PointLight} element an instance or array of instance
*/
tQuery.PointLight	= function(elements)
{
	// call parent ctor
	tQuery.PointLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.PointLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.PointLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.PointLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.PointLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber
});


