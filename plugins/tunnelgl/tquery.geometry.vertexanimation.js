tQuery.Geometry.register('vertexAnimation', function(options){
	// handle parameters
	options	= tQuery.extend(options, {
		transform	: function(o, v, time){
			var a	= time*2 + v.y * 10;
			v.x	= o.x + Math.cos(a)*0.1;
		}
	});	
	var transform	= options.transform;

	// init the animation
	this.each(function(tGeometry){
		var length	= tGeometry.vertices.length;
		// TODO put that in a .data()
		tGeometry._origVertices	= new Array(length)
		for(var i = 0; i < length; i++){
			var vertex	= new THREE.Vertex();
			vertex.position.copy(tGeometry.vertices[i].position.clone())
			tGeometry._origVertices[i]	= vertex;
		}
	});


	// do the actual animation
	tQuery.world.loop().hook(function(deltaTime, present){
		this.each(function(tGeometry){
			for(var i = 0; i < tGeometry.vertices.length; i++) {
				var origVector3	= tGeometry._origVertices[i].position;
				var vector3	= tGeometry.vertices[i].position;
				transform(origVector3, vector3, present);
			}
			// mark the vertices as dirty
			tGeometry.__dirtyVertices = true;
			tGeometry.computeBoundingBox();
			tGeometry.computeCentroids();
			tGeometry.computeFaceNormals();
			tGeometry.computeVertexNormals();
			tGeometry.computeTangents();
		});
	}.bind(this));
});
