define(['module', 'plugins/planets/tquery.createplanet'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.createPlanet.baseUrl	= baseUrl+'../../planets/';
});