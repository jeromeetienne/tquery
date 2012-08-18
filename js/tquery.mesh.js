/**
 * Handle mesh
 *
 * @class include THREE.Mesh. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Mesh} object an instance or array of instance
*/
tQuery.Mesh	= function(elements)
{
	// call parent ctor
	var parent	= tQuery.Mesh.parent;
	parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Mesh
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Mesh); });
};

/**
 * inherit from tQuery.Object3D
*/
tQuery.inherit(tQuery.Mesh, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Mesh);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * TODO to remove. this function is crap
*/
tQuery.Mesh.prototype.material	= function(value){
	var parent	= tQuery.Mesh.parent;
	// handle the getter case
	if( value == undefined )	return parent.material.call(this);
	// handle parameter polymorphism
	if( value instanceof tQuery.Material )	value	= value.get(0)
	// sanity check
	console.assert( value instanceof THREE.Material )
	// handle the setter case
	this.each(function(tMesh){
		tMesh.material	= value;
	});
	return this;	// for the chained API
}

