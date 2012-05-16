/**
 * 
*/
tQuery.register('Joystick', function(opts){
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		loop		: tQuery.world.loop(),
		keyStateRight	: "right",
		keyStateUp	: "up",
		keyStateLeft	: "left",
		keyStateDown	: "down",
		keyStateFire	: "space"
	});
	
	// to store the result
	this._controls	= {
		left	: false,
		right	: false,
		forward	: false,
		backward: false,
		fire	: false
	};
	
	//this._vJoystick	= new VirtualJoystick({
	//	mouseSupport	: true
	//})
	
	this._$loopCb	= this._loopCb.bind(this);
	this._opts.loop.hook(this._$loopCb);
});

tQuery.Joystick.prototype.destroy	= function(){
	this._opts.loop.unhook(this._$loopCb);	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Joystick.prototype.controls	= function(){
	return this._controls;
}

tQuery.Joystick.prototype.left	= function(){
	return this._controls.left;
}

tQuery.Joystick.prototype.right	= function(){
	return this._controls.right;
}

tQuery.Joystick.prototype.forward	= function(){
	return this._controls.forward;
}

tQuery.Joystick.prototype.backward	= function(){
	return this._controls.backward;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Joystick.prototype._loopCb	= function(){
	//this._updateDeviceOrientation();
	this._updateKeyboard();
	//this._updateVirtualJoystick();
}

tQuery.Joystick.prototype._updateVirtualJoystick	= function(){
	var vJoystick	= this._vJoystick;
	var controls	= this._controls;
	// device orientation handling
	controls.left		= vJoystick.left();
	controls.right		= vJoystick.right();
	controls.forward	= vJoystick.up();
	controls.backward	= vJoystick.down();
	controls.fire		= false;
}

tQuery.Joystick.prototype._updateDeviceOrientation	= function(){
	var dOrientation= tQuery.deviceOrientation();
	var controls	= this._controls;
	var isMacOSX	= navigator.userAgent.match(/Macintosh;/);
	var isIOS	= navigator.userAgent.match(/iPad;/) || navigator.userAgent.match(/iPhone;/);
	// config for macbook
	if( isIOS ){
		var angleLeftRight	= dOrientation.angleZ();		
		var angleFrontBack	= dOrientation.angleY();
	}else{
		var angleLeftRight	=  dOrientation.angleY();		
		var angleFrontBack	= -dOrientation.angleZ();
	}
// TODO make those delta tunable
	// device orientation handling
	controls.left		= (angleFrontBack * 180 / Math.PI) >  10.0;
	controls.right		= (angleFrontBack * 180 / Math.PI) < -10.0;
	controls.forward	= (angleLeftRight * 180 / Math.PI) < -10.0;
	controls.backward	= (angleLeftRight * 180 / Math.PI) > +10.0;
	controls.fire		= false;
}

tQuery.Joystick.prototype._updateKeyboard	= function(){
	var keyboard	= tQuery.keyboard();
	var controls	= this._controls;
	var opts	= this._opts;
	// keyboard handling
	controls.left		= keyboard.pressed(opts.keyStateLeft);
	controls.right		= keyboard.pressed(opts.keyStateRight);
	controls.forward	= keyboard.pressed(opts.keyStateUp);
	controls.backward	= keyboard.pressed(opts.keyStateDown);
	controls.fire		= keyboard.pressed(opts.keyStateFire);
}