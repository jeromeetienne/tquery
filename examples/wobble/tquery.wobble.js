//////////////////////////////////////////////////////////////////////////////////
//		tQuery.Animation						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Animation	= function(){
	this._attachedLoop	= null;
}

tQuery.Animation.prototype.destroy	= function(){
	if( this.isRunning() )	this.stop();
}

tQuery.Animation.prototype.isRunning	= function(){
	return this._attachedLoop ? true : false;
}

tQuery.Animation.prototype.start	= function(loop){
	console.assert(this.isRunning() === false);

	this._attachedLoop	= loop;
	this._loopCallback	= function(){
		this.update();
	}.bind(this);

	loop.hook(this._loopCallback);

	return this;	// for chained API
}

tQuery.Animation.prototype.stop	= function(){
	if(this.isRunning() === false)	return this;

	var loop		= this._attachedLoop;
	loop.hook(this._loopCallback);
	this._attachedLoop	= null;
	this._loopCallback	= null;

	return this;	// for chained API
}

tQuery.Animation.prototype.update	= function(){
	console.log("dummy update function");
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.WobbleAnimation	= function(){
	// call parent ctor
	tQuery.WobbleAnimation.parent.constructor.call(this)
}

tQuery.WobbleAnimation.prototype.destroy	= function(){
	// call parent dtor
	tQuery.WobbleAnimation.parent.destroy();
}

/**
 * inherit from tQuery.Animation
*/
tQuery.inherit(tQuery.WobbleAnimation, tQuery.Animation);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('wobble', function(){
	this.each(function(geometry){
		THREEx.GeometryWobble.init(geometry);
		THREEx.GeometryWobble.cpuAxis(geometry, 'x', 4);

		tQuery.world.loop().hook(function(delta, present){
			var piSecond	= present * Math.PI;
			var phase	= 200 * piSecond / 180;
			var magnitude	= 0.25;
			THREEx.GeometryWobble.Animate(geometry, phase, magnitude);
		});
	});
	// for chained API
	return this;
});	
