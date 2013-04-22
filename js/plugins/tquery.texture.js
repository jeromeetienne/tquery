/**
 * Handle light
 *
 * @class include THREE.Texture. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Light} object an instance or array of instance
*/
tQuery.Texture	= function(elements)
{
	// call parent ctor
	tQuery.Texture.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Texture
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Texture); });
};

// inherit from tQuery.Node
tQuery.inherit(tQuery.Texture, tQuery.Node);

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.Texture);

// Make each instances pluginable
tQuery.pluginsInstanceOn(tQuery.Texture);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Texture, {
	offset	: tQuery.convert.toVector2,
	repeat	: tQuery.convert.toVector2,
});


