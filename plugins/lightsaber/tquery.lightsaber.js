//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createLightSaber', function(opts){
	return new tQuery.LightSaber(opts);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * TODO make it more flexible
*/
tQuery.registerStatic('LightSaber', function(opts){
	
	this._objRoot	= tQuery.createObject3D();
	this._objHilt	= tQuery.createObject3D().addTo(this._objRoot);
	this._objLaser	= tQuery.createObject3D().addTo(this._objRoot);

	// internal part of the hilt
	this._objHiltIn	= tQuery.createCylinder(0.30, 0.20, 1, 8*6, 6*6).addTo(this._objHilt)
				.geometry()
					.rotateZ(-Math.PI/2)
					.back()
	// external part of the hilt
	this._objHiltOut= tQuery.createTorus(0.38-0.05, 0.05, 6*8, 8*8).addTo(this._objHilt)
				.rotateY(Math.PI/2)
				.geometry()
					.scaleBy(1, 1, 20)
					.back()

	// generate the texture
	var canvas	= this._generateLaserCanvas();
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
	
	var nPlanes	= 4;
	for(var i = 0; i < nPlanes; i++){
		tQuery.createPlane().addTo(this._objLaser)
			.material(material)
			.scale(300, 3, 3)
			.rotateX(i*Math.PI/nPlanes)
	}

	
	// store built objects for later
	this._objects3D	= {
		'root'		: this._objRoot,
		'hilt'		: this._objHilt,
		'hiltIn'	: this._objHiltIn,
		'hiltOut'	: this._objHiltOut,
		'laser'		: this._objLaser
	};
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * getter/setter on objects3d
 *
 * @param {string} name the name of the object3d to get
*/
tQuery.LightSaber.prototype.object3D	= function(name, value){
	// name default to 'root'
	name	= name	|| 'root';
	// handle getter case
	if( value === undefined )	return this._objects3D[name];
	this._objects3D[name]	= name;
	return this;
}

/**
 * Emulate tQuery.Object3D.addTo
*/
tQuery.LightSaber.prototype.addTo	= function(object3D){
	this.object3D('root').addTo(object3D);
	return this;
};

/**
 * Emulate tQuery.Object3D.removeFrom
*/
tQuery.LightSaber.prototype.removeFrom	= function(object3D){
	this.object3D('root').removeFrom(object3D);
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Generate the canvas texture for the laser
 * @return {HTMLCanvasElement} the built canvas
*/
tQuery.LightSaber.prototype._generateLaserCanvas = function(){
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