/**
 * Create a checkerboard tQuery.Mesh
*/
tQuery.register('createCheckerboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		width		: 1,		
		height		: 1,
		segmentsW	: 8,
		segmentsH	: 8,
		materialEven	: new THREE.MeshBasicMaterial({ color: 0xcccccc }),
		materialOdd	: new THREE.MeshBasicMaterial({ color: 0x444444 })
	});
	// create the geometry	
	var geometry		= new THREE.PlaneGeometry( opts.width, opts.height, opts.segmentsW, opts.segmentsH );
	// set materials per faces
	geometry.materials	= [opts.materialEven, opts.materialOdd];
	geometry.faces.forEach(function(face, idx){
		var y	= Math.floor(idx / opts.segmentsW);
		var x	= idx - (y*opts.segmentsW);
		face.materialIndex	= (y % 2 + x%2 ) %2;
	});
	// create the mesh
	var material	= new THREE.MeshFaceMaterial();
	var mesh	= new THREE.Mesh(geometry, material);
	// return the tQuery
	return tQuery(mesh);
});