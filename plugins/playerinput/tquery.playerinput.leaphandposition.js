//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('LeapHandPosition', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts	= { playerInput: opts };
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		deltaXConvert	: function(value){ return value	},
		deltaYConvert	: function(value){ return value	},
		virtualJoystick	: {
			container	: document.body,
			mouseSupport	: false
		}
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	console.assert(opts.controller)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	// init joystick
	var joystick	= tQuery.createLeapJoystickHandPosition({
		controller	: opts.controller
	});
	this.addEventListener('destroy', function(){ joystick.destroy()	})
	this._joystick	= joystick;
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
tQuery.PlayerInput.LeapHandPosition.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.LeapHandPosition.prototype)

tQuery.PlayerInput.LeapHandPosition.prototype.joystick = function() {
	return this._joystick;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createLeapHandPosition', function(opts){
	return new tQuery.PlayerInput.LeapHandPosition(opts)
});
