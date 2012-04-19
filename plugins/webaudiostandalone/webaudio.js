/**
 * Tutorials:
 * http://www.html5rocks.com/en/tutorials/webaudio/games/
 * http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/ <- +1 as it is three.js
 * http://www.html5rocks.com/en/tutorials/webaudio/intro/
 *
 * Spec:
 * https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
 *
 * Chromium Demo:
 * http://chromium.googlecode.com/svn/trunk/samples/audio/index.html  <- running page
 * http://code.google.com/p/chromium/source/browse/trunk/samples/audio/ <- source
*/


/**
 * Notes on removing tQuery dependancy
 * * some stuff depends on tQuery
 * * find which one
 * * tQuery.Webaudio got a world link for the listener
 *   * do a plugin with followListener(world), unfollowListener(world)
 * * namespace become WebAudio.* instead of tQuery.WebAudio.*
*/

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//		tQuery.WebAudio							//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * Main class to handle webkit audio
 * 
 * TODO make the clip detector from http://www.html5rocks.com/en/tutorials/webaudio/games/
 *
 * @class Handle webkit audio API
 *
 * @param {tQuery.World} [world] the world on which to run 
*/
tQuery.WebAudio	= function(){
	// sanity check - the api MUST be available
	console.assert(tQuery.WebAudio.isAvailable === true, 'webkitAudioContext isnt available on your browser');

	// create the context
	this._ctx	= new webkitAudioContext();

	// setup the end of the node chain
	// TODO later code the clipping detection from http://www.html5rocks.com/en/tutorials/webaudio/games/ 
	this._gainNode	= this._ctx.createGainNode();
	this._compressor= this._ctx.createDynamicsCompressor();
	this._gainNode.connect( this._compressor );
	this._compressor.connect( this._ctx.destination );	
};


// vendor.js way to make plugins ala jQuery
tQuery.WebAudio.fn	= tQuery.WebAudio.prototype;

/**
 * destructor
*/
tQuery.WebAudio.prototype.destroy	= function(){
};

/**
 * 
 *
 * @return {Boolean} true if it is available or not
*/
tQuery.WebAudio.isAvailable	= window.webkitAudioContext ? true : false;

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * get the audio context
 *
 * @returns {AudioContext} the audio context
*/
tQuery.WebAudio.prototype.context	= function(){
	return this._ctx;
};

/**
 * return the entry node in the master node chains
*/
tQuery.WebAudio.prototype._entryNode	= function(){
	//return this._ctx.destination;
	return this._gainNode;
}

/**
 * getter/setter on the volume
*/
tQuery.WebAudio.prototype.volume	= function(value){
	if( value === undefined )	return this._gainNode.gain.value;
	this._gainNode.gain.value	= value;
	return this;
};

