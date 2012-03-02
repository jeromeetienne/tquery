/**
 * tquery.js plugin to handle keyboard
*/
define(['threex/THREEx.KeyboardState'], function(){
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});		
});
