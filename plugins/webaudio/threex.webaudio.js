/**
 * Tutorials:
 * http://www.html5rocks.com/en/tutorials/webaudio/games/
 * http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/ <- +1 as it is three.js
 * http://www.html5rocks.com/en/tutorials/webaudio/intro/
 *
 * Spec:
 * https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
*/

/**
 * @namespace
*/
var THREEx	= THREEx	|| {};

/**
 * Constructor
*/
THREEx.WebAudio	= function(){
	// create the context
	this._ctx	= new webkitAudioContext();

	// setup the end of the node chain
	// TODO later code the clipping detection from http://www.html5rocks.com/en/tutorials/webaudio/games/ 
	this._gainNode	= this._ctx.createGainNode();
	this._compressor= this._ctx.createDynamicsCompressor();
	this._gainNode.connect( this._compressor );
	this._compressor.connect( this._ctx.destination );
};

THREEx.WebAudio.prototype.destroy	= function(){
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * get the audio context
 * 
 * @returns {AudioContext} the audio context
*/
THREEx.WebAudio.prototype.context	= function(){
	return this._ctx;
};

/**
 * return the entry node in the master node chains
*/
THREEx.WebAudio.prototype._entryNode	= function(){
	//return this._ctx.destination;
	return this._gainNode;
}

/**
 * getter/setter on the volume
*/
THREEx.WebAudio.prototype.volume	= function(value){
	if( value === undefined )	return this._gainNode.gain.valueue;
	this._gainNode.gain.value	= value;
	return this;
};


THREEx.WebAudio.prototype.updateListener	= function(object3d, deltaTime){
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


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * FIXME - arch error
 * - you create a sound which is attached to webaudio
 * - this sound may be bound to the position of a object3D
*/

THREEx.WebAudio.Sound	= function(webaudio){
	console.assert( webaudio instanceof THREEx.WebAudio );
	this._webaudio	= webaudio;
	this._context	= webaudio.context();

	this._source	= this._context.createBufferSource();
	this._gainNode	= this._context.createGainNode();
	this._pannerNode= this._context.createPanner();
	this._source.connect( this._gainNode );
	this._gainNode.connect( this._pannerNode );
	this._pannerNode.connect( this._webaudio._entryNode() );

	// TODO this hardcoded source MUST NOT stay obviously
	this._loadAndDecodeSound('sounds/techno.mp3', function(buffer){
		this._source.buffer	= buffer;
		this._source.loop	= true;
		this.play();
		console.log(this._context.listener);
	}.bind(this));
};

THREEx.WebAudio.Sound.prototype.destroy	= function(){
	// TODO disconnect the source
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.WebAudio.Sound.prototype.isPlayable	= function(){
	return this._source.buffer ? true : false;
};

THREEx.WebAudio.Sound.prototype.play		= function(time){
	if( time ===  undefined )	time	= 0;
	this._source.noteOn(time);
};

 THREEx.WebAudio.Sound.prototype.stop		= function(time){
	if( time ===  undefined )	time	= 0;
	this._source.noteOff(time);
};

/**
 * getter/setter on the volume
*/
THREEx.WebAudio.Sound.prototype.volume	= function(value){
	if( value !== undefined )	return this._gainNode.gain.value;
	this._gainNode.gain.value	= value;
	return this;
};

/**
 * Set parameter for the pannerCone
 *
 * @param {Number} innerAngle the inner cone hangle in radian
 * @param {Number} outerAngle the outer cone hangle in radian
 * @param {Number} outerGain the gain to apply when in the outerCone
*/
THREEx.WebAudio.Sound.prototype.pannerCone	= function(innerAngle, outerAngle, outerGain)
{
	this._pannerNode.coneInnerAngle	= innerAngle * 180 / Math.PI;
	this._pannerNode.coneOuterAngle	= outerAngle * 180 / Math.PI;
	this._pannerNode.coneOuterGain	= outerGain;
};


/**
 * Update the source with object3d. usefull for positional sounds
 * 
 * @param {THREE.Object3D} object3d the object which originate the source
 * @param {Number} deltaTime the number of seconds since last update
*/
THREEx.WebAudio.Sound.prototype.updateWithObject3d	= function(object3d, deltaTime){
	// sanity check on parameters
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof(deltaTime) === 'number' );

	// ensure object3d.matrixWorld is up to date
	object3d.updateMatrixWorld();

	////////////////////////////////////////////////////////////////////////
	// set position
	var position	= object3d.matrixWorld.getPosition();
	this._pannerNode.setPosition(position.x, position.y, position.z);

	////////////////////////////////////////////////////////////////////////
	// set orientation
	var vOrientation= new THREE.Vector3(0,0,1);
	var mOrientation= object3d.matrixWorld.clone();
	// zero the translation
	mOrientation.setPosition({x : 0, y: 0, z: 0});
	// Multiply the 0,0,1 vector by the world matrix and normalize the result.
	mOrientation.multiplyVector3(vOrientation);
	vOrientation.normalize();
	// Set panner orientation
	this._pannerNode.setOrientation(vOrientation.x, vOrientation.y, vOrientation.z);
	
	////////////////////////////////////////////////////////////////////////
	// set velocity
	if( this._prevPos === undefined ){
		this._prevPos	= object3d.matrixWorld.getPosition().clone();
	}else{
		var position	= object3d.matrixWorld.getPosition();
		var velocity	= position.clone().subSelf(this._prevPos).divideScalar(deltaTime);
		this._prevPos	= object3d.matrixWorld.getPosition().clone();
		this._pannerNode.setVelocity(velocity.x, velocity.y, velocity.z);
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Load and decode a sound
 *
 * @param {String} url the url where to get the sound
 * @param {Function} onLoad the function called when the sound is loaded and decoded (optional)
 * @param {Function} onError the function called when an error occured (optional)
*/
THREEx.WebAudio.Sound.prototype._loadAndDecodeSound	= function(url, onLoad, onError){
	var context	= this._context;
	var request	= new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType	= 'arraybuffer';
	// Decode asynchronously
	request.onload	= function() {
		context.decodeAudioData(request.response, function(buffer) {
			onLoad && onLoad(buffer);
		}, function(){
			onError && onError();
		});
	};
	// actually start the request
	request.send();
}

