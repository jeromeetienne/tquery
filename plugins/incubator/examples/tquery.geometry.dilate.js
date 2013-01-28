tQuery.Geometry.registerInstance('dilate', function(length){
	// handle parameter polymorphism
	console.assert(length !== undefined);
	// go thru all geometry
	this.each(function(tGeometry){
		// gather vertexNormals from tGeometry.faces
		var vertexNormals	= new Array(tGeometry.vertices.length);
		tGeometry.faces.forEach(function(tFace){
			if( tFace instanceof THREE.Face4 ){
				vertexNormals[tFace.a]	= tFace.vertexNormals[0];
				vertexNormals[tFace.b]	= tFace.vertexNormals[1];
				vertexNormals[tFace.c]	= tFace.vertexNormals[2];
				vertexNormals[tFace.d]	= tFace.vertexNormals[3];		
			}else if( tFace instanceof THREE.Face3 ){
				vertexNormals[tFace.a]	= tFace.vertexNormals[0];
				vertexNormals[tFace.b]	= tFace.vertexNormals[1];
				vertexNormals[tFace.c]	= tFace.vertexNormals[2];
			}else	console.assert(false);
		});
		// modify the vertices according to vertextNormal
		tGeometry.vertices.forEach(function(vertex, idx){
			var vertexNormal = vertexNormals[idx];
			vertex.x	+= vertexNormal.x * length;
			vertex.y	+= vertexNormal.y * length;
			vertex.z	+= vertexNormal.z * length;
		});		
	})
	return this;	// for chained API
});

tQuery.Geometry.registerInstance('erode', function(length){
	// handle parameter polymorphism
	console.assert(length !== undefined)
	// forward to .dilate()
	return this.dilate(-length);
});
