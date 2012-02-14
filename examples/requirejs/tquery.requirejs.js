/**
 * export tQuery as requirejs module
*/
(function(){
	// trick to get the baseurl of the <script> loading moduleName.js
	var scriptBaseUrl	= function(moduleName){
		console.assert(moduleName !== undefined, "moduleName MUST be defined");
		var filename	= moduleName+".js";
		var scriptUrl	= document.querySelector('script[src$="'+filename+'"]').src;
		var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
		return baseUrl;
	};

	// wrapper on top of requirejs define (to better handle locality)
	// NOTE: im not sure it is the best solution
	// - if the dependancy starts with "./" or "../", make the path relative to <script> src location
	// - This is a common problem, it would be surprising not to have a clean answer
	var tQueryDefine	= function(moduleName, dependancies, callback){
		// get baseUrl for this module name 
		var baseUrl	= scriptBaseUrl(moduleName);
		// prepend baseUrl to any dependancy starting with './' or '../' 
		dependancies	= dependancies.map(function(item){
			var toPrefix	= item.match(/^\.\//) || item.match(/^\.\.\//);
			var result	= toPrefix ? baseUrl+item : item;
			return result;
		})
		// actually call requirejs define
		define(moduleName, dependancies, callback);
	};
	// sanity check 
	console.assert( window.tQuery === undefined );
	// do a fake tQuery.define() before tQuery is actually loaded
	window.tQuery	= { define: tQueryDefine };

	// define tquery module 
	define('tquery', ["../../build/tquery-bundle.js"], function(){

		/**
		 * define a module for tQuery (using requirejs)
		*/
		tQuery.register('define', tQueryDefine);

		/**
		 * @return the base url of the <script> loading moduleName.js
		*/
		tQuery.register('scriptBaseUrl', scriptBaseUrl);
		
		// return the object itself
		return tQuery;
	});
})();