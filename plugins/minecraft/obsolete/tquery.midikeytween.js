tQuery.registerStatic('MidiKeyTween', function(opts){
	opts	= this._opts	= tQuery.extend(opts, {
		attackTime	: 2,
		releaseTime	: 2
	});
	
	this._lastStart	= Date.now()/1000 - (opts.attackTime + opts.releaseTime);
	this._lastStop	= Date.now()/1000 - (opts.attackTime + opts.releaseTime);
});


tQuery.MidiKeyTween.prototype.press	= function(){
	// if already press, do nothing
	var state	= this.state();
	if( state === 'attacking' )	return;
	if( state === 'playing' )	return;
	// update this._lastStart
	this._lastStart	= Date.now()/1000;
};

tQuery.MidiKeyTween.prototype.release	= function(){
	// if already release, do nothing
	var state	= this.state();
	if( state === 'releasing' )	return;
	if( state === 'silent' )	return;
	// update this._lastStop
	this._lastStop	= Date.now()/1000;	
};

tQuery.MidiKeyTween.prototype.value	= function(){
	var now		= Date.now()/1000;
	var opts	= this._opts;
	if( this._lastStart <= this._lastStop ){
		if( now - this._lastStop < opts.releaseTime ){
			return (now - this._lastStop) / opts.releaseTime;
		}else{
			return 0;			
		}
	}else{
		console.assert( this._lastStart > this._lastStop );
		if( now - this._lastStart < opts.attackTime ){
			return (now - this._lastStart) / opts.attackTime;
		}else{
			return 1;			
		}		
	}
};

tQuery.MidiKeyTween.prototype.state	= function(){
	var now		= Date.now()/1000;
	var opts	= this._opts;

	if( this._lastStart > this._lastStop ){
		console.assert( this._lastStart > this._lastStop );
		if( now - this._lastStart < opts.attackTime ){
			return 'attacking';
		}else{
			return 'playing';
		}
	}else{
		if( now - this._lastStop < opts.releaseTime ){
			return 'releasing';
		}else{
			return 'silent';
		}
	}
};


