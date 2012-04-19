/**
 * Constructor
 *
 * @class builder to generate nodes chains. Used in tQuery.WebAudio.Sound
 * @param {webkitAudioContext} audioContext the audio context
*/
tQuery.WebAudio.NodeChainBuilder	= function(audioContext){
	console.assert( audioContext instanceof webkitAudioContext );
	this._context	= audioContext;
	this._firstNode	= null;
	this._lastNode	= null;
	this._nodes	= {};
};

/**
 * destructor
*/
tQuery.WebAudio.NodeChainBuilder.prototype.destroy	= function(){
};

/**
 * getter for the nodes
*/
tQuery.WebAudio.NodeChainBuilder.prototype.nodes	= function(){
	return this._nodes;
}

/**
 * @returns the first node of the chain
*/
tQuery.WebAudio.NodeChainBuilder.prototype.first	= function(){
	return this._firstNode;
}

/**
 * @returns the last node of the chain
*/
tQuery.WebAudio.NodeChainBuilder.prototype.last	= function(){
	return this._lastNode;
}

tQuery.WebAudio.NodeChainBuilder.prototype._addNode	= function(node, properties)
{
	// update this._bufferSourceDst - needed for .cloneBufferSource()
	var lastIsBufferSource	= this._lastNode && ('playbackRate' in this._lastNode) ? true : false;
	if( lastIsBufferSource )	this._bufferSourceDst	= node;

	// connect this._lastNode to node if suitable
	if( this._lastNode !== null )	this._lastNode.connect(node);
	
	// update this._firstNode && this._lastNode
	if( this._firstNode === null )	this._firstNode	= node;
	this._lastNode	= node;
		
	// apply properties to the node
	for( var property in properties ){
		node[property]	= properties[property];
	}

	// for chained API
	return this;
};


/**
 * Clone the bufferSource. Used just before playing a sound
 * @returns {AudioBufferSourceNode} the clone AudioBufferSourceNode
*/
tQuery.WebAudio.NodeChainBuilder.prototype.cloneBufferSource	= function(){
	console.assert(this._nodes.bufferSource, "no buffersource presents. Add one.");
	var orig	= this._nodes.bufferSource;
	var clone	= this._context.createBufferSource()
	clone.buffer		= orig.buffer;
	clone.playbackRate	= orig.playbackRate;
	clone.loop		= orig.loop;
	clone.connect(this._bufferSourceDst);
	return clone;
}

/**
 * add a bufferSource
 *
 * @param {Object} [properties] properties to set in the created node
*/
tQuery.WebAudio.NodeChainBuilder.prototype.bufferSource	= function(properties){
	var node		= this._context.createBufferSource()
	this._nodes.bufferSource= node;
	return this._addNode(node, properties)
};

/**
 * add a panner
 * 
 * @param {Object} [properties] properties to set in the created node
*/
tQuery.WebAudio.NodeChainBuilder.prototype.panner	= function(properties){
	var node		= this._context.createPanner()
	this._nodes.panner	= node;
	return this._addNode(node, properties)
};

/**
 * add a analyser
 *
 * @param {Object} [properties] properties to set in the created node
*/
tQuery.WebAudio.NodeChainBuilder.prototype.analyser	= function(properties){
	var node		= this._context.createAnalyser()
	this._nodes.analyser	= node;
	return this._addNode(node, properties)
};

/**
 * add a gainNode
 *
 * @param {Object} [properties] properties to set in the created node
*/
tQuery.WebAudio.NodeChainBuilder.prototype.gainNode	= function(properties){
	var node		= this._context.createGainNode()
	this._nodes.gainNode	= node;
	return this._addNode(node, properties)
};

