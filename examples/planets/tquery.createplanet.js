define(['module'], function(module){
	var scriptBaseUrl	= tQuery.scriptBaseUrl(module);
	console.log("scriptBaseUrl", scriptBaseUrl);

	tQuery.register('createPlanet', function(opts){
		opts	= tQuery.extend(opts, {
			type	: "moon"
		});
		
		var object	= tQuery.createSphere();
		var url		= scriptBaseUrl+'images/moon_1024.jpg';
		object.material(new THREE.MeshLambertMaterial({
			ambient	: 0x888888,
			color	: 0x888888,
			map	: THREE.ImageUtils.loadTexture(url)
		}));
	
		return object;
	});
});