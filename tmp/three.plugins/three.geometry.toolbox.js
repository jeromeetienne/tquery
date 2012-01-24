// to make THREE.Geometry pluginable do
// $ THREE.Plugins.mixin(THREE.Geometry);


/**
 * Scale the geometry
*/
THREE.Geometry.register('scale', function(scale){
	// handle parameters
	if( typeof scale === "number" && arguments.length === 1 ){
		scale	= new THREE.Vector3(scale, scale, scale);
	}else if( typeof scale === "number" && arguments.length === 3 ){
		scale	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(scale instanceof THREE.Vector3, "Geometry.scale parameter error");

	// change all geometry.vertices
	var geometry	= this;
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.multiplySelf(scale); 
	}

	// mark the vertices as dirty
	geometry.dynamic	= true;
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
});


/**
 * Translate
*/
THREE.Geometry.register('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(delta instanceof THREE.Vector3);

	// change all geometry.vertices
	var geometry	= this;
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.addSelf(delta); 
	}

	// mark the vertices as dirty
	geometry.dynamic	= true;
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
});

/**
 * Middle point
 * @returns {THREE.Vector3} point for this geometry
*/
THREE.Geometry.register('middlePoint', function(){
	var geometry	= this;
	// compute bounding box - TODO is that needed ?
	geometry.computeBoundingBox();

	// compute middle
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.max.x + geometry.boundingBox.min.x ) / 2;
	middle.y	= ( geometry.boundingBox.max.y + geometry.boundingBox.min.y ) / 2;
	middle.z	= ( geometry.boundingBox.max.z + geometry.boundingBox.min.z ) / 2;

	// return the just computed middle
	return middle;	
});

/**
 * Middle point
 * @returns {THREE.Vector3} point for this geometry
*/
THREE.Geometry.register('center', function(noX, noY, noZ){
	// compute delta
	var delta	= this.middlePoint().negate();
	if( noX )	delta.x	= 0;
	if( noY )	delta.y	= 0;
	if( noZ )	delta.z	= 0;

	return this.translate(delta)
});


/**
 * Middle point
 * @returns {THREE.Vector3} point for this geometry
*/
THREE.Geometry.register('rotate', function(angles, order){
	// handle parameters
	if( typeof angles === "number" && arguments.length >= 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
		order	= arguments[3];
	}
	console.assert(angles instanceof THREE.Vector3, "Geometry.rotate parameter error");

	order	= order	|| 'XYZ';

	// compute bounding box - TODO is that needed ?
	this.computeBoundingBox();
	
	var matrix	= new THREE.Matrix4();
	matrix.setRotationFromEuler(angles, order);
	this.applyMatrix( matrix );

	// mark the vertices as dirty
	geometry.dynamic	= true;
	this.__dirtyVertices	= true;

	return this;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREE.Geometry.register('size', function(){
	// compute bounding box - TODO is that needed ?
	this.computeBoundingBox();
	// compute middle
	var size= new THREE.Vector3()
	size.x	= geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	size.y	= geometry.boundingBox.max.y - geometry.boundingBox.min.y;
	size.z	= geometry.boundingBox.max.z - geometry.boundingBox.min.z;

	// return the just computed middle
	return size;	
});

THREE.Geometry.register('normalize', function(){
	var size	= this.size();
	if( size.x >= size.y && size.x >= size.z ){
		return this.scale(1/size.x);
	}else if( size.y >= size.x && size.y >= size.z ){
		return this.scale(1/size.y);
	}else{
		return this.scale(1/size.z);
	}
});

