//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('DeviceOrientation', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts	= { playerInput: opts };
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		deltaXConvert	: function(value){ return Math.tan(value*4.5)	},
		deltaYConvert	: function(value){ return Math.tan(value*4.5)	},
		angleEpsilon	: 0.1,
		angleThreshold	: 10*Math.PI/180,
		world		: tQuery.world
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	var epsilon	= opts.angleEpsilon;
	var threshold	= opts.angleThreshold;
	// init joystick
	var orientation	= tQuery.deviceOrientation();
	this.addEventListener('destroy', function(){ orientation.destroy();	})
	// init callback to update input
	function onUpdate(){
		if( orientation.angleY() < -threshold )	input.up	= true;
		if( orientation.angleY() > +threshold )	input.down	= true;
		if( orientation.angleZ() < -threshold )	input.left	= true;
		if( orientation.angleZ() > +threshold )	input.right	= true;

		if( Math.abs(orientation.angleZ()) > epsilon )	input.deltaX = opts.deltaXConvert( orientation.angleZ() )
		if( Math.abs(orientation.angleY()) > epsilon )	input.deltaY = opts.deltaYConvert( orientation.angleY() )
	}
	// initial update
	onUpdate();
	// hook rendering loop
	world.hook(onUpdate);
	this.addEventListener('destroy', function(){ world.unhook(callback)	});
});

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.DeviceOrientation.prototype)

/**
 * explicit destructor
 */
tQuery.PlayerInput.DeviceOrientation.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createDeviceOrientation', function(opts){
	return new tQuery.PlayerInput.DeviceOrientation(opts)
});
