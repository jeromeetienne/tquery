tQuery.register('createBufferGeometry', function(geometry){
	// parameter polymorphism
	if( geometry instanceof THREE.Geometry ){
		var tGeometry	= geometry;
	}else if( geometry instanceof tQuery.Geometry ){
		var tGeometry	= geometry.get(0);
	}else	console.assert('bogus paramters');

	console.log('tGeometry', tGeometry)
	
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
	var numTriangles= 0;
	tGeometry.faces.forEach(function(tFace, index){
		if( tFace instanceof THREE.Face3 )	numTriangles += 1;
		else if( tFace instanceof THREE.Face4 )	numTriangles += 2;
		else console.assert(false);
	});

	// build face indices array - compatible to THREE.BufferGeometry	
	var fIdxArray	= new Int16Array(numTriangles * 3);
	var i		= 0;
	tGeometry.faces.forEach(function(tFace, index){
		if( tFace instanceof THREE.Face3 ){
			fIdxArray[i+0]	= tFace.a;
			fIdxArray[i+1]	= tFace.b;	
			fIdxArray[i+2]	= tFace.c;
			i	+= 3;
		}else if( tFace instanceof THREE.Face4 ){
			fIdxArray[i+0]	= tFace.a;
			fIdxArray[i+1]	= tFace.b;	
			fIdxArray[i+2]	= tFace.c;
			i	+= 3;
			fIdxArray[i+0]	= tFace.b;
			fIdxArray[i+1]	= tFace.c;	
			fIdxArray[i+2]	= tFace.d;
			i	+= 3;
		}else console.assert(false);
	});

	// build face UVs array  - compatible to THREE.BufferGeometry
	var fUvsArray	= new Float32Array(numTriangles * 3 * 2);
	var i		= 0;
	tGeometry.faceVertexUvs[0].forEach(function(faceUvs, index){
		if( faceUvs.length === 3 ){
			fUvsArray[i+0]	= faceUvs[0].u;	fUvsArray[i+1]	= faceUvs[0].v;
			fUvsArray[i+2]	= faceUvs[1].u;	fUvsArray[i+3]	= faceUvs[1].v;
			fUvsArray[i+4]	= faceUvs[2].u;	fUvsArray[i+5]	= faceUvs[2].v;
			i	+= 6;
		}else if( faceUvs.length === 4 ){
			fUvsArray[i+0]	= faceUvs[0].u;	fUvsArray[i+1]	= faceUvs[0].v;
			fUvsArray[i+2]	= faceUvs[1].u;	fUvsArray[i+3]	= faceUvs[1].v;
			fUvsArray[i+4]	= faceUvs[2].u;	fUvsArray[i+5]	= faceUvs[2].v;
			i	+= 6;
			fUvsArray[i+0]	= faceUvs[1].u;	fUvsArray[i+1]	= faceUvs[1].v;
			fUvsArray[i+2]	= faceUvs[2].u;	fUvsArray[i+3]	= faceUvs[2].v;
			fUvsArray[i+4]	= faceUvs[3].u;	fUvsArray[i+5]	= faceUvs[3].v;
			i	+= 6;
		}else	console.assert(false);
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

	return bgGeometry;
})
