/**
 * Hook the keyboard
 *
 * @name	hookKeyboard
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('hookKeyboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// create the loop callback
	var loopCb	= this.hookKeyboardLoopCb.bind(this);
	// store the loopCb
	tQuery.data(this, 'keyboard', loopCb, true);
	// hook the callback
	opts.loop.hook(loopCb);
	// for chained API
	return this;
});

/**
 * unhook the keyboard
 *
 * @name	unhookKeyboard
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('unhookKeyboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// fetch loopCb
	var loopCb	= tQuery.data(this, 'hookKeyboardLoopCb');
	// unstore loopCb
	tQuery.removeData(this, 'hookKeyboardLoopCb');
	// unhook the callback
	opts.loop.unhook(loopCb);
	// for chained API
	return this;
});

/**
 * callback for hook the keyboard
 * 
 * @private
 * @name	hookKeyboardLoopCb
 * @memberOf	tQuery.Car
*/
tQuery.Car.register('hookKeyboardLoopCb', function(deltaTime, present){
	var keyboard	= tQuery.keyboard();
	// keyboard handling
	this.controls().moveLeft	= keyboard.pressed("left");
	this.controls().moveRight	= keyboard.pressed("right");
	this.controls().moveForward	= keyboard.pressed("up");
	this.controls().moveBackward	= keyboard.pressed("down");
});