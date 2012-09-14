/**
 * Create a tQuery.Sprite
 * 
 * @returns {tQuery.Sprite} the create object
*/
tQuery.registerStatic('createSprite', function(opts){
	opts		= tQuery.extend(opts, {
		useScreenCoordinates	: false
	});
	var sprite	= new THREE.Sprite(opts);
	return new tQuery.Sprite(sprite)
})

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Wrapper on top of THREE.Sprite
*/
tQuery.registerStatic('Sprite', function(elements){
	// call parent ctor
	tQuery.Sprite.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Sprite); });
});

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Sprite, tQuery.Object3D);


/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Sprite, {
	color			: tQuery.convert.toThreeColor,
	map			: tQuery.convert.toTexture,
	useScreenCoordinates	: tQuery.convert.toBoolean
});
