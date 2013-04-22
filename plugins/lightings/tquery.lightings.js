//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


tQuery.registerStatic('createLighting3Points', function(opts){
	var tvSet	= new tQuery.Lighting3Points(opts)
	return tvSet;
})

tQuery.registerStatic('Lighting3Points', function(opts){
	// call parent ctor
	tQuery.Lighting3Points.parent.constructor.call(this)
	// handle arguments default value
	opts	= tQuery.extend(opts, {
	});	
	
	// init the container
	var container	= new THREE.Object3D()
	this.add(container)

	tQuery.createAmbientLight().addTo(container)
		.color(0x020202)
		.addClass('lightAmbient')

	var positionFront	= tQuery.createVector3(0.5, 0.5, 2);
	var positionBack	= positionFront.clone().negate();
	
	tQuery.createDirectionalLight().addTo(container)
		.addClass('lightFront')
		.position(positionFront)
		.color('white')
		.intensity(0.75)

	tQuery.createDirectionalLight().addTo(container)
		.addClass('lightBack')
		.position(positionBack)
		.color('white')
		.intensity(1)
});


// inherit from tQuery.Object3D§
tQuery.inherit(tQuery.Lighting3Points, tQuery.Object3D);

			