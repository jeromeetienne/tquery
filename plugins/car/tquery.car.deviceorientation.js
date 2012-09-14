/**
 * Hook the keyboard
 *
 * @name	hookDeviceOrientation
 * @memberOf	tQuery.Car
*/
tQuery.Car.registerInstance('hookDeviceOrientation', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop		: tQuery.world.loop()
	});
	// create the loop callback
	var loopCb	= this.hookDeviceOrientationLoopCb.bind(this);
	// store the loopCb
	tQuery.data(this, 'deviceOrientation', {
		loopCb	: loopCb
	}, true);
	// hook the callback
	opts.loop.hook(loopCb);
	// for chained API
	return this;
});

/**
 * unhook the keyboard
 *
 * @name	unhookDeviceOrientation
 * @memberOf	tQuery.Car
*/
tQuery.Car.registerInstance('unhookDeviceOrientation', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	// fetch data
	var data	= tQuery.data(this, 'deviceOrientation');
	// unstore loopCb
	tQuery.removeData(this, 'deviceOrientation');
	// unhook the callback
	opts.loop.unhook(data.loopCb);
	// for chained API
	return this;
});

/**
 * callback for hook the keyboard
 * 
 * @private 
 * @name	hookDeviceOrientationLoopCb
 * @memberOf	tQuery.Car
*/
tQuery.Car.registerInstance('hookDeviceOrientationLoopCb', function(deltaTime, present){
	var data	= tQuery.data(this, 'deviceOrientation');
	var opts	= data.opts;
	var dOrientation= tQuery.deviceOrientation();
	// device orientation handling
	this.controls().moveLeft	= (dOrientation.angleY() * 180 / Math.PI) > ( 10.0 + 0);
	this.controls().moveRight	= (dOrientation.angleY() * 180 / Math.PI) < (-10.0 + 0);
	this.controls().moveForward	= (dOrientation.angleZ() * 180 / Math.PI) < (-10.0 + 0);
	this.controls().moveBackward	= (dOrientation.angleZ() * 180 / Math.PI) > (+10.0 + 0);
	this.flareVisible(['backA', 'backB']	, this.controls().moveBackward );
	this.flareVisible(['frontA', 'frontB']	, false );
});