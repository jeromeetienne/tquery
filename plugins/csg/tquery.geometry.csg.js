tQuery.Geometry.registerInstance('csg', function(operation, geometry){
	// sanity check - check parameters
	var operations	= ['subtract', 'union', 'intersect'];
	console.assert( operations.indexOf(operation) !== -1 );

	console.assert( geometry instanceof tQuery.Geometry );
	console.assert( geometry.length <= 1 );
	
	// to store the resulting geometries
	var geometries	= [];

	// convert geometry from three.js to csg.js
	var geometry2	= geometry.get(0);
	var cGeometry2	= THREE.CSG.toCSG(geometry2);

	// loop over each item
	this.each(function(tGeometry){
		// convert geometry from three.js to csg.js
		var cGeometry1	= THREE.CSG.toCSG(tGeometry);
		// perform operation
		var resultCsg	= cGeometry1[operation](cGeometry2);
		// convert result from csg.js to three.js
		var resultGeo	= THREE.CSG.fromCSG( resultCsg );
		// queue the result
		geometries.push(resultGeo);
	});

	return new tQuery.Geometry(geometries).back(this);
});