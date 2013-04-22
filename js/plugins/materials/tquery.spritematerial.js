//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Sprite.registerInstance('setSpriteMaterial', function(opts){
	var material	= tQuery.createSpriteMaterial(opts).back(this);
	this.material( material.get(0) );
	return material;
})

tQuery.registerStatic('createSpriteMaterial', function(opts){
	opts		= tQuery.extend(opts, {
		useScreenCoordinates	: false
	});
	var tMaterial	= new THREE.SpriteMaterial(opts);
	var material	= new tQuery.SpriteMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle Sprite Material
 *
 * @class include THREE.SpriteMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.SpriteMaterial} element an instance or array of instance
*/
tQuery.SpriteMaterial	= function(elements)
{
	// call parent ctor
	tQuery.SpriteMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.SpriteMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.SpriteMaterial, tQuery.Material);


/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.SpriteMaterial, {
	color			: tQuery.convert.toThreeColor,
	map			: tQuery.convert.toTexture,
	useScreenCoordinates	: tQuery.convert.toBoolean,
	depthTest		: tQuery.convert.toBoolean,
	sizeAttenuation		: tQuery.convert.toBoolean,
	scaleByViewport		: tQuery.convert.toBoolean,
	
	fog			: tQuery.convert.toBoolean,
	opacity			: tQuery.convert.toNumber,
	blending		: tQuery.convert.toNumber
});


