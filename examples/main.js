require([
	"../js/tquery.core.js",
	"../js/tquery.node.js",
	
	"../js/tquery.object3d.js",
	"../js/tquery.geometry.js",
	"../js/tquery.material.js",

	"../js/tquery.scene.js",
	"../js/tquery.loop.js",
	"../js/tquery.core.create.js",
	"../js/plugins/tquery.geometry.toolbox.js",
	"../js/plugins/tquery.object3d.geometry.js",
	"../js/plugins/tquery.stats.js",
	"../js/plugins/tquery.dragPanControls.js"

], function() {
	var container	= document.getElementById('container');
	var scene	= tQuery.createScene().appendTo(container);

	tQuery.createCube().addTo(scene)
		//.geometry().zoom(2).back()
		.addClass("myClass1").addClass("myClass2").id('cubeId');
	tQuery.createTorus().addTo(scene)
		//.geometry().zoom(2).back()
		.translate(2,0,0)
		.addClass("myClass1").id('torusId');

	var loop	= tQuery.createLoop(scene).start();

	//tQuery.ui.stats(loop) ??
	//tQuery.controls.createDragPan();
	
	tQuery.createStats();
	tQuery.createDragPanControls();
	
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
