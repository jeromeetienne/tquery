tQuery.registerStatic('createWhammy', function(opts){
	return new tQuery.Whammy(opts);
});
/**
 * Create tQuery.Scene
*/
tQuery.registerStatic('Whammy', function(opts){
	this._opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		fps	: 15
	});

	this._encoder	= new Whammy.Video(this._opts.fps);
	this._callback	= null;
	this._output	= null;
});

tQuery.Whammy.baseUrl	= "../../../plugins/whammy/";

// make it eventable
tQuery.MicroeventMixin(tQuery.Whammy.prototype);

// make it pluginable at instance level
tQuery.pluginsInstanceOn(tQuery.Whammy);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Whammy.prototype.start	= function(){
	var canvas	= this._opts.world.tRenderer().domElement;
	this._callback	= function(){
		this._encoder.add(canvas);
	}.bind(this);
	this._opts.world.loop().hook(this._callback);
	return this;	// for chained API
}

tQuery.Whammy.prototype.isRecording	= function(){
	return this._callback ? true : false;
}

tQuery.Whammy.prototype.stop	= function(){
	if( this.isRecording() === false )	return;
	this._output	= this._encoder.compile();
	this._opts.world.loop().unhook(this._callback);
	this._callback	= null;
	return this;	// for chained API
}

tQuery.Whammy.prototype.finalizedURL	= function(){
	var output	= this._output;
	var url		= (window.webkitURL || window.URL).createObjectURL(output);
	return url;
};

tQuery.Whammy.prototype.output	= function(){
	return this._output;
};


tQuery.Whammy.prototype.pressSwitch	= function(){
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
