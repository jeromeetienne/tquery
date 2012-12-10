tQuery.registerStatic('createMinecraftCharKeyboard2', function(opts){
	return new tQuery.MinecraftCharKeyboard2(opts)
});

tQuery.registerStatic('MinecraftCharKeyboard2', function(opts){
	// handle polymorphism
	if( opts instanceof THREE.Object3D )	opts	= { object3D: opts };
	if( opts instanceof tQuery.Object3D )	opts	= { object3D: opts.get(0) };
	if( opts.object3D instanceof tQuery.Object3D )	opts.object3D	= opts.object3D.get(0)
	// handle default values
	opts		= this._opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		lateralMove	: 'strafe'
	});
	// sanity check
	console.assert( opts.object3D instanceof THREE.Object3D )
	console.assert( ['strafe', 'rotationY'].indexOf(opts.lateralMove) !== -1 );
	
	// init some variable
	var midiKey	= new tQuery.MidiKeyTween();
	// just debug
	// world.loop().hook(function(delta, now){
	// 	console.log("state", midiKey.state(), 'value', midiKey.value())
	// });
	// user control
	this._$onLoop	= opts.world.loop().hook(function(delta, now){
		var keyboard	= tQuery.keyboard();
		var model	= opts.object3D;
		var prevPosition= model.position.clone();
		var action	= {
			left	: keyboard.pressed("left")  || keyboard.pressed("a") || keyboard.pressed("a"),
			right	: keyboard.pressed("right") || keyboard.pressed("d"),
			up	: keyboard.pressed("up")    || keyboard.pressed("w") || keyboard.pressed("z"),
			down	: keyboard.pressed("down")  || keyboard.pressed("s"),
		};
		// keyboard handling		
		if( opts.lateralMove === 'rotationY' ){
			// lateral => rotation Y
			if( action.left )	model.rotation.y += 0.3 * delta * Math.PI * 2;
			if( action.right )	model.rotation.y -= 0.3 * delta * Math.PI * 2;			
		}else if( opts.lateralMove === 'strafe' ){
			// lateral => strafe
			var distance	= 0;
			if( action.left )	distance	= +2 * delta;
			if( action.right )	distance	= -2 * delta;
			if( distance ){
				var speed	= new THREE.Vector3(distance, 0, 0);
				var matrix	= new THREE.Matrix4().makeRotationY(model.rotation.y);
				matrix.multiplyVector3(speed);
				model.position.addSelf(speed);
			}			
		}else	console.assert(false, 'opts.lateralMove invalid: '+opts.lateralMove);

		var distance	= 0;
		if( action.up )		distance	= +2 * delta;
		if( action.down )	distance	= -2 * delta;
		if( distance ){
			var speed	= new THREE.Vector3(0, 0, distance);
			var matrix	= new THREE.Matrix4().makeRotationY(model.rotation.y);
			matrix.multiplyVector3(speed);
			model.position.addSelf(speed);
		}
		// notify an event of the update
		this.dispatchEvent('postUpdate', model.position, prevPosition);
	}.bind(this));
});

// make it eventable
tQuery.MicroeventMixin(tQuery.MinecraftCharKeyboard2.prototype);

tQuery.MinecraftCharKeyboard2.prototype.destroy	= function(){
	opts.world.loop().unhook(this._$onLoop);
}

tQuery.MinecraftCharKeyboard2.prototype.opts	= function(){
	return this._opts;
}

