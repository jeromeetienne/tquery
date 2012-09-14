tQuery.registerStatic('createBufferGeometry', function(geometry){
	// parameter polymorphism
	if( geometry instanceof THREE.Geometry ){
		var tGeometry	= geometry;
	}else if( geometry instanceof tQuery.Geometry ){
		var tGeometry	= geometry.get(0);
	}else	console.assert('bogus paramters');

	console.log('tGeometry', tGeometry)
	
	geometry	= THREE.GeometryUtils.clone(geometry);
	geometry	= THREE.GeometryUtils.triangulateQuads(geometry);
	
	// sanity check
	console.assert(tGeometry instanceof THREE.Geometry );

	// build vertex position array - compatible to THREE.BufferGeometry
	var numItems	= tGeometry.vertices.length;
	var vPosArray	= new Float32Array(numItems * 3);
	tGeometry.vertices.forEach(function(tVertex, index){
		vPosArray[index*3+0]	= tVertex.x;
		vPosArray[index*3+1]	= tVertex.y;
		vPosArray[index*3+2]	= tVertex.z;
	});

	// compute the number of triangles - THREE.BufferGeometry support only triangles
	var numTriangles= tGeometry.faces.length;

	// build face indices array - compatible to THREE.BufferGeometry	
	var fIdxArray	= new Int16Array(numTriangles * 3);
	var i		= 0;
	tGeometry.faces.forEach(function(tFace, index){
		console.assert( tFace instanceof THREE.Face3 );
		fIdxArray[i+0]	= tFace.a;
		fIdxArray[i+1]	= tFace.b;	
		fIdxArray[i+2]	= tFace.c;
		i	+= 3;
	});

	// build face UVs array  - compatible to THREE.BufferGeometry
	var fUvsArray	= new Float32Array(numTriangles * 3 * 2);
	var i		= 0;
	tGeometry.faceVertexUvs[0].forEach(function(faceUvs, index){
		var tFace	= tGeometry.faces[index];
		console.assert( faceUvs.length === 3 );
		// for face.a you got faceUvs[0].u/faceUvs[0].v
		console.assert(tFace.a < vPosArray.length);
		console.assert(tFace.b < vPosArray.length);
		console.assert(tFace.c < vPosArray.length);

		fUvsArray[tFace.a*2+0]	= faceUvs[0].u;	fUvsArray[tFace.a*2+1]	= faceUvs[0].v
		fUvsArray[tFace.b*2+0]	= faceUvs[1].u;	fUvsArray[tFace.b*2+1]	= faceUvs[1].v
		fUvsArray[tFace.c*2+0]	= faceUvs[2].u;	fUvsArray[tFace.c*2+1]	= faceUvs[2].v
	});

	// console.log('vPosArray', vPosArray)
	// console.log('fIdxArray', fIdxArray)
	// console.log('fUvsArray', fUvsArray)

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
			array	: fUvsArray,
			numItems: fUvsArray.length
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
