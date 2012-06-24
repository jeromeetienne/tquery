var EzRequire	= {};

/**
 * Declare a no-operation define to be able to load modules which use ezrequirejs
 * without ezrequire itself. The goal is to be compatible
 * 
 * @param {Array} array of strings containing files url
 * @param {Function} the callback which actually define the module
*/
EzRequire.define	= function(name, deps, onReady){
	// TODO sanity check on the deps to know if they are loaded
	// - can be done with document.querySelector

	// handle polymorphism
	if( typeof(name) !== 'string' ){
		onReady	= deps;
		deps	= name;
		name	= "dummyname";
	}
	if( deps instanceof Array === false ){
		onReady	= deps;
		deps	= [];
	}

	// call the onReady on a zero timer
	setTimeout(function(){
		onReady()
	}, 0);
}