/**
 * tquery.js plugin to handle keyboard
*/

// FIXME this hardcoded path is ugly
define('tquery.keyboard', ['tquery', '../../vendor/threex/THREEx.KeyboardState.js'], function(){
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});	
});
