/**
 * tquery.js plugin to handle keyboard
*/
define(['/vendor/threex/THREEx.KeyboardState.js'], function(){
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});		
});
