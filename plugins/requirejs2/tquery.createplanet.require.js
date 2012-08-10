define(['module', 'plugins/planets/tquery.createplanet'], function(module){
	var baseUrl	= location.href.replace(/[^/]*$/, '')
			+ module.uri.replace(/[^/]*$/, '');
	//console.log('baseUrl', baseUrl)
	tQuery.createPlanet.baseUrl	= baseUrl+'../planets/';
});