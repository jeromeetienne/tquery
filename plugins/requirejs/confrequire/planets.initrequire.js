define(['module', 'plugins/planets/tquery.createplanet'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.createPlanet.baseUrl	= baseUrl+'../../planets/';
});