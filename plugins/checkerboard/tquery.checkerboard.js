/**
 * Create a checkerboard tQuery.Mesh
*/
tQuery.registerStatic('createCheckerboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		width		: 1,		
		height		: 1,
		segmentsW	: 8,
		segmentsH	: 8,
		materialEven	: new THREE.MeshBasicMaterial({ color: 0xcccccc }),
		materialOdd	: new THREE.MeshBasicMaterial({ color: 0x444444 })
	});
	// handle polymorphism
	if( opts.materialEven instanceof tQuery.Material )	opts.materialEven= opts.materialEven.get(0)
	if( opts.materialOdd  instanceof tQuery.Material )	opts.materialOdd = opts.materialOdd.get(0)
	// create the geometry	
	var geometry		= new THREE.PlaneGeometry( opts.width, opts.height, opts.segmentsW, opts.segmentsH );
	// set materials per faces
	geometry.faces.forEach(function(face, idx){
		var y	= Math.floor(idx / opts.segmentsW);
		var x	= idx - (y*opts.segmentsW);
		face.materialIndex	= (y % 2 + x%2 ) %2;
	});
	// create the mesh
	var material	= new THREE.MeshFaceMaterial([opts.materialEven, opts.materialOdd]);
	var mesh	= new THREE.Mesh(geometry, material);
	mesh.rotation.x	= -Math.PI/2;
	// return the tQuery
	return tQuery(mesh);
});