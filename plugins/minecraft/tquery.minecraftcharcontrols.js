tQuery.registerStatic('MinecraftCharControls', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.MinecraftChar )	opts	= { object3D: opts.object3D() };
	if( opts instanceof THREE.Object3D )		opts	= { object3D: opts };
	if( opts instanceof tQuery.Object3D )		opts	= { object3D: opts.get(0) };
	if( opts.object3D instanceof tQuery.Object3D )	opts.object3D	= opts.object3D.get(0)
	// handle arguments default values
	this._opts	= opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		speed		: 2,
		lateralMove	: 'rotationY'
	});
	// arguments sanity check
	console.assert( opts.object3D instanceof THREE.Object3D )
	console.assert( ['strafe', 'rotationY'].indexOf(opts.lateralMove) !== -1 );
	
	// user control
	this._input	= {};
	this._callback	= opts.world.hook(function(delta, now){
		var model	= opts.object3D;
		var prevPosition= model.position.clone();
		var input	= this._input;
		// keyboard handling		
		if( opts.lateralMove === 'rotationY' ){
			// lateral => rotation Y
			if( input.left )	model.rotation.y += 0.1 * delta * Math.PI * 2;
			if( input.right )	model.rotation.y -= 0.1 * delta * Math.PI * 2;			
		}else if( opts.lateralMove === 'strafe' ){
			// lateral => strafe
			var distance	= 0;
			if( input.left )	distance	= +2 * delta;
			if( input.right )	distance	= -2 * delta;
			if( distance ){
				var speed	= new THREE.Vector3(distance, 0, 0);
				var matrix	= new THREE.Matrix4().makeRotationY(model.rotation.y);
				speed.applyMatrix4( matrix );
				model.position.add(speed);
			}			
		}else	console.assert(false, 'opts.lateralMove invalid: '+opts.lateralMove);

		var distance	= 0;
		if( input.up )		distance	= +opts.speed * delta;
		if( input.down )	distance	= -opts.speed * delta;
		if( distance ){
			var speed	= new THREE.Vector3(0, 0, distance);
			var matrix	= new THREE.Matrix4().makeRotationY(model.rotation.y);
			speed.applyMatrix4( matrix );
			model.position.add(speed);
		}
		// notify an event of the update
		this.dispatchEvent('postUpdate', model.position, prevPosition);
	}.bind(this));
});

// make it eventable
tQuery.MicroeventMixin(tQuery.MinecraftCharControls.prototype);

tQuery.MinecraftCharControls.prototype.destroy	= function(){
	this._opts.world.unhook(this._callback);
}

tQuery.MinecraftCharControls.prototype.opts = function() {
	return this._opts;
};

tQuery.registerStatic('createMinecraftCharControls', function(opts){
	return new tQuery.MinecraftCharControls(opts)
});

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MinecraftCharControls.prototype.input	= function(value){
	if( value === undefined )	return this._input;
	this._input	= value;
	return this;	// for chained API
};

