// TODO make it require.js compatible

/**
 * Hook the keyboard
 *
 * @name	hookKeyboard
 * @memberOf	tQuery.RatamahattaMD2Character
*/
tQuery.MinecraftChar.register('hookKeyboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// create the loop callback
	var loopCb	= this.hookKeyboardLoopCb.bind(this);
	// store the loopCb
	tQuery.data(this, 'hookKeyboardLoopCb', {
		loopCb	: loopCb,
		rotation: tQuery.createVector3(),
		position: tQuery.createVector3()
	}, true);
	// hook the callback
	opts.loop.hook(loopCb);
	// for chained API
	return this;
});

/**
 * unhook the keyboard
 *
 * @name	unhookKeyboard
 * @memberOf	tQuery.RatamahattaMD2Character
*/
tQuery.MinecraftChar.register('unhookKeyboard', function(opts){
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
 * @memberOf	tQuery.RatamahattaMD2Character
*/
tQuery.MinecraftChar.register('hookKeyboardLoopCb', function(delta, now){
	var keyboard	= tQuery.keyboard();
	var model	= this.model;
	// keyboard handling
	if( keyboard.pressed("left") )	model.translateX(-4*delta);
	if( keyboard.pressed("right") )	model.translateX(+4*delta);
	if( keyboard.pressed("up") )	model.translateY(+4*delta);
	if( keyboard.pressed("down") )	model.translateY(-4*delta);
});