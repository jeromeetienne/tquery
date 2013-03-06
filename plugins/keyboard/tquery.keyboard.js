/**
 * tquery.js plugin to handle keyboard
*/
(function(){
	var instance	= null;
	tQuery.registerStatic('keyboard', function(domElement){
		// default to renderer domElement
		if( !instance ){
			if( !domElement ){
				domElement	= tQuery.world.tRenderer().domElement;
				// make it focusable. needed to get keyboard event
				domElement.setAttribute("tabIndex", "0");
				domElement.focus();	
			}
			instance	= new THREEx.KeyboardState(domElement);
		}
		return instance;
	});			
})();
