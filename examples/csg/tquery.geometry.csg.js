tQuery.Geometry.register('csg', function(operation, tqGeometry){
	// sanity check - check parameters
	var operations	= ['subtract', 'union', 'intersect'];
	console.assert( operations.indexOf(operation) !== -1 );
	console.assert( tqGeometry instanceof tQuery.Geometry );
	console.assert( tqGeometry.length <= 1 );
	
	//tQuery.Geometry.toTHREEGeometry(tqGeometry);

	// to store the resulting geometries
	var geometries	= [];

	// convert geometry from three.js to csg.js
	var geometry2	= tqGeometry.get(0);
	var objectCsg2	= THREE.CSG.toCSG(geometry2);

	// loop over each item
	this.each(function(geometry1){
		// convert geometry from three.js to csg.js
		var objectCsg1	= THREE.CSG.toCSG(geometry1);
		// perform operation
		var resultCsg	= objectCsg1[operation](objectCsg2);
		// convert result from csg.js to three.js
		var resultGeo	= THREE.CSG.fromCSG( resultCsg );
		// queue the result
		geometries.push(resultGeo);
	});

	return new tQuery.Geometry(geometries).back(this);
});
