/**
 * experiment on possible tQuery api on top of threex sounds
 * - how tQuery could provide a better API than threex ?
*/

tQuery.register('createSound', function(webaudio){
	return new tQuery.Sound(webaudio);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.register('Sound', function(world){
	this._world	= world	|| tQuery.world;
	
	var webaudio	= this._world.webaudio();
	this._sound	= new THREEx.WebAudio.Sound(webaudio.get())
	this._object3d	= null;
	
	this._loopCb	= function(deltaTime, present){
		if( !this._object3d === null )	return;
		this._sound.updateWithObject3d(this._object3d, deltaTime)
	}.bind(this);
});

tQuery.Sound.prototype.destroy	= function(){
	world.loop().unhook(this._loopCb);
	this.unhook()
};
	
tQuery.Sound.prototype.hook	= function(object3d){
	console.assert( object3d instanceof THREE.Object3D );
	this._object3d = object3d;
};

tQuery.Sound.prototype.unhook	= function(){
	this._object3d = null;
};

tQuery.Sound.prototype.nodes	= function(){
	return this._sound.chain().nodes();
};

tQuery.Sound._rawFn2proxy	= ['chain', 'isPlayable', 'play', 'stop', 'load', 'volume', 'pannerCone'];
tQuery.Sound._rawFn2proxy.forEach(function(fnName){
	tQuery.Sound.prototype[fnName]	= function(){
		return this._sound[fnName].apply(this._sound, arguments)
	};
});

tQuery.Sound._chainedFn2proxy	= ['isPlayable', 'play', 'stop', 'load', 'volume', 'pannerCone'];
tQuery.Sound._chainedFn2proxy.forEach(function(fnName){
	tQuery.Sound.prototype[fnName]	= function(){
		this._sound[fnName].apply(this._sound, arguments)
		return this;	// for chained API 
	};
});

//var sound	= tQuery.createSound();
//
//sound.load(url)
//
//sound.attachTo(object3d);
//sound.dettachFrom(object3d);

// TODO make a tQuery.webaudio which does
// world.loop().hook(function(deltaTime){
//	webaudio.updateListener(world.camera(), deltaTime)
// });

// TODO make a tQuery.sounds
// var sound = tQuery.createSound()
// sound.bind( object3d )
// sound.unbind( object3d )
