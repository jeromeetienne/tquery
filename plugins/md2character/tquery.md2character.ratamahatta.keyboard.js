// TODO make it require.js compatible

/**
 * Hook the keyboard
 *
 * @name	hookKeyboard
 * @memberOf	tQuery.RatamahattaMD2Character
*/
tQuery.RatamahattaMD2Character.registerInstance('hookKeyboard', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// create the loop callback
	var loopCb	= this.hookKeyboardLoopCb.bind(this);
	// store the loopCb
	tQuery.data(this, 'hookKeyboardLoopCb', loopCb, true);
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
tQuery.RatamahattaMD2Character.registerInstance('unhookKeyboard', function(opts){
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
tQuery.RatamahattaMD2Character.registerInstance('hookKeyboardLoopCb', function(){
	var keyboard	= tQuery.keyboard();
	var character	= this;
	// keyboard handling
	if( keyboard.pressed("left") )	character.turnLeft();
	if( keyboard.pressed("right") )	character.turnRight();
	if( keyboard.pressed("up") )	character.goForward();

	// handle the animation
	if( keyboard.pressed("up") ){
		if( character.animation() !== 'run' ) character.animation('run')
	}else if( character.animation() === 'run' ){
		if( character.animation !== 'stand' ) character.animation('stand')
	}
});