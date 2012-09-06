define(['module', 'plugins/grassground/tquery.grassground'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.createGrassGround.baseUrl	= baseUrl+'../../grassground/';
});