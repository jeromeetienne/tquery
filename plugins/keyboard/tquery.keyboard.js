/**
 * tquery.js plugin to handle keyboard
*/
(function(){
	var instance	= null;
	tQuery.registerStatic('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});			
})();
