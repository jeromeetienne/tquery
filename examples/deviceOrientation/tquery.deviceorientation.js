/**
 * plugin to handle deviceOrientation API
*/
define(['/vendor/threex/THREEx.DeviceOrientationState.js'], function(){
	var instance	= null;
	tQuery.register('deviceOrientation', function(){
		if( !instance )	instance = new THREEx.DeviceOrientationState();
		return instance;
	});	
});
