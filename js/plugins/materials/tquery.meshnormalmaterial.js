//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setNormalMaterial', function(opts){
	var material	= tQuery.createMeshNormalMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshNormalMaterial', function(opts){
	var tMaterial	= new THREE.MeshNormalMaterial(opts);
	var material	= new tQuery.MeshNormalMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MeshNormalMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshNormalMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshNormalMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshNormalMaterial, tQuery.Material);
