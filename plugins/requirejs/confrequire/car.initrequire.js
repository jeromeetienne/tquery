define(['module', 'plugins/car/tquery.car'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.Car.baseUrl	= baseUrl+'../../car/';
});