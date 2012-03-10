
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
	this._camera	= null;
	this._sounds	= [];
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

THREEx.WebAudio.prototype._entryNode	= function(){
	return this._ctx.destination;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

THREEx.WebAudio.prototype.bindCamera	= function(camera){
	console.assert( camera instanceof THREE.Camera );
	this._camera	= camera;
};

THREEx.WebAudio.prototype.unbindCamera	= function(){
	this._camera	= null;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Add an sound (it MUST NOT be present)
*/
THREEx.WebAudio.prototype.addSound	= function(sound){
	console.assert( sound instanceof THREEx.WebAudio.Sound );
	console.assert(this._sounds.indexOf(sound) === -1)
	this._sounds.push( sound );
}

/**
 * Remove an sound (it MUST be present)
*/
THREEx.WebAudio.prototype.removeSound	= function(sound){
	console.assert( sound instanceof THREEx.WebAudio.Sound );
	var index	= this._sounds.indexOf(sound);
	console.assert(index !== -1)
	this._sounds.splice(indexaColors.indexOf('tag'), 1);
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
THREEx.WebAudio.prototype._loadAndDecodeSound	= function(url, onLoad, onError){
	var cxt		= this._ctx;
	var request	= new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType	= 'arraybuffer';
	// Decode asynchronously
	request.onload	= function() {
		ctx.decodeAudioData(request.response, function(buffer) {
			onLoad && onLoad(buffer);
		}, function(){
			onError && onError();
		});
	};
	// actually start the request
	request.send();
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

this._source.loop	= true;

	this._loadAndDecodeSound('sounds/techno.mp3', function(buffer){
		this._source.buffer	= buffer;
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

THREEx.WebAudio.Sound.prototype.play		= function(){
	this._source.noteOn(0);
};

THREEx.WebAudio.Sound.prototype.stop		= function(){
	this._source.noteOff(0);
};

/**
 * getter/setter on the volume
*/
THREEx.WebAudio.Sound.prototype.volume	= function(val){
	if( val !== undefined ){
		this._gainNode.gain.value	= val;
	}
	return this._gainNode.gain.value;
};


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

