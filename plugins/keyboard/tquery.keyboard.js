/**
 * tquery.js plugin to handle keyboard
*/
(function(){
	var instance	= null;
	tQuery.registerStatic('keyboard', function(domElement){
		// default to renderer domElement
		if( !domElement ){
			domElement	= tQuery.world.tRenderer().domElement;
			// make it focusable. needed to get keyboard evemt
			domElement.setAttribute("tabIndex", "0");	
		}
		instance 	= instance	|| new THREEx.KeyboardState(domElement);
		return instance;
	});			
})();
