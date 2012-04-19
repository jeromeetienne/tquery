tQuery.DirectionalLight.register('shadowMap', function(width, height){
	return this.shadowMapWidth(width).shadowMapHeight(height);
});

tQuery.DirectionalLight.register('shadowCamera', function(right, left, top, bottom){
	return this.shadowCameraRight(right)
			.shadowCameraLeft(left)
			.shadowCameraTop(top)
			.shadowCameraBottom(bottom);
});
