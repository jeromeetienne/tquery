/**
 * Get the script base url from inside the script itself
 * https://github.com/jrburke/requirejs/wiki/Differences-between-the-simplified-CommonJS-wrapper-and-standard-AMD-define#wiki-module
 *
 * @param {Object} module is the magic module from requirejs
 * @returns {string} the base url
*/
tQuery.register('scriptBaseUrl', function(module){
	// paramter sanity check 
	console.assert( Object.keys(module).length === 3 );
	console.assert( module.id !== undefined && module.uri !== undefined );
	// determine the baseUrl
	var baseUrl	= location.protocol + "//" + location.host + location.pathname + module.uri;
	baseUrl		= baseUrl.substr(0, baseUrl.lastIndexOf('/')+1);
	return baseUrl;
});
