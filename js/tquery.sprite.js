/**
 * Create a tQuery.Sprite
 * 
 * @returns {tQuery.Sprite} the create object
*/
tQuery.registerStatic('createSprite', function(opts, material){
	// handle arguments polymorphism
	if( arguments.length === 1 && 
			(  opts instanceof THREE.Material 
			|| opts instanceof tQuery.Material)
		){
		material= tQuery.convert.toThreeMaterial(opts)
		opts	= undefined
	}
	// create object itself
	var tSprite	= new THREE.Sprite(opts);
	var sprite	= new tQuery.Sprite(tSprite);
	// honor material if provided
	if( material )	sprite.material(material)
	// return just built sprite
	return sprite;
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
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Sprite);


/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Sprite, {
	rotation	: tQuery.convert.toNumber,
});

/**
 * TODO to remove. this function is crap
*/
tQuery.Sprite.prototype.material	= function(value){
	var parent	= tQuery.Sprite.parent;
	// handle the getter case
	if( value === undefined )	return parent.material.call(this);
	// handle parameter polymorphism
	if( value instanceof tQuery.Material )	value	= value.get(0)
	// sanity check
	console.assert( value instanceof THREE.SpriteMaterial )
	// handle the setter case
	this.each(function(tSprite){
		tSprite.material	= value;
	});
	return this;	// for the chained API
}