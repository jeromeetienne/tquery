/**
 * plugin to handle deviceOrientation API
*/
define(['threex/THREEx.DeviceOrientationState'], function(){
	var instance	= null;
	tQuery.register('deviceOrientation', function(){
		if( !instance )	instance = new THREEx.DeviceOrientationState();
		return instance;
	});	
});
