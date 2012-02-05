/**
 * export tQuery as requirejs module
*/
(function(){
	
	define('tquery', ["../../build/tquery-bundle.js"], function(){
		//tQuery.register('define', define);
		//tQuery.register('require', require);
		return tQuery;
	});

	define(['module'], function(module){
		console.log(module.id);
		console.log(module.uri);
	});
	return;


	// get the url from the <script src=""> loading this file
	var scriptUrl	= document.scripts[document.scripts.length-1].src;
	var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
})();