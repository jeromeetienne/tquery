// minimal
var domElement	= document.getElementById('container');
var scene	= tQuery.scene().camera(0,2,6).container(domElement);
var loop	= tQuery.loop().scene(scene);
tQuery.cube().appendTo(scene);
tQuery.dragPanControls(scene).bind(loop);

tQuery.dragPanControls(scene)
.get()		// return base
.unbind(loop)
.bind(loop)
.destroy();

cameraControls	= new THREEx.DragPanControls(camera)
loop.register(42, function(){
	cameraControls.update();
});

// hmm a scene has to be rendered, and to be rendered a camera is needed
// they seem unseparable.. if so may be stored in the same struct
// - not too clean
// - may be cool for now
// - screenCamera
var scene	= tQuery.scene()
			.antialias(true/false)
			.clearColor(color)
			.shadowMap(shadowMapEnabled, shadowMapSoft)
			.camera(0,2,6);

// loop is very external - mostly js - not much three.js
tQuery.loop()
	.register(priority, callback)
	.renderer(value)
	.scene(value)
	.camera(value)
	.start();
// api for stats.js
tQuery.stats().bind(loop);
// use requires.js - thus no include to forget



// TODO remove the THREEx dependancy for the geometry ?
// it make it uselessly complex for now



// TODO not sure i need a Builder
// - what about a tQuery.Object3D() and up to you not to mess it up after init
// - seems cleaner, may
// - tqObj.geometry(new THREE.CubeGeometry()) == tQuery.cube(w, h, d).id("shoot")

var sphere	= tQuery.sphere().id("shoot").appendTo(scene);
var cube	= tQuery.cube().id("shoot").appendTo(scene);

cube.geometry().scale(1,2,3);

//tQuery(mesh).geometry().scale(2);
// tQuery(mesh).scale(2);	// all the same function as tQuery(mesh).scale(2)
//
//// tQuery.cube(w,h,d)	= return tQuery.builder().geometry(new THREE.CubeGeometry(w,h,d)).normal();
//
//tQuery.builder().geometry(geometry).material(material).build();
//
//tQuery.Builder.prototype.normal	= function(){
//	this.material(new THREE.NormalMaterial());
//}
//
//tQuery.Builder.prototype.ambient	= function(value){
//	// value is THREE.Color
//	this.material(new THREE.NormalMaterial());
//}
//
//tQuery.Builder.prototype.color
//tQuery.Builder.prototype.ambient
//tQuery.Builder.prototype.shininess
//tQuery.Builder.prototype.specular
//tQuery.Builder.prototype.shading
//tQuery.Builder.prototype.map
//
//tQuery.Builder.prototype.done	= function(){
//	return this._mesh;
//}

// tQuery.Cube(x,h,w).normal();
// tQuery.Cube(x,h,w).material(material).build();
// tQuery.Plane(x,h,w).mesh();
// all recorded in a stack, build on 
