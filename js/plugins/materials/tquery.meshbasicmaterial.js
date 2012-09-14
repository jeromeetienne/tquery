//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setBasicMaterial', function(opts){
	var material	= tQuery.createMeshBasicMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshBasicMaterial', function(opts){
	var tMaterial	= new THREE.MeshBasicMaterial(opts);
	var material	= new tQuery.MeshBasicMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle Basic Material
 *
 * @class include THREE.MeshBasicMaterial. It inherit from {@link tQuery.Material}
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
 * Initial code to automatically extract attribute names from THREE.Material child classes

 	var extractMaterialAttribute	= function(className){
		var parentClass	= new THREE.Material();
		var mainClass	= new THREE[className]();
		var parentProps	= Object.keys(parentClass)
		var mainProps	= Object.keys(mainClass)
		console.log("parentProps", JSON.stringify(parentProps, null, '\t'),"mainProps", JSON.stringify(mainProps, null, '\t'));
		mainProps	= mainProps.filter(function(property){
			return parentProps.indexOf(property) === -1;
		})
		console.log("mainProps", JSON.stringify(mainProps, null, '\t'));
		return mainProps;
	}
*/
/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshBasicMaterial, {
	color			: tQuery.convert.toThreeColor,
	ambient			: tQuery.convert.toThreeColor,
	map			: tQuery.convert.toTexture,
	envMap			: tQuery.convert.toTexture,
	wireframe		: tQuery.convert.toBoolean,
	wireframeLinewidth	: tQuery.convert.toInteger,
	wireframeLinecap	: tQuery.convert.toString
});


