/**
 * Handle directional light
 *
 * @class include THREE.DirectionalLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.DirectionalLight} element an instance or array of instance
*/
tQuery.DirectionalLight	= function(elements)
{
	// call parent ctor
	tQuery.DirectionalLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.DirectionalLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.DirectionalLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.DirectionalLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.DirectionalLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber,

	shadowDarkness		: tQuery.convert.toNumberZeroToOne,
	shadowBias		: tQuery.convert.toNumber,

	shadowMapWidth		: tQuery.convert.toInteger,
	shadowMapHeight		: tQuery.convert.toInteger,

	shadowCameraRight	: tQuery.convert.toNumber,
	shadowCameraLeft	: tQuery.convert.toNumber,
	shadowCameraTop		: tQuery.convert.toNumber,
	shadowCameraBottom	: tQuery.convert.toNumber,
	shadowCameraVisible	: tQuery.convert.toBoolean,
	
	shadowCameraNear	: tQuery.convert.toNumber,
	shadowCameraFar		: tQuery.convert.toNumber
});



