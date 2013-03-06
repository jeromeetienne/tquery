//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('Keyboard', function(opts){
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
	this._world	= opts.world;
	// init input if needed
	var actions	= this._actions();
	if( input.right=== undefined )	input.right	= actions.right
	if( input.up   === undefined )	input.up  	= actions.up
	if( input.left === undefined )	input.left	= actions.left
	if( input.down === undefined )	input.down	= actions.down
	// init callback to update inputPlayer
	this._callback	= this._world.loop().hook(function(delta, now){
		var actions	= this._actions();
		if( actions.right !== input.right ){
			input.right	= actions.right;
			input.dispatchEvent('change', 'right', input.right)
		}
		if( actions.up !== input.up ){
			input.up	= actions.up;
			input.dispatchEvent('change', 'up', input.up)
		}
		if( actions.left !== input.left ){
			input.left	= actions.left;
			input.dispatchEvent('change', 'left', input.left)
		}
		if( actions.down !== input.down ){
			input.down	= actions.down;
			input.dispatchEvent('change', 'down', input.down)
		}
	}.bind(this));
});

/**
 * explicit destructor
 */
tQuery.PlayerInput.Keyboard.prototype.destroy	= function(){
	this._world.loop().unhook(this._callback)
	
	this._joystick.destroy()
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createKeyboard', function(opts){
	return new tQuery.PlayerInput.Keyboard(opts)
});

/**
 * return current actions based on keyboard.pressed
 * compatible with arrow, asdw 
 * @return {[type]} [description]
 */
tQuery.PlayerInput.Keyboard.prototype._actions = function() {
	var keyboard	= tQuery.keyboard();
	var actions	= {
		left	: keyboard.pressed("left")  || keyboard.pressed("a") || keyboard.pressed("q"),
		right	: keyboard.pressed("right") || keyboard.pressed("d"),
		up	: keyboard.pressed("up")    || keyboard.pressed("w") || keyboard.pressed("z"),
		down	: keyboard.pressed("down")  || keyboard.pressed("s"),
	};
	return actions
};

