// init ```tQuery.World```, setup a boilerplate and start the rendering loop
var world	= tQuery.createWorld().boilerplate().start();

// Change renderer clear color.
world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );

// ## Lights 
// Add a ambient light and 2 directional lights
tQuery.createAmbientLight().addTo(world).color(0x444444);
tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFF88BB).intensity(3);
tQuery.createDirectionalLight().addTo(world).position( 1,1,-1).color(0x4444FF).intensity(2);

// add a fog. This is always a nice trick to hide the "end of the world"
world.addFogExp2({density : 0.1});

// ### Columns
// initialize a material for all the columns
var material	= new THREE.MeshLambertMaterial({
	ambient	: 0xFFFFFF,
	color	: 0xFFAAAA,
	map	: THREE.ImageUtils.loadTexture('../../assets/images/water.jpg')
});
// build 15 columns
for(var i = 0; i < 15; i++ ){
	// Create the cylinder
	var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
	// Change the size of the default cylinder
	column.translateX(i%2 ? +1 : -1).translateY(1).translateZ(15/2 + -1*i);
}

// ### Add a ground
// add a checkboard, 1 tile per 1 units
tQuery.createCheckerboard({
	segmentsW	: 100,	// number of segment in width
	segmentsH	: 100	// number of segment in Height
}).addTo(world).scaleBy(100);

// ## Character
// Create a character, attached it to the world and hook the keyboard
character	= new tQuery.RatamahattaMD2Character().attach(world).hookKeyboard();
// Bind the "loaded" event, just to display the name of each animations
character.bind("loaded", function(){
	console.log("list animmation", Object.keys(character._meshBody.geometry.animations))
});

// set the cameraControls	
world.setCameraControls(new tQuery.MD2Character.CameraControls(character))

// ### Change the skin by keyboard
//
world.loop().hook(function(){
	// get keyboard instance
	var keyboard	= tQuery.keyboard();
	// if the key 's' is pressed, change the skin
	if( keyboard.pressed("s") )	character.setSkin(Math.floor(Math.random()*5));
})
