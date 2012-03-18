

tQuery.World.register('addWebAudio', function(){
	// sanity check
	console.assert( this.hasWebAudio() === false, "there is already a webaudio" );
	// intenciate a tQuery.World.WebAudio
	var webaudio	= new tQuery.WebAudio();
	// store webaudio in the world
	tQuery.data(this, "webaudio", webaudio);
	// for chained API
	return this;
});

tQuery.World.register('getWebAudio', function(){
	var webaudio	= tQuery.data(this, "webaudio");
	return webaudio;
});

tQuery.World.register('hasWebAudio', function(){
	var webaudio	= tQuery.data(this, "webaudio");
	return webaudio ? true : false;
});

tQuery.World.register('removeWebAudio', function(){
	if( this.hasWebAudio() === false )	return this;
	var webaudio	= tQuery.data(this, "webaudio");
	webaudio.destroy();
	return this;	// for chained API
});

