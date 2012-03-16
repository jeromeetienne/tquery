/**
 * tquery.js plugin to handle webaudio
*/
define(['examples/webaudio/threex.webaudio'], function(){
	var instance	= null;
	tQuery.World.register('webaudio', function(){		
		if( !instance )	instance = new tQuery.WebAudio();
		return instance;
	});

	tQuery.WebAudio	= function(){
		this._webaudio	= new THREEx.WebAudio();
	};
	
	tQuery.WebAudio.prototype.get	= function(){
		return this._webaudio;
	}

	// Proxy raw functions
	tQuery.WebAudio._rawFn2proxy	= ['context', 'volume'];
	tQuery.WebAudio._rawFn2proxy.forEach(function(fnName){
		tQuery.WebAudio.prototype[fnName]	= function(){
			return this._webaudio[fnName].apply(this._webaudio, arguments)
		};
	});

	// Proxy chained functions
	tQuery.WebAudio._chainedFn2proxy	= [];
	tQuery.WebAudio._chainedFn2proxy.forEach(function(fnName){
		tQuery.WebAudio.prototype[fnName]	= function(){
			this._webaudio[fnName].apply(this._webaudio, arguments)
			return this;	// for chained API 
		};
	});
});
