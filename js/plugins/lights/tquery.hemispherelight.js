/**
 * Handle directional light
 *
 * @class include THREE.HemisphereLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.HemisphereLight} element an instance or array of instance
*/
tQuery.HemisphereLight	= function(elements)
{
	// call parent ctor
	tQuery.HemisphereLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.HemisphereLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.HemisphereLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.HemisphereLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.HemisphereLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber,
	groundColor	: tQuery.convert.toThreeColor
});


