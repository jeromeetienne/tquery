tQuery.register('createBufferGeometryDisjoint', function(geometry){
	// parameter polymorphism
	if( geometry instanceof THREE.Geometry ){
		var tGeometry	= geometry;
	}else if( geometry instanceof tQuery.Geometry ){
		var tGeometry	= geometry.get(0);
	}else	console.assert('bogus paramters');

	console.log('tGeometry', tGeometry)

console.time('triangulateQuads')
	// make the geometry with only THREE.Face3
	tGeometry	= THREE.GeometryUtils.clone(tGeometry);
	THREE.GeometryUtils.triangulateQuads(tGeometry);
console.timeEnd('triangulateQuads')	
	
	console.log('post triangulation geometry vertices', tGeometry.vertices.length)
	console.log('post triangulation geometry vertices', tGeometry.faces.length)

	// sanity check
	console.assert(tGeometry instanceof THREE.Geometry);
	
	var nFace3	= tGeometry.faces.length;

console.time('allocate TypedArray')
	var vPosArray	= new Float32Array(nFace3 * 3 /* vertices */ * 3 /* xyz */);
	var fIdxArray	= new Int16Array  (nFace3 * 3 /* vertices */);
	var fIdxArrayL	= new Int32Array  (nFace3 * 3 /* vertices */);
	var vUvsArray	= new Float32Array(nFace3 * 3 /* vertices */ * 2 /* xy */);
console.timeEnd('allocate TypedArray')

console.time('Filling TypedArray')
	tGeometry.faces.forEach(function(tFace, faceIdx){
		console.assert( tFace instanceof THREE.Face3 );

		// set vPosArray
		['a', 'b', 'c'].forEach(function(vertexProp, vertexOffset){
			var tVertex	= tGeometry.vertices[tFace[vertexProp]];
			var i		= faceIdx * 3 /* vertices */ * 3 /* xyz */
					+ vertexOffset * 3 /* xyz */;
			vPosArray[i+0]	= tVertex.x;
			vPosArray[i+1]	= tVertex.y;
			vPosArray[i+2]	= tVertex.z;
		});

		// set vIdxArray
		var i		= faceIdx * 3 /* vertices */;
		var vIdxOff	= faceIdx * 3 /* vertices */;
		fIdxArray[i+0]	= fIdxArrayL[i+0]	= vIdxOff + 0;
		fIdxArray[i+1]	= fIdxArrayL[i+1]	= vIdxOff + 1;
		fIdxArray[i+2]	= fIdxArrayL[i+2]	= vIdxOff + 2;

		// set vUvsArray
		var i		= faceIdx * 3 /* vertices */ * 2 /* xy */;
		var faceUvs	= tGeometry.faceVertexUvs[0][faceIdx];
		vUvsArray[i+0]	= faceUvs[0].u;
		vUvsArray[i+1]	= faceUvs[0].v;
		vUvsArray[i+2]	= faceUvs[1].u;
		vUvsArray[i+3]	= faceUvs[1].v;
		vUvsArray[i+4]	= faceUvs[2].u;
		vUvsArray[i+5]	= faceUvs[2].v;
	});
console.timeEnd('Filling TypedArray')

	var bgGeometry		= new THREE.BufferGeometry();
	bgGeometry.attributes	= {
		position	: {
			itemSize: 3,
			array	: vPosArray,
			numItems: vPosArray.length
		},
		index		: {
			itemSize: 1,
			array	: fIdxArray,
			numItems: fIdxArray.length
		},
		uv	: {
			itemSize: 2,
			array	: vUvsArray,
			numItems: vUvsArray.length
		}
	};

console.time('Generating Offsets')
if( false ){
	bgGeometry.offsets	= [{
		start	: 0,
		count	: fIdxArray.length,
		index	: 0
	}];
}else{
	// comes from THREE.CTMLoader.js
	// - https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/ctm/CTMLoader.js
	var scope	= bgGeometry;
	// compute offsets
	scope.offsets	= [];
	var indices	= fIdxArrayL;

	var start	= 0;
	var min		= Number.MAX_VALUE;
	var max		= 0;
	var minPrev	= min;
	for ( var i = 0; i < indices.length; ) {
		for ( var j = 0; j < 3; ++ j ) {
			var idx = indices[ i ++ ];
			if ( idx < min ) min = idx;
			if ( idx > max ) max = idx;
		}
		if( max - min > 65535 ){
		//if( max - min > 655000 ){
console.log('new offset at', i, max - min, max, min)
		//if( max - min > 65535 ){
			i -= 3;
			for ( var k = start; k < i; ++ k ) {
				indices[ k ] -= minPrev;
			}
			scope.offsets.push( { start: start, count: i - start, index: minPrev } );
			start = i;
			min = Number.MAX_VALUE;
			max = 0;
		}
		minPrev = min;
	}
	for ( var k = start; k < i; ++ k ) {
		indices[ k ] -= minPrev;
	}
	scope.offsets.push( { start: start, count: i - start, index: minPrev } );
}
console.timeEnd('Generating Offsets')

console.time('Computing Meta')
	bgGeometry.computeBoundingBox();
	bgGeometry.computeBoundingSphere();
	bgGeometry.computeVertexNormals();
//	bgGeometry.computeTangents();
console.timeEnd('Computing Meta')

	return bgGeometry;
})
