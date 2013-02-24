/**
 * get screen position
 * 
 * @param  {THREE.Camera|undefined} tCamera	the camera used to render
 * @return {THREE.Vector3}			the screen position
 */
tQuery.Object3D.registerInstance('screenPosition', function(tCamera){
	tCamera		= tCamera	|| tQuery.world.tCamera();
	var position	= this.worldPosition();
	return tQuery.convertWorldToScreenSpace(position, tCamera);
});

/**
 * get the world position
 * @return {THREE.Vector3}	the world position
 */
tQuery.Object3D.registerInstance('worldPosition', function(){
	var tObject3D	= this.get(0);
	tObject3D.updateMatrixWorld();
	var worldMat	= tObject3D.matrixWorld;
	var worldPos	= tQuery.createVector3().getPositionFromMatrix(worldMat);
	return worldPos;
});

tQuery.Object3D.registerInstance('cssPosition', function(tRenderer, tCamera){
	tRenderer	= tRenderer	|| tQuery.world.tRenderer();
	tCamera		= tCamera	|| tQuery.world.tCamera();
	var position	= this.screenPosition(tCamera);
	position.x	= (  (position.x/2 + 0.5)) * tRenderer.domElement.width;
	position.y	= (1-(position.y/2 + 0.5)) * tRenderer.domElement.height;
	return position;
});

/**
 * convert world position to screen space
 * 
 * @param  {THREE.Vector3}	worldPosition	the world position
 * @param  {THREE.Camera}	tCamera       	the camera used to render
 * @return {THREE.Vector3}			the screen space position [-1, +1]
 */
tQuery.registerStatic('convertWorldToScreenSpace', function(worldPosition, tCamera){
	var projector	= tQuery.convertWorldToScreenSpace.projector || new THREE.Projector();
	var screenPos	= projector.projectVector(worldPosition.clone(), tCamera );
	return screenPos;
});
