/**
 * tQuery.createText('foobar')
*/
tQuery.registerStatic('createText', function(text, options){
	// handle parameters
	options	= tQuery.extend(options, {
		font		: "droid serif",
		weight		: "bold",
		size		: 1,
		height		: 0.4,
	});
	// create the tGeometry
	var tGeometry	= new THREE.TextGeometry(text, options);

	// center the tGeometry
	// - THREE.TextGeometry isnt centered for unknown reasons. all other geometries are centered
	tGeometry.computeBoundingBox();
	var center	= new THREE.Vector3();
	center.x	= ( tGeometry.boundingBox.max.x - tGeometry.boundingBox.min.x ) / 2;
	center.y	= ( tGeometry.boundingBox.max.y - tGeometry.boundingBox.min.y ) / 2;
	center.z	= ( tGeometry.boundingBox.max.z - tGeometry.boundingBox.min.z ) / 2;
	tGeometry.vertices.forEach(function(vertex){
		vertex.subSelf(center);
	});
	
	// create a mesh with it
	var tMaterial	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( tGeometry, tMaterial );
	// return a tQuery object
	return tQuery(mesh);
});