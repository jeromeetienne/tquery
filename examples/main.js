require([
	"../js/tquery.core.js",

	"../js/tquery.object3d.js",
	"../js/tquery.geometry.js",
	"../js/tquery.material.js",

	"../js/tquery.scene.js",
	"../js/tquery.loop.js",
	"../js/tquery.core.create.js",
	"../js/plugins/tquery.geometry.toolbox.js",
	"../js/plugins/tquery.object3d.geometry.js",
], function() {
	//new tQuery.Loop().start()
	// What about this syntax ? which is tquery.create.js plugins
	// - out of the core
	var container	= document.getElementById('container');
	var scene	= tQuery.scene().appendTo(container);

	var loop	= tQuery.loop(scene).start();

	tQuery.cube().addTo(scene)
		.geometry().scale(2).back()
		.addClass("myClass1").addClass("myClass2").id('cubeId');
	tQuery.torus().addTo(scene)
		.geometry().scale(2).back()
		.translate(2,0,0)
		.addClass("myClass1").id('torusId');


	//tQuery(scene.camera()).dragPanControls(loop);
	//tQuery.ui.stats(loop);

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
