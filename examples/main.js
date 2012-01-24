var scene;

require([
	"../js/tquery.core.js",

	"../js/tquery.object3d.js",
	"../js/tquery.geometry.js",
	"../js/tquery.material.js",

	"../js/tquery.scene.js",
	"../js/tquery.loop.js",
	"../js/plugins/tquery.geometry.toolbox.js",
	"../js/plugins/tquery.create.js",
], function() {
	//new tQuery.Loop().start()
	// What about this syntax ? which is tquery.create.js plugins
	// - out of the core
	var container	= document.getElementById('container');
	scene		= tQuery.create.scene().appendTo(container);

	var loop	= tQuery.loop(scene).start();

	/* TODO code tQuery.Mesh();	
		var mesh	= new tQuery.Mesh().appendTo(scene);
		mesh.normal().torus().geometry().normalize();
		mesh.addClass("myClass1").addClass("myClass2");
	
		var mesh	= new tQuery.Mesh().appendTo(scene);
		mesh.normal().cube().geometry().normalize();
		mesh.addClass("myClass1").id("myId");
	*/

	// here you add your objects
	// - you will most likely replace this part by your own
	var geometry	= new THREE.TorusGeometry( 0.5-0.15, 0.15 );
	geometry.dynamic= true;	// TODO should have be done here ?
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	//mesh.name	= "superobj";
	scene.add( mesh );
	
	tQuery(mesh).addClass("myClass1").addClass("myClass2");

	var geometry	= new THREE.CubeGeometry( 1, 1, 1 );
	geometry.dynamic= true;	// TODO should have be done here ?
	var material	= new THREE.MeshNormalMaterial();
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.position.x	= 2;
	scene.add( mesh );

	tQuery(mesh).id("myId");
	tQuery(mesh).addClass("myClass1");


//geometry.center().normalize().scale(3).rotate(Math.PI/3, 0, 0).translate(-2,0,0);
//console.log("query", tQuery(mesh.geometry).scale(2));
//console.log("mesh tqgeometry", tQuery("superobj").geometry());
//tQuery("superobj").addClass("myClass1").addClass("myClass2");
//tQuery("superobj").addClass("myClass1").addClass("myClass3");
//console.log("mesh", mesh)


	// create a camera contol
	var cameraControls	= new THREEx.DragPanControls(scene.camera())
	loop.hookPreRender(function(){
		cameraControls.update();
	});
	
	// add Stats.js - https://github.com/mrdoob/stats.js
	var stats	= new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.bottom	= '0px';
	document.body.appendChild( stats.domElement );
	loop.hookPostRender(function(){
		stats.update();
	});
	
	// transparently support window resize
	THREEx.WindowResize.bind(scene.renderer(), scene.camera());
	// allow 'p' to make screenshot
	THREEx.Screenshot.bindKey(scene.renderer());
	// allow 'f' to go fullscreen where this feature is supported
	if( THREEx.FullScreen.available() ){
		THREEx.FullScreen.bindKey();		
		document.getElementById('inlineDoc').innerHTML	+= "- <i>f</i> for fullscreen";
	}
});
