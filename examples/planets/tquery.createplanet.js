tQuery.register('createPlanet', function(opts){
	opts	= tQuery.extend(opts, {
		type	: "moon"
	});
	
	var object	= tQuery.createSphere();
	object.material(new THREE.MeshLambertMaterial({
		ambient	: 0x888888,
		color	: 0x888888,
		map	: THREE.ImageUtils.loadTexture('images/moon_1024.jpg')
	}));
console.log("slota")
console.dir(object);
	return object;
});