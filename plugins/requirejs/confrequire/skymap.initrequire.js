define(['module', 'plugins/skymap/tquery.cubetexture'], function(module){
	// set baseUrl for this plugin
	tQuery.TextureCube.baseUrl	= module.uri+'/../../../skymap/';
	// reinit wellKnownUrls
	tQuery.TextureCube.initWellKnownUrls();
});