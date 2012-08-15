define(['module', 'plugins/lavamaterial/tquery.lavamaterial'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.Object3D.prototype.useLavaMaterial.baseUrl	= baseUrl+'../../lavamaterial/';
});