/**
 * Declare a no-operation define to be able to load modules which use requirejs
 * without requirejs itself. The goal is to be compatible
 * 
 * @param {Array} array of strings containing files url
 * @param {Function} the callback which actually define the module
*/
function define(deps, callback){
	// TODO sanity check on the deps to know if they are loaded
	// - can be done with document.querySelector
	
	// call the callback
	callback();
}