var world	= tQuery.createWorld().fullpage().start();

tQuery.createAmbientLight().addTo(world).color(new THREE.Color(0x888888));
var light	= tQuery.createDirectionalLight().position(-1,1,1).addTo(world)
light.get(0).color.setRGB(1,0.5,1);
light.get(0).intensity	= 2;

var light	= tQuery.createDirectionalLight().position(1,1,1).addTo(world)
light.get(0).color.setRGB(1,0.3,0.7);
light.get(0).intensity	= 2;

var light	= tQuery.createDirectionalLight().position(0,-1,0).addTo(world)
light.get(0).color.setRGB(1,1,1);
light.get(0).intensity	= 3;

var material	= new THREE.MeshLambertMaterial({
	ambient	: 0x444444,
	color	: 0xFFAA88,
	specular: 0xCC88ff,
	shininess: 400,
	//map	: THREE.ImageUtils.loadTexture( "../test/water.jpg" )
	map	: THREE.ImageUtils.loadTexture('ash_uvgrid01.jpg')
});
//material	= new THREE.MeshNormalMaterial();


var tunnelH	= 11;
//tunnelH	= 3;
var object	= tQuery.createCylinder(0.5, 0.5, tunnelH, 32, 20, true, material)
	.addTo(world)
	.geometry()
		.rotateX(1*Math.PI/2)
		.zoomZ(2)
		.translateZ(tunnelH/2)
	.back();

object.material().textureScrolling({
	transform	: function(tTexture){
		var deltaX	= 0;
		if( tQuery.keyboard().pressed('left') )	deltaX = -1;
		if( tQuery.keyboard().pressed('right')) deltaX =  1;
	
		var deltaY	= 0;
		if( tQuery.keyboard().pressed('up') )	deltaY =  1;
		if( tQuery.keyboard().pressed('down'))	deltaY = -1;

		tTexture.offset.x	+= 0.003 * deltaX;
		tTexture.offset.y	+= 0.01  * (1+0.8*deltaY);
	}
});

var vertexTransform	= function(o, v, time){
	var a	= time*3 + v.z * 0.8;
	v.x	= o.x + Math.cos(a/2)*0.4;
	v.y	= o.y + Math.cos(a/3)*0.6;
};

var vertexTransform0	= function(o, v, time){
	v.x	= o.x;
	v.y	= o.y;
	v.z	= o.z;
};

true && object.geometry().vertexAnimation({
	transform	: vertexTransform
});

// move the camera 
true && world.loop().hook(function(deltaTime, time){
	var origin	= {
		x	:  0,
		y	: -0.4,
		z	:  0
	};
	vertexTransform(origin, world.camera().position, time)
	world.camera().position.z	= 5;
});

// TODO make all this happen at the geometry level

world.renderer().setClearColorHex( 0x000000, 1 );

world.scene().fog	= new THREE.FogExp2( world.renderer().getClearColor(), 0.15 );

world.camera().position.set(0,0,5);


// TODO this would be better to flip the geometry. put it in tquery.geometry.toolbox.js
var tMesh	= object.get(0);
tMesh.flipSided	= true;
