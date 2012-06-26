/**
 * plugin to handle deviceOrientation API
*/
(function(){
	var instance	= null;
	tQuery.register('deviceOrientation', function(){
		if( !instance )	instance = new THREEx.DeviceOrientationState();
		return instance;
	});	
})();
