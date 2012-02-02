/**
 * tquery.js plugin to handle keyboard
*/

//var scripts	= document.head.getElementsByTagName('script');
//var url		= scripts[scripts.length-1].src;
//console.log("slota", url);

// FIXME this hardcoded path is ugly
define('tquery.keyboard', ['tquery', '../../vendor/threex/THREEx.KeyboardState.js'], function(){
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});	
});

