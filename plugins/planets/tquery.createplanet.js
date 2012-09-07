tQuery.register('createPlanet', function(opts){
	opts	= tQuery.extend(opts, {
		type	: "moon"
	});
	
	var baseUrl	= tQuery.createPlanet.baseUrl;
console.log('baseUrl planets', baseUrl)
	var url		= baseUrl + 'images/moon_1024.jpg';
console.log('Url planets', baseUrl)
	var object	= tQuery.createSphere();
	object.material(new THREE.MeshBasicMaterial({
		ambient	: 0x888888,
		color	: 0x888888,
		map	: THREE.ImageUtils.loadTexture(url)
	}));
	return object;
});

tQuery.createPlanet.baseUrl	= "../../../plugins/planets/";
