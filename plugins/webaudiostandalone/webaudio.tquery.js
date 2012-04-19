/**
 * @fileoverview WebAudio.js plugin for tQuery
*/
tQuery.World.register('enableWebAudio', function(){
	// sanity check
	console.assert( this.hasWebAudio() === false, "there is already a webaudio" );
	// intenciate a tQuery.World.WebAudio
	var webaudio	= new tQuery.WebAudio();
	// follow the listener 
	webaudio.followListener(this);
	// store webaudio in the world
	tQuery.data(this, "webaudio", webaudio);
	// for chained API
	return this;
});

tQuery.World.register('disabledWebAudio', function(){
	if( this.hasWebAudio() === false )	return this;
	var webaudio	= tQuery.data(this, "webaudio");
	webaudio.destroy();
	tQuery.removeData(this, "webaudio");
	return this;	// for chained API
});

tQuery.World.register('getWebAudio', function(){
	var webaudio	= tQuery.data(this, "webaudio");
	return webaudio;
});

tQuery.World.register('hasWebAudio', function(){
	var webaudio	= tQuery.data(this, "webaudio");
	return webaudio ? true : false;
});

tQuery.World.register('supportWebAudio', function(){
	return tQuery.WebAudio.isAvailable;
});

tQuery.register('createSound', function(world, nodeChain){
	world	= world || tQuery.world;
	return new tQuery.WebAudio.Sound(world.getWebAudio(), nodeChain);
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.WebAudio.fn.followListener	= function(world){
	this._$followListenerCb	= function(deltaTime){
		this._followListenerCb(world.camera(), deltaTime);
	}.bind(this);
	world.loop().hook(this._$followListenerCb);
}

tQuery.WebAudio.fn.unfollowListener	= function(world){
	// unhook this._updateCb from this.world.loop()
	world.loop().unhook(this._$followListenerCb);
	this._$followListenerCb	= null;
}

tQuery.WebAudio.fn._followListenerCb	= function(object3d, deltaTime){
	var context	= this._ctx;
	// sanity check on parameters
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof(deltaTime) === 'number' );

	// ensure object3d.matrixWorld is up to date
	object3d.updateMatrixWorld();
	
	////////////////////////////////////////////////////////////////////////
	// set position
	var position	= object3d.matrixWorld.getPosition();
	context.listener.setPosition(position.x, position.y, position.z);

	////////////////////////////////////////////////////////////////////////
	// set orientation
	var mOrientation= object3d.matrixWorld.clone();
	// zero the translation
	mOrientation.setPosition({x : 0, y: 0, z: 0});
	// Compute Front vector: Multiply the 0,0,1 vector by the world matrix and normalize the result.
	var vFront= new THREE.Vector3(0,0,1);
	mOrientation.multiplyVector3(vFront);
	vFront.normalize();
	// Compute UP vector: Multiply the 0,-1,0 vector by the world matrix and normalize the result.
	var vUp= new THREE.Vector3(0,-1, 0);
	mOrientation.multiplyVector3(vUp);
	vUp.normalize();
	// Set panner orientation
	context.listener.setOrientation(vFront.x, vFront.y, vFront.z, vUp.x, vUp.y, vUp.z);

	////////////////////////////////////////////////////////////////////////
	// set velocity
	if( this._prevPos === undefined ){
		this._prevPos	= object3d.matrixWorld.getPosition().clone();
	}else{
		var position	= object3d.matrixWorld.getPosition();
		var velocity	= position.clone().subSelf(this._prevPos).divideScalar(deltaTime);
		this._prevPos	= object3d.matrixWorld.getPosition().clone();
		context.listener.setVelocity(velocity.x, velocity.y, velocity.z);
	}
}


