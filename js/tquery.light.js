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
	// call parent ctor
	tQuery.Light.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Light); });
};

/**
 * inherit from tQuery.Node
 * - TODO this should inherit from tQuery.Object3D but but in inheritance
*/
tQuery.inherit(tQuery.Light, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Light);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Light, {
	color	: tQuery.convert.toThreeColor
});


