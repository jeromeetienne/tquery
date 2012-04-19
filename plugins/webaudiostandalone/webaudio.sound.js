/**
 * sound instance
 *
 * @class Handle one sound for tQuery.WebAudio
 *
 * @param {tQuery.World} [world] the world on which to run
 * @param {tQuery.WebAudio.NodeChainBuilder} [nodeChain] the nodeChain to use
*/
tQuery.WebAudio.Sound	= function(world, nodeChain){
	this._world	= world ? world	: tQuery.world;
	this._webaudio	= this._world.getWebAudio();
	this._context	= this._webaudio.context();

	console.assert( this._world instanceof tQuery.World );
	
	// create a default NodeChainBuilder if needed
	if( nodeChain === undefined ){
		nodeChain	= new tQuery.WebAudio.NodeChainBuilder(this._context)
					.bufferSource().gainNode().analyser().panner();
	}
	// setup this._chain
	console.assert( nodeChain instanceof tQuery.WebAudio.NodeChainBuilder );
	this._chain	= nodeChain;

	// connect this._chain.last() node to this._webaudio._entryNode()
	this._chain.last().connect( this._webaudio._entryNode() );
	
	// create some alias
	this._source	= this._chain.nodes().bufferSource;
	this._gainNode	= this._chain.nodes().gainNode;
	this._analyser	= this._chain.nodes().analyser;
	this._panner	= this._chain.nodes().panner;
	
	// sanity check
	console.assert(this._source	, "no bufferSource: not yet supported")
	console.assert(this._gainNode	, "no gainNode: not yet supported")
	console.assert(this._analyser	, "no analyser: not yet supported")
	console.assert(this._panner	, "no panner: not yet supported")
};

/**
 * destructor
*/
tQuery.WebAudio.Sound.prototype.destroy	= function(){
	// disconnect from this._webaudio
	this._chain.last().disconnect();
	// destroy this._chain
	this._chain.destroy();
	this._chain	= null;
};

// vendor.js way to make plugins ala jQuery
tQuery.WebAudio.Sound.fn	= tQuery.WebAudio.Sound.prototype;

//////////////////////////////////////////////////////////////////////////////////
//		TODO put that in webaudio.sound.tquery.js			//
//////////////////////////////////////////////////////////////////////////////////

/**
 * follow a object3D
*/
tQuery.WebAudio.Sound.fn.follow	= function(object3d, world){
	console.assert( this.isFollowing() === false );
	// handle parameter
	if( object3d instanceof tQuery.Object3D ){
		console.assert(object3d.length === 1)
		object3d	= object3d.get(0);
	}
	// sanity check on parameters
	console.assert( object3d instanceof THREE.Object3D );

	// hook the world loop
	this._followCb		= function(deltaTime){
		this.updateWithObject3d(object3d, deltaTime);
	}.bind(this);
	world.loop().hook(this._followCb);
	// for chained API
	return this;
}

/**
 * unfollow the object3D if any
*/
tQuery.WebAudio.Sound.fn.unfollow	= function(world){
	this._world.loop().unhook(this._followCb);
	this._followCb		= null;
	// for chained API
	return this;
}

/**
 * @returns {Boolean} true if this sound is following a object3d, false overwise
*/
tQuery.WebAudio.Sound.prototype.isFollowing	= function(){
	return this._followCb ? true : false;
	// for chained API
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * getter of the chain nodes
*/
tQuery.WebAudio.Sound.prototype.nodes	= function(){
	return this._chain.nodes();
};

/**
 * @returns {Boolean} true if the sound is playable, false otherwise
*/
tQuery.WebAudio.Sound.prototype.isPlayable	= function(){
	return this._source.buffer ? true : false;
};

/**
 * play the sound
 *
 * @param {Number} [time] time when to play the sound
*/
tQuery.WebAudio.Sound.prototype.play		= function(time){
	if( time ===  undefined )	time	= 0;
	// clone the bufferSource
	var clonedNode	= this._chain.cloneBufferSource();
	// set the noteOn
	clonedNode.noteOn(time);
	// create the source object
	var source	= {
		node	: clonedNode,
		stop	: function(time){
			if( time ===  undefined )	time	= 0;
			this.node.noteOff(time);
			return source;	// for chained API
		}
	}
	// return it
	return source;
};

/**
 * getter/setter on the volume
 *
 * @param {Number} [value] the value to set, if not provided, get current value
*/
tQuery.WebAudio.Sound.prototype.volume	= function(value){
	if( value === undefined )	return this._gainNode.gain.value;
	this._gainNode.gain.value	= value;
	return this;	// for chained API
};


/**
 * getter/setter on the loop
 * 
 * @param {Number} [value] the value to set, if not provided, get current value
*/
tQuery.WebAudio.Sound.prototype.loop	= function(value){
	if( value === undefined )	return this._source.loop;
	this._source.loop	= value;
	return this;	// for chained API
};

/**
 * Set parameter for the pannerCone
 *
 * @param {Number} innerAngle the inner cone hangle in radian
 * @param {Number} outerAngle the outer cone hangle in radian
 * @param {Number} outerGain the gain to apply when in the outerCone
*/
tQuery.WebAudio.Sound.prototype.pannerCone	= function(innerAngle, outerAngle, outerGain)
{
	this._panner.coneInnerAngle	= innerAngle * 180 / Math.PI;
	this._panner.coneOuterAngle	= outerAngle * 180 / Math.PI;
	this._panner.coneOuterGain	= outerGain;
	return this;	// for chained API
};

/**
 * getter/setter on the pannerConeInnerAngle
 * 
 * @param {Number} value the angle in radian
*/
tQuery.WebAudio.Sound.prototype.pannerConeInnerAngle	= function(value){
	if( value === undefined )	return this._panner.coneInnerAngle / 180 * Math.PI;
	this._panner.coneInnerAngle	= value * 180 / Math.PI;
	return this;	// for chained API
};

/**
 * getter/setter on the pannerConeOuterAngle
 *
 * @param {Number} value the angle in radian
*/
tQuery.WebAudio.Sound.prototype.pannerConeOuterAngle	= function(value){
	if( value === undefined )	return this._panner.coneOuterAngle / 180 * Math.PI;
	this._panner.coneOuterAngle	= value * 180 / Math.PI;
	return this;	// for chained API
};

/**
 * getter/setter on the pannerConeOuterGain
 * 
 * @param {Number} value the value
*/
tQuery.WebAudio.Sound.prototype.pannerConeOuterGain	= function(value){
	if( value === undefined )	return this._panner.coneOuterGain;
	this._panner.coneOuterGain	= value;
	return this;	// for chained API
};

/**
 * compute the amplitude of the sound (not sure at all it is the proper term)
 *
 * @param {Number} width the number of frequencyBin to take into account
 * @returns {Number} return the amplitude of the sound
*/
tQuery.WebAudio.Sound.prototype.amplitude	= function(width)
{
	// handle paramerter
	width		= width !== undefined ? width : 2;
	// inint variable
	var analyser	= this._analyser;
	var freqByte	= new Uint8Array(analyser.frequencyBinCount);
	// get the frequency data
	analyser.getByteFrequencyData(freqByte);
	// compute the sum
	var sum	= 0;
	for(var i = 0; i < width; i++){
		sum	+= freqByte[i];
	}
	// complute the amplitude
	var amplitude	= sum / (width*256-1);
	// return ampliture
	return amplitude;
}

//////////////////////////////////////////////////////////////////////////////////
//		TODO put that in a plugin webaudio.sound.three.js		//
//////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Load a sound
 *
 * @param {String} url the url of the sound to load
 * @param {Function} callback function to notify once the url is loaded (optional)
*/
tQuery.WebAudio.Sound.prototype.load = function(url, callback){
	this._loadAndDecodeSound(url, function(buffer){
		this._source.buffer	= buffer;
		callback && callback(this);
	}.bind(this), function(){
		console.warn("unable to load sound "+url);
	});
	return this;	// for chained API
};

/**
 * Load and decode a sound
 *
 * @param {String} url the url where to get the sound
 * @param {Function} onLoad the function called when the sound is loaded and decoded (optional)
 * @param {Function} onError the function called when an error occured (optional)
*/
tQuery.WebAudio.Sound.prototype._loadAndDecodeSound	= function(url, onLoad, onError){
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
