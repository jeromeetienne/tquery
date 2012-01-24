require(['tquery.js'], function(tQuery){
	// create a 3D scene and append it to the dom
	var scene	= tQuery.scene().appendTo(document.body);
	// add a cube to the scene
	tQuery.cube().addTo(scene);
	// create and start the rendering loop
	tQuery.loop(scene).start();


//tQuery.loop(tQuery.scene().appendTo(document).add(tQuery.cube())).start();

});
