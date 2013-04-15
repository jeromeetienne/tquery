//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('DeviceOrientation', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts.playerInput = opts;
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	// init joystick
	var orientation	= tQuery.deviceOrientation();
	this.addEventListener('destroy', function(){
		orientation.destroy();
	})
	// init callback to update input
	var threshold	= 10*Math.PI/180;
	var callback	= world.hook(function(delta, now){
		if( orientation.angleY() < -threshold ){
			input.up	= true;
			input.dispatchEvent('change', 'up', input.up)
		}
		if( orientation.angleY() > +threshold ){
			input.down	= true;
			input.dispatchEvent('change', 'down', input.down)
		}
		if( orientation.angleZ() < -threshold ){
			input.left	= true;
			input.dispatchEvent('change', 'left', input.left)
		}
		if( orientation.angleZ() > +threshold ){
			input.right	= true;
			input.dispatchEvent('change', 'right', input.right)
		}
	}.bind(this));
	this.addEventListener('destroy', function(){
		world.unhook(callback)
	})
});

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.DeviceOrientation.prototype)

/**
 * explicit destructor
 */
tQuery.PlayerInput.DeviceOrientation.prototype.destroy	= function(){
	this.dispatchEvent('destroy')
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createDeviceOrientation', function(opts){
	return new tQuery.PlayerInput.DeviceOrientation(opts)
});
