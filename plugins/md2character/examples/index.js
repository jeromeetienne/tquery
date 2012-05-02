// init ```tQuery.World```, setup a boilerplate and start the rendering loop
var world	= tQuery.createWorld().boilerplate().start();

// Change renderer clear color.
world.renderer().setClearColorHex( 0x000000, world.renderer().getClearAlpha() );

// ## The Lights 

// Add a ambient light and 2 directional lights
tQuery.createAmbientLight().addTo(world).color(0x444444);
tQuery.createDirectionalLight().addTo(world).position(-1,1,1).color(0xFF88BB).intensity(3);
tQuery.createDirectionalLight().addTo(world).position( 1,1,-1).color(0x4444FF).intensity(2);

// add a fog. This is always a nice trick to hide the "end of the world"
world.addFogExp2({density : 0.1});

// # The Columns

// ### initialize a material

// We will apply it to all the columns. It is [lambert lighting](http://en.wikipedia.org/wiki/Lambertian_reflectance)
// the ```ambient``` is the color which gonna be combined with be combined with the ambient
// light we initialized on top. ```color``` will be combined with the
// directional lights. and ```map``` gives the texture to use.
var material	= new THREE.MeshLambertMaterial({
	ambient	: 0xFFFFFF,
	color	: 0xFFAAAA,
	map	: THREE.ImageUtils.loadTexture('../../assets/images/water.jpg')
});

// ### Build 15 Columns

// loop over each column
for(var i = 0; i < 15; i++ ){
	// Create the cylinder. We pass some parameters to the contructor to setup
	// the size we see fit, and we add the material we want to apply on the
	// cylinder. Then we use ```.addTo()``` to add our object to
	// our ```tQuery.World```.
	var column	= tQuery.createCylinder(0.2,0.2,2, material).addTo(world);
	// Change the position of the column. We translate the column to build
	// a kind of alley. Thus the character will be able to run inside it :)
	column.translateX(i%2 ? +1 : -1).translateY(1).translateZ(15/2 + -1*i);
}

// # The Ground

// We create a large checkerboard with ```tquery.checkerboard.js``` plugin.
// We scale the checkerboard to 100 per 100 units in the 3D world. Thus it is
// quite large and disappears into the fog. It gives the cheap impression of
// an infinite checkerboard.
tQuery.createCheckerboard({
	segmentsW	: 100,	// number of segment in width
	segmentsH	: 100	// number of segment in Height
}).addTo(world).scaleBy(100);

// # The Character 

// Create a character, attached it to the world and hook the keyboard
character	= new tQuery.RatamahattaMD2Character().attach(world).hookKeyboard();
// Bind the "loaded" event, just to display the name of each animations
character.bind("loaded", function(){
	console.log("list animmation", Object.keys(character._meshBody.geometry.animations))
});

// set the cameraControls	
world.setCameraControls(new tQuery.MD2Character.CameraControls(character));

// ## Change the Skin by Keyboard

// hook a function in the rendering loop. This function will be executed everytime
// the scene is rendered. Within this function, we will use ```tQuery.Keyboard```
// plugins to test the keyboard. if the key ```s``` is pressed, then use ```character.setSkin()```
// to change the skin of the character
world.loop().hook(function(){
	var keyboard	= tQuery.keyboard();	// get keyboard instance
	if( keyboard.pressed("s") ){		// if the key 's' is pressed, change the skin
		character.setSkin(Math.floor(Math.random()*5));
	}
});
