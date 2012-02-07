/**
 * tquery.js plugin to handle keyboard
*/

var getBaseUrl	= function(filename){
	//var scriptUrl	= document.scripts[document.scripts.length-1].src;
	var scriptUrl	= document.querySelector('script[src$="'+filename+'"]').src;
	var baseUrl	= scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1);
	console.log("baseurl", baseUrl);
	return baseUrl;
}

var baseurl	= getBaseUrl('tquery.keyboard.js');

define('tquery.keyboard', ['tquery', baseurl+'../../vendor/threex/THREEx.KeyboardState.js'], function(){
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});	
});
