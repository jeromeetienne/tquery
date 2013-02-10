/**
 * Generate a sound with jsfx.js library
 *
 * @param {Array} lib the library parameters to generate a sound with jsfx
 * 
 * @returns {WebAudio.Sound} for chained API
*/
WebAudio.Sound.fn.generateWithJsfx	= function(lib){
	// sanity check - all dependancy MUST be loaded
	console.assert(jsfx	, "jsfx.js MUST be loaded");
	console.assert(jsfxlib	, "jsfxlib.js from jsfx.js MUST be loaded");
	console.assert(audio	, "audio.js from jsfx.js MUST be loaded");
	// generate the params
	var params	= jsfxlib.arrayToParams(lib);
	// generate the wave itself and return it
	var data	= jsfx.generate(params);

	// Build the AudioBuffer
	var buffer	= this._webaudio.context().createBuffer(1, data.length, 44100);
	var fArray	= buffer.getChannelData(0);
	for(var i = 0; i < fArray.length; i++){
		fArray[i]	= data[i];
	}
	// set the buffer in this sound
	this.buffer(buffer);	
	// for chained API
	return this;
};