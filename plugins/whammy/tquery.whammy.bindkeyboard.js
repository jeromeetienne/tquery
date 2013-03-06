tQuery.Whammy.registerInstance('bindKeyboard', function(keyCode, element){
	// handle parameters polymorphism
	element	= element	|| document.body;
	keyCode = keyCode !== undefined ? keyCode : "r".charCodeAt(0);
	// bind event
	element.addEventListener('keypress', function(event){
		// if not our action key 
		if( event.keyCode !== keyCode )	return;
		// press switch
		this.pressSwitch(element);
	}.bind(this));
	return this;	// for chained API
});



