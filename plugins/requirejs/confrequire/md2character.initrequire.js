define(['module', 'plugins/md2character/tquery.md2character.ratamahatta'], function(module){
	// compute the absoute baseUrl for this file.js
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.RatamahattaMD2Character.baseUrl	= baseUrl+'../../md2character/';
});