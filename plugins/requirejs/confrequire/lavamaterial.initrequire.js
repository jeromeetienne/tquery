define(['module', 'plugins/lavamaterial/tquery.lavamaterial'], function(module){
	// set baseUrl for this plugin
	tQuery.Object3D.prototype.setLavaMaterial.baseUrl	= module.url+'/../../../lavamaterial/';
});