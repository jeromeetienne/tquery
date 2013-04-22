//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('Keyboard', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts	= {playerInput: opts};
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	// init callback to update input
	function onUpdate(){
		var keyboard	= tQuery.keyboard();
		var actions	= {
			left	: keyboard.pressed("left")  || keyboard.pressed("a") || keyboard.pressed("q"),
			right	: keyboard.pressed("right") || keyboard.pressed("d"),
			up	: keyboard.pressed("up")    || keyboard.pressed("w") || keyboard.pressed("z"),
			down	: keyboard.pressed("down")  || keyboard.pressed("s")
		};
		if( actions.left )	input.left	= true;
		if( actions.right )	input.right	= true;
		if( actions.up )	input.up	= true;
		if( actions.down )	input.down	= true;
	}
	// initial update
	onUpdate();
	// hook rendering loop
	world.hook(onUpdate);
	this.addEventListener('destroy', function(){ world.unhook(callback)	});
});

/**
 * explicit destructor
 */
tQuery.PlayerInput.Keyboard.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.Keyboard.prototype)

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createKeyboard', function(opts){
	return new tQuery.PlayerInput.Keyboard(opts)
});
