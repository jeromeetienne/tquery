tQuery.SpaceShips.registerStatic('createShoot', function(){
	// your code goes here
	var canvas	= generateShootCanvas();
	var texture	= new THREE.Texture( canvas );
	texture.needsUpdate = true;

	// do the material	
	var material	= new THREE.MeshBasicMaterial({
		map		: texture,
		blending	: THREE.AdditiveBlending,
		color		: 0xffaacc,
		side		: THREE.DoubleSide,
		depthWrite	: false,
		transparent	: true
	})

	this._container	= tQuery.createObject3D()
		.rotateY(Math.PI/2)
		.scaleBy(1/2)
	var nPlanes	= 4;
	for(var i = 0; i < nPlanes; i++){
		tQuery.createPlane().addTo(this._container)
			.material(material)
			.rotateX(i*Math.PI/nPlanes)
	}
		
	function generateShootCanvas(){
		// init canvas
		var canvas	= document.createElement( 'canvas' );
		var context	= canvas.getContext( '2d' );
		canvas.width	= 16;
		canvas.height	= 64;
		// set gradient
		var gradient	= context.createRadialGradient(
			canvas.width/2, canvas.height /2, 0,
			canvas.width/2, canvas.height /2, canvas.width /2
		);		
		gradient.addColorStop( 0  , 'rgba(255,255,255,0.7)' );
		gradient.addColorStop( 0.5, 'rgba(192,192,192,0.5)' );
		gradient.addColorStop( 0.8, 'rgba(128,128,128,0.3)' );
		gradient.addColorStop( 1  , 'rgba(0,0,0,0)' );

		// fill the rectangle
		context.fillStyle	= gradient;
		context.fillRect(0,0, canvas.width, canvas.height);
		// return the just built canvas 
		return canvas;	
	};
	
	return this._container	
});