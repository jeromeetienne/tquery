/**
 * little helper to set the width and height of the shadowMap 
*/
tQuery.DirectionalLight.registerInstance('shadowMap', function(width, height){
	return this.shadowMapWidth(width).shadowMapHeight(height);
});

/**
 * little helper to set all shadowCamera params
*/
tQuery.DirectionalLight.registerInstance('shadowCamera', function(right, left, top, bottom, near, far){
	if( near !== undefined && far !== undefined ){
		this.shadowCameraNear(near).shadowCameraFar(far);
	}
	return this.shadowCameraRight(right)
			.shadowCameraLeft(left)
			.shadowCameraTop(top)
			.shadowCameraBottom(bottom);
});
