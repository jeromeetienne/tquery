//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.register('setBasicMaterial', function(opts){
	var material	= tQuery.createMeshBasicMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.register('createMeshBasicMaterial', function(opts){
	var tMaterial	= new THREE.MeshBasicMaterial(opts);
	var material	= new tQuery.MeshBasicMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle directional light
 *
 * @class include THREE.BasicMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.BasicMaterial} element an instance or array of instance
*/
tQuery.MeshBasicMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshBasicMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshBasicMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshBasicMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshBasicMaterial, {
	color		: tQuery.convert.toThreeColor,
	ambient		: tQuery.convert.toThreeColor,
	map		: tQuery.convert.toTexture,
	wireframe	: tQuery.convert.toBool
});


