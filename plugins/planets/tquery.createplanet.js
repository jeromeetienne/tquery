tQuery.register('createPlanet', function(opts){
	// handle parameters polymorphism
	if( typeof(opts) === 'string' )	opts	= { type: opts };
	// handle options default
	opts	= tQuery.extend(opts, {
		type	: 'moon'
		//type	: 'earth'
	});
	
	var baseUrl	= tQuery.createPlanet.baseUrl;
	if( opts.type === 'moon' ){
		var url		= baseUrl + 'images/moon_1024.jpg';	
		var object	= tQuery.createSphere();
		object.material(new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture(url)
		}));
	}else if( opts.type === 'earth' ){
		var object	= tQuery.createObject3D()

		var earth	= tQuery.createSphere().addTo(object);
		var url		= baseUrl + 'images/earth_atmos_2048.jpg';
		earth.material(new THREE.MeshBasicMaterial({
			map	: THREE.ImageUtils.loadTexture(url)
		}));

		var cloud	= tQuery.createSphere(0.52).addTo(object);
		var url		= baseUrl + 'images/earth_clouds_1024.png';
		cloud.material(new THREE.MeshBasicMaterial({
			map		: THREE.ImageUtils.loadTexture(url),
			transparent	: true
		}));
	}else	console.assert(false, 'unknown opts.type: '+opts.type)

	return object;
});

tQuery.createPlanet.baseUrl	= "../../../plugins/planets/";
