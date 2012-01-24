require(['tquery.js'], function(tQuery){
	// create a 3D scene and append it to the dom
	var scene	= tQuery.scene().appendTo(document);
	// create a rendering loop 
	var loop	= tQuery.loop().scene(scene);
	// add a cube to the scene
	tQuery.cube().addTo(scene);
	// start the rendering loop
	loop.start();
});