var stats, scene, renderer;
var camera, cameraControl;

require([
	"../js/tquery.core.js",
	"../js/tquery.object3d.js",
	"../js/tquery.geometry.js",
	"../js/tquery.material.js",
	"../js/plugins/tquery.geometry.toolbox.js"
], function() {
	if( !init() )	animate();
});

// init the scene
function init(){

	if( Detector.webgl ){
		renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		renderer.setClearColorHex( 0xBBBBBB, 1 );
	// uncomment if webgl is required
	//}else{
	//	Detector.addGetWebGLMessage();
	//	return true;
	}else{
		renderer	= new THREE.CanvasRenderer();
	}
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('container').appendChild(renderer.domElement);

	// create a scene
	scene = new THREE.Scene();

	// put a camera in the scene
	camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set(0, 0, 5);
	scene.add(camera);


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
}

// animation loop
function animate() {

	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	requestAnimationFrame( animate );

	// do the render
	render();

	// update stats
	stats.update();
}

// render the scene
function render() {

	// update camera controls
	//cameraControls.update();

	// actually render the scene
	renderer.render( scene, camera );
}