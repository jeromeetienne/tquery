//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setPhongMaterial', function(opts){
	var material	= tQuery.createMeshPhongMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshPhongMaterial', function(opts){
	var tMaterial	= new THREE.MeshPhongMaterial(opts);
	var material	= new tQuery.MeshPhongMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle directional light
 *
 * @class include THREE.PhongMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.PhongMaterial} element an instance or array of instance
*/
tQuery.MeshPhongMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshPhongMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshPhongMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshPhongMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshPhongMaterial, {
	map		: tQuery.convert.toTexture,
	
	color		: tQuery.convert.toThreeColor,
	ambient		: tQuery.convert.toThreeColor,
	emissive	: tQuery.convert.toThreeColor,
	specular	: tQuery.convert.toThreeColor,

	shininess	: tQuery.convert.toNumber,
	
	bumpMap		: tQuery.convert.toTexture,
	bumpScale	: tQuery.convert.toNumber,

	metal		: tQuery.convert.toBoolean,
	perPixel	: tQuery.convert.toBoolean
});


