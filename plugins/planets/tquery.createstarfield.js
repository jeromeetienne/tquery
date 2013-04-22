tQuery.registerStatic('createStarField', function(opts){
	// handle arguments default values
	opts	= tQuery.extend(opts, {
		nStars	: 2000
	})
	opts.fieldSize	= opts.fieldSize	|| tQuery.createVector3(10,10,10)
	// load texture
	var url		= tQuery.createPlanet.baseUrl + '/images/particle.png';
	var texture	= THREE.ImageUtils.loadTexture(url)
	// create the stars
	var tMaterial	= new THREE.ParticleBasicMaterial({
		color		: 'white',
		size		: 0.1,
		map		: texture,
		transparent	: true,
		blending	: THREE.CustomBlending,
		blendSrc	: THREE.SrcAlphaFactor,
		blendDst	: THREE.OneMinusSrcColorFactor,
		blendEquation	: THREE.AddEquation
	});
	// geometry
	var fieldSize	= opts.fieldSize;
	var tGeometry	= new THREE.Geometry();
	for( var i = 0; i < opts.nStars; i++ ){
		var vertex	= new THREE.Vector3();
		vertex.x	= Math.random() * fieldSize.x - fieldSize.x/2;
		vertex.y	= Math.random() * fieldSize.y - fieldSize.y/2;
		vertex.z	= Math.random() * fieldSize.z - fieldSize.z/2;
		tGeometry.vertices.push(vertex);
	}
	// build the particle
	var system	= new THREE.ParticleSystem(tGeometry, tMaterial);
	system.sortParticles = true;
	// return the tQuery object
	return tQuery(system)
});
