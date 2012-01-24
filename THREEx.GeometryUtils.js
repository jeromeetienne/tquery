// This THREEx helper provide various basic functions for ```THREE.Geometry```.
// It is able to scale, translate, center a geometry. Other functions may be
// added soon.
// The API is chained for convenience.
//
// ## Scale 
// To make the geometry twice larger in ```y```

// ```
//   var scale = new THREE.Vector3(1,2,1);
//   THREEx.GeometryUtils.scale(geometry, scale);
// ```

// ## Translate
// To make the geometry move 100 further in ```x```

// ```
//   var translation = new THREE.Vector3(100,0,0);
//   THREEx.GeometryUtils.translate(geometry, translation);
// ```

// ## Center
// To center the geometry on its middle point

// ```
//   THREEx.GeometryUtils.center(geometry);
// ```

// ## middlePoint
// To compute the middle point of a geometry

// ```
//   THREEx.GeometryUtils.middlePoint(geometry);
// ```

// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};
THREEx.GeometryUtils	= THREEx.GeometryUtils	|| {};

// TODO
// - chained API
// - possibility a matrix to reduce computation ?

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Change the scale of a geometry
 * 
 * @params {THREE.Geometry} geometry the geometry to compute on
 * @params {THREE.Vector3} scale the middlepoint of the geometry
*/
THREEx.GeometryUtils.scale	= function(geometry, scale)
{
	// change all geometry.vertices
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.multiplySelf(scale); 
	}
	
	// mark the vertices as dirty
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
}

THREEx.GeometryUtils.size	= function(geometry)
{
	// compute bounding box - TODO is that needed ?
	geometry.computeBoundingBox();
	// compute middle
	var size= new THREE.Vector3()
	size.x	= geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	size.y	= geometry.boundingBox.max.y - geometry.boundingBox.min.y;
	size.z	= geometry.boundingBox.max.z - geometry.boundingBox.min.z;

	// return the just computed middle
	return size;	
}

THREEx.GeometryUtils.normalize	= function(geometry)
{
	var size	= THREEx.GeometryUtils.size(geometry);
	var scale;
	if( size.x >= size.y && size.x >= size.z ){
		scale	= 1/size.x;
	}else if( size.y >= size.x && size.y >= size.z ){
		scale	= 1/size.y;
	}else{
		scale	= 1/size.z;
	}
	return THREEx.GeometryUtils.scale(geometry, new THREE.Vector3(scale, scale, scale));
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Compute the "middlePoint" aka the point at the middle of the boundingBox
 * 
 * @params {THREE.Geometry} the geometry to compute on
 * @returns {THREE.Vector3} the middlepoint of the geometry
*/
THREEx.GeometryUtils.middlePoint	= function(geometry)
{
	// compute bounding box
	geometry.computeBoundingBox();

	// compute middle
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.max.x + geometry.boundingBox.min.x ) / 2;
	middle.y	= ( geometry.boundingBox.max.y + geometry.boundingBox.min.y ) / 2;
	middle.z	= ( geometry.boundingBox.max.z + geometry.boundingBox.min.z ) / 2;

	// return the just computed middle
	return middle;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


THREEx.GeometryUtils.translate	= function(geometry, delta)
{
	// change all geometry.vertices
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.addSelf(delta); 
	}

	// mark the vertices as dirty
	geometry.__dirtyVertices = true;
	// return this, to get chained API	
	return this;
}

THREEx.GeometryUtils.rotate	= function(geometry, angles, order)
{
	order	= order	|| 'XYZ';

	// compute bounding box - TODO is that needed ?
	geometry.computeBoundingBox();
	
	var matrix	= new THREE.Matrix4();
	matrix.setRotationFromEuler(angles, order);
	geometry.applyMatrix( matrix );

	// mark the vertices as dirty
	geometry.__dirtyVertices = true;
	// return this, to get chained API	
	return this;
}

/**
 * Center the geometry on its middlepoint
*/
THREEx.GeometryUtils.center	= function(geometry, noX, noY, noZ)
{
	// compute delta
	var delta	= this.middlePoint(geometry).negate();
	if( noX )	delta.x	= 0;
	if( noY )	delta.y	= 0;
	if( noZ )	delta.z	= 0;

	return this.translate(geometry, delta)
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


/**
 * Initial version of attachement
 * - geometry2 is the one which is moved
 * - TODO make something more flexible... especially on the attachement config
*/
THREEx.GeometryUtils.attachRightLeft	= function(geometry1, geometry2, delta)
{
	if( delta === undefined )	delta	= 0;
	// compute bounding box
	geometry1.computeBoundingBox();
	geometry2.computeBoundingBox();
	
	var maxX1	= geometry1.boundingBox.x[ 1 ]
	var minX2	= geometry2.boundingBox.x[ 0 ];

	var vector	= new THREE.Vector3();
	vector.x	= maxX1+ (-minX2) + delta;

	this.translate(geometry2, vector);
	
	return this;
}
