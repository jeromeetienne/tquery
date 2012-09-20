var world	= tQuery.createWorld().boilerplate().start();
// remove the cameraControls
world.removeCameraControls();

// define lights
tQuery.createAmbientLight().addTo(world).color(new THREE.Color(0x888888));
tQuery.createDirectionalLight().position(-1,1,1).addTo(world)
	.color(new THREE.Color().setRGB(1, 0.5, 1))
	.intensity(4);
tQuery.createDirectionalLight().position(1,1,1).addTo(world)
	.color(new THREE.Color().setRGB(1, 0.3, 0.7))
	.intensity(3);
tQuery.createDirectionalLight().position(0,-1,0).addTo(world)
	.color(new THREE.Color().setRGB(0.8, 0.4, 0.4))
	.intensity(4);


var waterTexture	= THREE.ImageUtils.loadTexture( "images/water.jpg" );
//var waterTexture	= THREE.ImageUtils.loadTexture( "ash_uvgrid01.jpg" );

for(var i = 0; i < 10; i++ ){
	tQuery.createEnemy({
		id	: "enemy"+i
	});	
}

var material	= new THREE.MeshLambertMaterial({
	ambient		: 0x444444,
	color		: 0xFFAA88,
	specular	: 0xCC88ff,
	shininess	: 400,
	side		: THREE.BackSide,
	map		: THREE.ImageUtils.loadTexture( "images/water.jpg" )
});
//material	= new THREE.MeshNormalMaterial();


// create the player object
var object	= tQuery.createSphere(0.5, 32, 16, new THREE.MeshLambertMaterial({
	ambient	: 0x444444,
	color	: 0x44FF44,
	map	: waterTexture,
}));

object.id('player').addTo(world)
	.geometry()
		.rotateZ(Math.PI/2)
		.zoom(0.2)
		.back()

var tunnelH	= 11;
//tunnelH	= 3;


var tunnel	= tQuery.createCylinder(0.5, 0.5, tunnelH, 32, 20, true, material)
	.addTo(world)
	.geometry()
		.rotateX(1*Math.PI/2)
		.zoomZ(2)
		.translateZ(tunnelH/2)
	.back();

tunnel.material().textureScrolling({
	transform	: function(tTexture){
		tTexture.offset.y	= -playerZ / 10;
	}
});
// TODO this would be better to flip the geometry. put it in tquery.geometry.toolbox.js
//tunnel.get(0).flipSided	= true;

var playerZ		= 0;
var playerAz		= 0;
var playerTitleAngle	= 0;

world.loop().hook(function(deltaTime, time){
	// handle normal player speed
	playerZ	+= deltaTime * 5;

	// handle variation of speed
	if( tQuery.keyboard().pressed('up') )	playerZ	+= 3.5 * deltaTime;
	if( tQuery.keyboard().pressed('down'))	playerZ	-= 1.3 * deltaTime;


	if( tQuery.keyboard().pressed('left') )	playerAz += -3*Math.PI/180;
	if( tQuery.keyboard().pressed('right'))	playerAz += +3*Math.PI/180;

	// the ball rotate
	var tMesh	= tQuery('#player').get(0);
	tMesh.rotation.z = playerAz;
	tMesh.rotation.x = -2 * playerZ % (Math.PI*2);

	// handle the title
	playerTitleAngle	= 0;
	if( tQuery.keyboard().pressed('left') )	playerTitleAngle	= +Math.PI/6;
	if( tQuery.keyboard().pressed('right'))	playerTitleAngle	= -Math.PI/6;	
	var diff	= tMesh.rotation.z - playerTitleAngle;
	//tMesh.rotation.z -= diff * 0.2;
});



var vertexTransform	= function(o, v, time){
	var z		= (playerZ + v.z);
	var angle	= z * 0.8;
	var rangeX	= 0.15;
	var rangeY	= 0.1;
	
	//rangeX	= rangeY	= 0;
	
	v.x	= o.x + Math.cos(angle*0.5)*rangeX;
	v.y	= o.y + Math.sin(angle*0.5)*rangeY;
};

true && tunnel.geometry().vertexAnimation({
	transform	: vertexTransform
});

// move the camera 
true && world.loop().hook(function(deltaTime, time){
	var radius	= 0.2;
	var origin	= {
		x	: Math.cos(playerAz)*radius,
		y	: Math.sin(playerAz)*radius,
		z	: 0
	};
	vertexTransform(origin, world.tCamera().position, time)
	
	world.tCamera().position.z	= tunnelH;
	world.tCamera().rotation.z	= playerAz+Math.PI/2;
});

// move the player 
true && world.loop().hook(function(deltaTime, time){
	var radius	= 0.4;
	var origin	= {
		x	: Math.cos(playerAz)*radius,
		y	: Math.sin(playerAz)*radius,
		z	: 3.5
	};
	var object	= tQuery('#player');
	if( object.length === 0 )	return;
	vertexTransform(origin, object.get(0).position, time)
	object.get(0).position.z	= tunnelH-2.5;
});

// TODO make all this happen at the geometry level

// set clearColor
world.tRenderer().setClearColorHex( 0x000000, 1 );

// add a fog
world.addFogExp2({ density : 0.15 });
