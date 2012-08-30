define(['module', 'plugins/lensflare/tquery.lensflare'], function(module){
	// compute the absoute baseUrl for this file.js
	// TODO put baseUrl computation in a function shared by all
	var baseUrl	= location.pathname.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	// set baseUrl for this plugin
	tQuery.createLensFlare.baseUrl	= baseUrl+'../../../plugins/lensflare/';
});