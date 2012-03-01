/**
 * tquery.js plugin to handle keyboard
*/
define(['module', 'tquery', '/vendor/threex/THREEx.KeyboardState.js'], function(module){
	var scriptBaseUrl	= tQuery.scriptBaseUrl(module);
	console.log("scriptBaseUrl", scriptBaseUrl);
	
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});		
});
