tQuery.registerStatic('createBufferGeometryDisjoint', function(geometry){
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
	// NOTE: official version is buggy on THREE.Face3 tGeometry.faceVertexUvs
	//THREE.GeometryUtils.triangulateQuads(tGeometry);
	triangulateQuads(tGeometry); 	// debugged
					// see https://github.com/mrdoob/three.js/issues/2381
console.timeEnd('triangulateQuads')	

	console.log('post triangulation geometry. vertices:', tGeometry.vertices.length, '. faces', tGeometry.faces.length)

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
	// comes from THREE.CTMLoader.js
	// - https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/ctm/CTMLoader.js
	// compute offsets
	bgGeometry.offsets	= [];
	//var indices	= fIdxArrayL;

	var start	= 0;
	var min		= Number.MAX_VALUE;
	var max		= 0;
	var minPrev	= min;
	for( var i = 0; i < fIdxArray.length; ){
		for( var j = 0; j < 3; ++ j ){
			var idx = fIdxArrayL[ i ++ ];
			if( idx < min ) min = idx;
			if( idx > max ) max = idx;
		}
		if( max - min > 65535 ){
			i -= 3;
			for ( var k = start; k < i; ++ k ) {
				fIdxArrayL[ k ] -= minPrev;
				fIdxArray[k] -= minPrev;
			}
			bgGeometry.offsets.push( { start: start, count: i - start, index: minPrev } );
			start = i;
			min = Number.MAX_VALUE;
			max = 0;
		}
		minPrev = min;
	}
	for ( var k = start; k < i; ++ k ) {
		fIdxArrayL[ k ] -= minPrev;
		fIdxArray[k] -= minPrev;
	}
	bgGeometry.offsets.push( { start: start, count: i - start, index: minPrev } );
console.timeEnd('Generating Offsets')

console.time('Computing Meta')
	bgGeometry.computeBoundingBox();
	bgGeometry.computeBoundingSphere();
	bgGeometry.computeVertexNormals();
	//bgGeometry.computeTangents();
console.timeEnd('Computing Meta')

	return bgGeometry;
})








/**
 * debugged version of triangulateQuads()
 * see https://github.com/mrdoob/three.js/issues/2381
*/
function triangulateQuads( geometry ) {

	var i, il, j, jl;

	var faces = [];
	var faceUvs = [];
	var faceVertexUvs = [];

	for ( i = 0, il = geometry.faceUvs.length; i < il; i ++ ) {

		faceUvs[ i ] = [];

	}

	for ( i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {

		faceVertexUvs[ i ] = [];

	}

	for ( i = 0, il = geometry.faces.length; i < il; i ++ ) {

		var face = geometry.faces[ i ];

		if ( face instanceof THREE.Face4 ) {

			var a = face.a;
			var b = face.b;
			var c = face.c;
			var d = face.d;

			var triA = new THREE.Face3();
			var triB = new THREE.Face3();

			triA.color.copy( face.color );
			triB.color.copy( face.color );

			triA.materialIndex = face.materialIndex;
			triB.materialIndex = face.materialIndex;

			triA.a = a;
			triA.b = b;
			triA.c = d;

			triB.a = b;
			triB.b = c;
			triB.c = d;

			if ( face.vertexColors.length === 4 ) {

				triA.vertexColors[ 0 ] = face.vertexColors[ 0 ].clone();
				triA.vertexColors[ 1 ] = face.vertexColors[ 1 ].clone();
				triA.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();

				triB.vertexColors[ 0 ] = face.vertexColors[ 1 ].clone();
				triB.vertexColors[ 1 ] = face.vertexColors[ 2 ].clone();
				triB.vertexColors[ 2 ] = face.vertexColors[ 3 ].clone();

			}

			faces.push( triA, triB );

			for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {

				if ( geometry.faceVertexUvs[ j ].length ) {

					var uvs = geometry.faceVertexUvs[ j ][ i ];

					var uvA = uvs[ 0 ];
					var uvB = uvs[ 1 ];
					var uvC = uvs[ 2 ];
					var uvD = uvs[ 3 ];

					var uvsTriA = [ uvA.clone(), uvB.clone(), uvD.clone() ];
					var uvsTriB = [ uvB.clone(), uvC.clone(), uvD.clone() ];

					faceVertexUvs[ j ].push( uvsTriA, uvsTriB );

				}

			}

			for ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {

				if ( geometry.faceUvs[ j ].length ) {

					var faceUv = geometry.faceUvs[ j ][ i ];

					faceUvs[ j ].push( faceUv, faceUv );

				}

			}

		} else {
//console.log('triangulation Face3', faceVertexUvs, geometry.faceVertexUvs)

			faces.push( face );

			for ( j = 0, jl = geometry.faceUvs.length; j < jl; j ++ ) {

				faceUvs[ j ].push( geometry.faceUvs[ j ] );

			}

			for ( j = 0, jl = geometry.faceVertexUvs.length; j < jl; j ++ ) {
//console.log('j', j, geometry.faceVertexUvs[j])
				// jme- it was faceVertexUvs[ j ].push( geometry.faceVertexUvs[j] );
				// see https://github.com/mrdoob/three.js/issues/2381
				faceVertexUvs[ j ].push( geometry.faceVertexUvs[j][i] );

			}
		}

	}

	geometry.faces = faces;
	geometry.faceUvs = faceUvs;
	geometry.faceVertexUvs = faceVertexUvs;

	geometry.computeCentroids();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	if ( geometry.hasTangents ) geometry.computeTangents();

};

