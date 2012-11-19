var DialogTreeRunnerConsole	= function(dialogTree){
	this._dialogTree	= dialogTree;
	this._nodesHistory	= [];
}

/**
 * load synchronoulsy the dialogtree from the url
 * @param  {String} url the url for the dialogtree in json
 * @return {DialogTreeRunnerConsole}     for chained API
 */
DialogTreeRunnerConsole.prototype.loadSync = function(url) {
	// load the json
	var request	= new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(); 
	console.assert( request.status === 200 );
	var jsonData	= eval(request.responseText);
	// init the dialogtree
	this._dialogTree= DialogTree.fromJSON(jsonData);
	// return this
	return this;
};

DialogTreeRunnerConsole.prototype.dialogTree = function() {
	return this._dialogTree;
};

DialogTreeRunnerConsole.prototype.displayNode = function() {
	var node	= this._dialogTree.node();
	console.log('BOT:', node.botText);
	node.answers.forEach(function(answer, answerIdx){
		console.log('Answer '+ answerIdx + ': ' + answer.text + (answer.nextNodeId ? '' : ' [end]'))
	});
};

DialogTreeRunnerConsole.prototype.back = function(){
	var dialogTree	= this._dialogTree;
	if(this._nodesHistory.length === 0)	return;
	var nodeId	= this._nodesHistory.pop();
	dialogTree.nodeId(nodeId);
};

DialogTreeRunnerConsole.prototype.answer = function(answerIdx) {
	var dialogTree	= this._dialogTree;
	// update nodesHistory
	this._nodesHistory.push( dialogTree.nodeId() );
	// notify the answer to DialogTree
	dialogTree.answer(answerIdx);
	// display new dialogNode if 
	if( !dialogTree.node() )	console.log('This conversation is now over')
};