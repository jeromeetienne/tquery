// TODO make it require.js compatible

tQuery.RatamahattaMD2Character.register('hookKeyboard', function(opts){
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
});

tQuery.RatamahattaMD2Character.register('unhookKeyboard', function(opts){
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
});

tQuery.RatamahattaMD2Character.register('hookKeyboardLoopCb', function(deltaTime, present){
	var keyboard	= tQuery.keyboard();
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