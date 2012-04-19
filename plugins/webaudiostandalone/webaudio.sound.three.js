/**
 * Update the source with object3d. usefull for positional sounds
 * 
 * @param {THREE.Object3D} object3d the object which originate the source
 * @param {Number} deltaTime the number of seconds since last update
*/
tQuery.WebAudio.Sound.fn.updateWithObject3d	= function(object3d, deltaTime){
	// sanity check on parameters
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof(deltaTime) === 'number' );

	// ensure object3d.matrixWorld is up to date
	object3d.updateMatrixWorld();
	
	this.updateWithMatrix4(object3d.matrixWorld, deltaTime);
	
	return this;	// for chained API
}

/**
 * Update the source with a matrixWorld. usefull for positional sounds
 * 
 * @param {THREE.Matrix4} matrixWorld the matrixWorld describing the position of the sound
 * @param {Number} deltaTime the number of seconds since last update
*/
tQuery.WebAudio.Sound.fn.updateWithMatrix4	= function(matrixWorld, deltaTime){
	// sanity check on parameters
	console.assert( matrixWorld instanceof THREE.Matrix4 );
	console.assert( typeof(deltaTime) === 'number' );

	////////////////////////////////////////////////////////////////////////
	// set position
	var position	= matrixWorld.getPosition();
	this._panner.setPosition(position.x, position.y, position.z);

	////////////////////////////////////////////////////////////////////////
	// set orientation
	var vOrientation= new THREE.Vector3(0,0,1);
	var mOrientation= matrixWorld.clone();
	// zero the translation
	mOrientation.setPosition({x : 0, y: 0, z: 0});
	// Multiply the 0,0,1 vector by the world matrix and normalize the result.
	mOrientation.multiplyVector3(vOrientation);
	vOrientation.normalize();
	// Set panner orientation
	this._panner.setOrientation(vOrientation.x, vOrientation.y, vOrientation.z);
	
	////////////////////////////////////////////////////////////////////////
	// set velocity
	if( this._prevPos === undefined ){
		this._prevPos	= matrixWorld.getPosition().clone();
	}else{
		var position	= matrixWorld.getPosition();
		var velocity	= position.clone().subSelf(this._prevPos).divideScalar(deltaTime);
		this._prevPos	= matrixWorld.getPosition().clone();
		this._panner.setVelocity(velocity.x, velocity.y, velocity.z);
	}
}