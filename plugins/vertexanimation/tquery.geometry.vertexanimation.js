tQuery.Geometry.registerInstance('vertexAnimation', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		transform	: function(originPosition, actualPosition, now){
			var angle	= now*2 + actualPosition.y * 10;
			actualPosition.x= originPosition.x + Math.cos(angle)*0.1;
		}
	});	

	// init the animation
	this.each(function(tGeometry){
		var length	= tGeometry.vertices.length;
		var origVertices= new Array(length)
		for(var i = 0; i < length; i++){
			var origin	= tGeometry.vertices[i].clone();
			origVertices[i]	= tGeometry.vertices[i].clone();
		}
		tGeometry._origVertices	= origVertices
	});

	// do the actual animation
	opts.world.hook(function(delta, now){
		this.each(function(tGeometry){
			for(var i = 0; i < tGeometry.vertices.length; i++) {
				var originPos	= tGeometry._origVertices[i];
				var actualPos	= tGeometry.vertices[i];
				opts.transform(originPos, actualPos, now);
			}
			// mark the vertices as dirty
			tGeometry.verticesNeedUpdate = true;
		});
	}.bind(this));
	// for chained API
	return this;
});
