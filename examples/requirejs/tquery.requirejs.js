/**
 * export tQuery as requirejs module
*/
(function(){

	var getScriptUrl	= function(filename){
		var scriptUrl	= document.querySelector('script[src$="'+filename+'"]').src;
		var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
		//console.log("baseurl", baseUrl);
		return baseUrl;
	};
	
	var tQueryDefine	= function(moduleName, dependancies, callback){
		var baseUrl	= getScriptUrl(moduleName+".js");
		dependancies	= dependancies.map(function(item){
			//console.log("item", item, baseUrl, item.match(/^\./))
			var result;
			if( item.match(/^\./) )	result	= baseUrl + item;
			else			result	= item;
			//console.log("item result", result)
			return result;
		})
		// TODO pass baseUrl to the callback
		// first param, all the rest are the one passed by requirejs
		
		//console.log("DDDbaseUrl", moduleName, baseUrl, dependancies)
		define(moduleName, dependancies, callback);
	};

	window.tQuery	= { define: tQueryDefine };

	define('tquery', ["../../build/tquery-bundle.js"], function(){
		
		tQuery.define	= tQueryDefine;
		return tQuery;
	});

	//define(['module'], function(module){
	//	console.log(module.id);
	//	console.log(module.uri);
	//});
	return;


	// get the url from the <script src=""> loading this file
	var scriptUrl	= document.scripts[document.scripts.length-1].src;
	var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
})();