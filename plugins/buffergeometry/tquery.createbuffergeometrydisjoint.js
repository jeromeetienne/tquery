tQuery.register('createBufferGeometryDisjoint', function(geometry){
	// parameter polymorphism
	if( geometry instanceof THREE.Geometry ){
		var tGeometry	= geometry;
	}else if( geometry instanceof tQuery.Geometry ){
		var tGeometry	= geometry.get(0);
	}else	console.assert('bogus paramters');

	console.log('tGeometry', tGeometry)
	
	// make the geometry with only THREE.Face3
	geometry	= THREE.GeometryUtils.triangulateQuads(geometry);
	
	// sanity check
	console.assert(tGeometry instanceof THREE.Geometry);
	
	var nFace3	= tGeometry.faces.length;

	var vPosArray	= new Float32Array(nFace3 * 3 /* vertices */ * 3 /* xyz */);
	var fIdxArray	= new Int16Array  (nFace3 * 3 /* vertices */);
	var vUvsArray	= new Float32Array(nFace3 * 3 /* vertices */ * 2 /* xy */);

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
		var vIdxOff	= faceIdx * 3 /* vertices */ * 3 /* xyz */;
		fIdxArray[i+0]	= vIdxOff + 0;
		fIdxArray[i+1]	= vIdxOff + 1;
		fIdxArray[i+2]	= vIdxOff + 2;

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
	bgGeometry.offsets	= [{
		start	: 0,
		count	: fIdxArray.length,
		index	: 0
	}];

	bgGeometry.computeBoundingBox();
	bgGeometry.computeBoundingSphere();
	bgGeometry.computeVertexNormals();
	bgGeometry.computeTangents();
	return bgGeometry;
})
