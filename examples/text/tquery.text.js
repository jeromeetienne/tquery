/**
 * Create tQuery.Scene
*/
define(["/examples/text/fonts/gentilis_bold.typeface.js",
	"/examples/text/fonts/gentilis_regular.typeface.js",
	"/examples/text/fonts/optimer_bold.typeface.js",
	"/examples/text/fonts/optimer_regular.typeface.js",
	"/examples/text/fonts/helvetiker_bold.typeface.js",
	"/examples/text/fonts/helvetiker_regular.typeface.js",
	"/examples/text/fonts/droid/droid_sans_regular.typeface.js",
	"/examples/text/fonts/droid/droid_sans_bold.typeface.js",
	"/examples/text/fonts/droid/droid_serif_regular.typeface.js",
	"/examples/text/fonts/droid/droid_serif_bold.typeface.js"
	], function(){
	tQuery.register('createText', function(text, options){
		// handle parameters
		options	= tQuery.extend(options, {
			size		: 1,
			height		: 0.4,
			curveSegments	: 4,
	
			weight		: "bold",
			font		: "droid serif"
		});
		// create the geometry
		var geometry	= new THREE.TextGeometry(text, options);
	
		// center the geometry
		// - THREE.TextGeometry isnt centered for unknown reasons. all other geometries are centered
		geometry.computeBoundingBox();
		var center	= new THREE.Vector3();
		center.x	= ( geometry.boundingBox.max.x - geometry.boundingBox.min.x ) / 2;
		center.y	= ( geometry.boundingBox.max.y - geometry.boundingBox.min.y ) / 2;
		center.z	= ( geometry.boundingBox.max.z - geometry.boundingBox.min.z ) / 2;
		geometry.vertices.forEach(function(vertex){
			vertex.position.subSelf(center);
		});
		
		// create a mesh with it
		var material	= new THREE.MeshNormalMaterial();
		var mesh	= new THREE.Mesh( geometry, material );
		// return a tQuery object
		return tQuery(mesh);
	});
});