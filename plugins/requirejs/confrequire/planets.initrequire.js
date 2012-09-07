define(['module', 'plugins/planets/tquery.createplanet'], function(module){
console.log('createplanet..........')
console.dir(module)
	// compute the absoute baseUrl for this file.js
	var baseUrl	= module.uri.replace(/[^/]*$/, '');
console.log('baseUrl', baseUrl)
	// set baseUrl for this plugin
	tQuery.createPlanet.baseUrl	= baseUrl+'../../planets/';
console.log('tQuery.createPlanet.baseUrl', tQuery.createPlanet.baseUrl)
});