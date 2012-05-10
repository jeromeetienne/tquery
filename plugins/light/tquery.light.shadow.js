tQuery.DirectionalLight.register('shadowMap', function(width, height){
	return this.shadowMapWidth(width).shadowMapHeight(height);
});

tQuery.DirectionalLight.register('shadowCamera', function(right, left, top, bottom, near, far){
	if( near !== undefined && far !== undefined ){
		this.shadowCameraNear(near).shadowCameraFar(far);
	}
	return this.shadowCameraRight(right)
			.shadowCameraLeft(left)
			.shadowCameraTop(top)
			.shadowCameraBottom(bottom);
});
