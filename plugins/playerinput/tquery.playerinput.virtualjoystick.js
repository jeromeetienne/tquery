//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('VirtualJoystick', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts	= { playerInput: opts };
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		deltaXConvert	: function(value){ return value * 8/window.innerWidth  },
		deltaYConvert	: function(value){ return value * 8/window.innerHeight },
		virtualJoystick	: {
			container	: document.body,
			mouseSupport	: false
		}
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	// init joystick
	var joystick	= new VirtualJoystick(opts.virtualJoystick);
	this.addEventListener('destroy', function(){ joystick.destroy()	})
	// initial call
	onUpdate();
	// init callback to update input
	world.hook(onUpdate);
	this.addEventListener('destroy', function(){ world.unhook(onUpdate)	})
	// onUpdate function
	function onUpdate(){
		if( joystick.left() )	input.left	= joystick.left();
		if( joystick.right() )	input.right	= joystick.right();
		if( joystick.up() )	input.up	= joystick.up();
		if( joystick.down() )	input.down	= joystick.down();
		
		if( joystick.deltaX() )	input.deltaX	= opts.deltaXConvert( joystick.deltaX() );
		if( joystick.deltaY() )	input.deltaY	= opts.deltaYConvert( joystick.deltaY() );
	}
});

/**
 * explicit destructor
 */
tQuery.PlayerInput.VirtualJoystick.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.VirtualJoystick.prototype)

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createVirtualJoystick', function(opts){
	return new tQuery.PlayerInput.VirtualJoystick(opts)
});
