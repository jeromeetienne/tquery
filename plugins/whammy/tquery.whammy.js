tQuery.registerStatic('createWhammyRecorder', function(opts){
	return new tQuery.WhammyRecorder(opts);
});
/**
 * Create tQuery.Scene
*/
tQuery.registerStatic('WhammyRecorder', function(opts){
	this._opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		fps	: 15
	});

	this._encoder	= new Whammy.Video(this._opts.fps);
	this._callback	= null;
	this._output	= null;
});


// make it eventable
tQuery.MicroeventMixin(tQuery.WhammyRecorder.prototype);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.WhammyRecorder.prototype.start	= function(){
	var canvas	= this._opts.world.tRenderer().domElement;
	this._callback	= function(){
		this._encoder.add(canvas);
	}.bind(this);
	this._opts.world.loop().hook(this._callback);
	return this;	// for chained API
}

tQuery.WhammyRecorder.prototype.isRecording	= function(){
	return this._callback ? true : false;
}

tQuery.WhammyRecorder.prototype.stop	= function(){
	if( this.isRecording() === false )	return;
	this._output	= this._encoder.compile();
	this._opts.world.loop().unhook(this._callback);
	this._callback	= null;
	return this;	// for chained API
}

tQuery.WhammyRecorder.prototype.finalizedURL	= function(){
	var output	= this._output;
	var url		= (window.webkitURL || window.URL).createObjectURL(output);
	return url;
};

tQuery.WhammyRecorder.prototype.output	= function(){
	return this._output;
};

tQuery.WhammyRecorder.prototype.pressSwitch	= function(){
	if( this.isRecording() === false ){
		this.dispatchEvent('preStart');
		this.start()		
		this.dispatchEvent('postStart');
	}else{
		this.dispatchEvent('preStop');
		this.stop();
		this.dispatchEvent('postStop');
	}
	return this;	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.WhammyRecorder.prototype.bindKeyboard	= function(keyCode, element){
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
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


tQuery.WhammyRecorder.prototype.pressSwitchUI	= function(container){
	var commandEl	= container.querySelector('.command');
	var statusEl	= container.querySelector('.status');
	var downloadEl	= container.querySelector('.download');

	if( this.isRecording() === false ){
		this.start()		

		commandEl.textContent	= 'Stop';
		statusEl.textContent	= 'Recording';
	}else{
		var timeBefore	= Date.now();

		this.stop();
		var url		= recorder.finalizedURL();

		var timeAfter	= Date.now();

		downloadEl.href	= url;
		downloadEl.style.display	= ''

		commandEl.textContent	= 'Start';

		var statusText	= "Compiled Video in " + (timeAfter - timeBefore) + "ms"
		statusText	+= "- file size: " + Math.ceil(this._output.size / 1024) + "KB";
		statusEl.innerHTML	= statusText;
	}
}

tQuery.WhammyRecorder.prototype.bindKeyboardUI	= function(element, keyCode){
	// handle parameters polymorphism
	element	= element	|| document.body;
	keyCode = keyCode !== undefined ? keyCode : "r".charCodeAt(0);
	// bind event
	element.addEventListener('keypress', function(event){
		// if not our action key 
		if( event.keyCode !== keyCode )	return;
		// press switch
		this.pressSwitchUI(element);
	}.bind(this));
}

tQuery.WhammyRecorder.prototype.initDomControls	= function(container){
	var commandEl	= container.querySelector('.command');
	var statusEl	= container.querySelector('.status');
	var downloadEl	= container.querySelector('.download');
	commandEl.addEventListener('click', function(){
		console.log('text', commandEl.textContent)
		console.dir(commandEl)
		if( commandEl.textContent === 'Start' ){
			recorder.start();
			commandEl.textContent	= 'Stop';
			statusEl.textContent	= 'Recording';
		}else if( commandEl.textContent === 'Stop' ){
			var timeBefore	= Date.now();

			recorder.stop();
			var url		= recorder.finalizedURL();

			var timeAfter	= Date.now();

			downloadEl.href	= url;
			downloadEl.style.display	= ''

			commandEl.textContent	= 'Start';

			var statusText	= "Compiled Video in " + (timeAfter - timeBefore) + "ms"
			statusText	+= "- file size: " + Math.ceil(this._output.size / 1024) + "KB";
			statusEl.innerHTML	= statusText;
		}
	}.bind(this));
}




