//////////////////////////////////////////////////////////////////////////////////
//		DialogTree							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * implement dialog tree
 * @class dialog tree
 */
var DialogTree	= function(){
	this._nodes	= [];
	this._nodeId	= null;
}

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= DialogTree;

/**
 * initialize the tree with jsonData
 * 
 * @param  {Object} jsonData the dialog tree to ini
 */
DialogTree.prototype.initFromJSON	= function(jsonData, initialNodeId){
	// handle polymorphism
	initialNodeId	= initialNodeId	|| jsonData[0].nodeId;
	// copy parameter
	this._nodes	= jsonData;
	this._nodeId	= initialNodeId;
	// check the result
	console.assert( this._isValid() );
};

/**
 * Check if current dialog tree is valid
 * 
 * @todo TO WRITE
 * @return {Boolean} true if the tree is valid, false otherwise
 */
DialogTree.prototype._isValid	= function(){
	// check that current nodeId exist
	console.assert( this._nodeFromId(this._nodeId) );
	// check each node
	this._nodes.forEach(function(node){
		// ensure there is a .nodeId
		console.assert(node.nodeId);
		node.answers.forEach(function(answer){
			// if there are no nextNodeId, return now
			if( !answer.nextNodeId )	return;
			// check this nodeId actually exists
			var nextNodeId	= answer.nextNodeId;
			console.assert( this._nodeFromId(nextNodeId), 'undefined nodeId: '+nextNodeId );
		}.bind(this));
	}.bind(this));
	// TODO not yet implemented
	return true;
};


/**
 * get node from nodeId
 * @param  {String} nodeId	the id of the node to get
 * @return {Object|null}        the node just found, or null if not found
 */
DialogTree.prototype._nodeFromId = function(nodeId) {
	for(var i = 0; i < this._nodes.length; i++){
		var node	= this._nodes[i]
		if( node.nodeId === nodeId )	return node;
	}
	return null;
};

/**
 * node getter
 * @param  {String} [nodeId] the node id to get. Default to this._nodeId
 * @return {Object|null}	the node just found, or null if not found
 */
DialogTree.prototype.node = function(nodeId){
	// handle polymorphism
	nodeId		= nodeId	|| this._nodeId;
	// get the node
	var node	= this._nodeFromId(nodeId);
	// return node
	return node;
};

/**
 * Getter/Setter for nodeId
 * @param  {String} [value] the value to use for the setter if provided,
 * @return {String|DialogTree}	the value of the node it if getter, chained API for setter
 */
DialogTree.prototype.nodeId = function(value) {
	if( value === undefined )	return this._nodeId;
	this._nodeId	= value;
	// check the result
	console.assert( this._isValid() );
	return this;
};

DialogTree.prototype.answer = function(answerIdx){
	console.assert(answerIdx < this.node().answers.length, "answerIdx too high");
	var node	= this.node();
	var answer	= node.answers[answerIdx];
	this._nodeId	= answer.nextNodeId;
	return this._node;
};

//////////////////////////////////////////////////////////////////////////////////
//		Helpers								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Creator for DialogTree
 * @param  {Object} jsonData	the json object
 * @return {DialogTree}		the just-created DialogTree
 */
DialogTree.fromJSON = function(jsonData){
	var dialogTree	= new DialogTree();
	dialogTree.initFromJSON(jsonData);
	return dialogTree
};
