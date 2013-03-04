//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('VirtualJoystick', function(opts){
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
	// init joystick
	this._joystick	= new VirtualJoystick({
		container	: document.body,
		mouseSupport	: true
	});
	// init input if needed
	if( input.right=== undefined )	input.right	= this._joystick.right()
	if( input.up   === undefined )	input.up  	= this._joystick.up()  
	if( input.left === undefined )	input.left	= this._joystick.left()
	if( input.down === undefined )	input.down	= this._joystick.down()
	// init callback to update input
	this._callback	= this._world.loop().hook(function(delta, now){
		if( this._joystick.right() !== input.right ){
			input.right	= this._joystick.right();
			input.dispatchEvent('change', 'right', input.right)
		}
		if( this._joystick.up() !== input.up ){
			input.up	= this._joystick.up();
			input.dispatchEvent('change', 'up', input.up)
		}
		if( this._joystick.left() !== input.left ){
			input.left	= this._joystick.left();
			input.dispatchEvent('change', 'left', input.left)
		}
		if( this._joystick.down() !== input.down ){
			input.down	= this._joystick.down();
			input.dispatchEvent('change', 'down', input.down)
		}
	}.bind(this));
});

/**
 * explicit destructor
 */
tQuery.PlayerInput.VirtualJoystick.prototype.destroy	= function(){
	this._world.loop().unhook(this._callback)
	
	this._joystick.destroy()
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createVirtualJoystick', function(opts){
	return new tQuery.PlayerInput.VirtualJoystick(opts)
});
