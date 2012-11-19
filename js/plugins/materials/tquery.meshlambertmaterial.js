//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setLambertMaterial', function(opts){
	var material	= tQuery.createMeshLambertMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshLambertMaterial', function(opts){
	var tMaterial	= new THREE.MeshLambertMaterial(opts);
	var material	= new tQuery.MeshLambertMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

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
tQuery.MeshLambertMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshLambertMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshLambertMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshLambertMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshLambertMaterial, {
	color		: tQuery.convert.toThreeColor,
	ambient		: tQuery.convert.toThreeColor,
	map		: tQuery.convert.toTexture,
	bumpMap		: tQuery.convert.toTexture,
	bumpScale	: tQuery.convert.toNumber,
	side		: tQuery.convert.identity
});


