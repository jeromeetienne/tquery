/**
 * @fileoverview
 * - Depends only on console.*
 * - modern browser MUST be supported. other may be supported
 * - TODO is the namespace name properly named
 *
 * 
 * consolex.checkType(property, Class) - check that the property is of this class
 * consolex.checkInstanceOf(property, class) - check with instanceOf
 * consolex.stack() - return the current stack to the caller
 *
 * Is it possible to detect anonymous function and to make give them a name
*/


/**
 * @namespace
*/
var consolex	= {};

/**
 * Display a message every type the
 * 
 * @param {Function} fn the original function
 * @param {String|undefined} message to display when the function is called. Optional
 * @returns {Function} The modified function
*/
consolex.obsolete	= function(fn, message){
	return function(){
		console.warn(message || "Obsoleted function called. Please update your code.");
		console.trace();
		// forward the function
		return fn.apply(this, arguments);
	}
}

/**
 * Trigger the debugger when the function is called
 *
 * @param {Function} fn the original function
 * @returns {Function} The modified function
*/
consolex.debug	= function(fn){
	return function(){
		// trigger debugger
		debugger;
		// This point is never reached
	}
}

/**
 * assert which actually try to stop the excecution
 * if consolex.assert.useDebugger is falsy, throw an exception. else trigger the
 * debugger. It default to false
 * @param {Boolean} condition the condition which is asserted
 * @param {String} message the message which is display is condition is falsy
 * @param {?Boolean} useDebuggercondition the condition which is asserted
*/
consolex.assert	= function(condition, message, useDebugger){
	if( condition )	return;
	if( consolex.assert.useDebugger || useDebugger )	debugger;
	throw new Error(message	|| "assert Failed")
}
consolex.assert.useDebugger	= false;

/**
 * Ensure that the property is never NaN
 * 
 * @param {Object} baseObject the base object containing the property
 * @param {String} property the property to check
*/
consolex.noNaN	= function(baseObject, property){
	var initialValue= baseObject[property];
	baseObject.__defineGetter__(property, function(){
		return baseObject['__'+property];
	});
	baseObject.__defineSetter__(property, function(value){
		// NaN is the only value where "NaN === NaN" is always false
		console.assert( value === value, "property '"+property+"' is a NaN");
		baseObject['__'+property] = value;
	});
	// set the initialValue
	baseObject['__'+property]	= initialValue;
};

/**
 * Ensure the type of a variable with typeof() operator
 * 
 * @param {Object} baseObject the base object containing the property
 * @param {String} property the property to check
 * @param {String} typeofString the exepected result of typeof(property)
*/
consolex.checkTypeOf	= function(baseObject, property, typeofStr){
	var initialValue= baseObject[property];
	baseObject.__defineGetter__(property, function(){
		return baseObject['__'+property];
	});
	baseObject.__defineSetter__(property, function(value){
		var result	= typeof(value);
		consolex.assert(result === typeofStr, "property typeof('"+property+"') === '"+result+"' (instead of '"+typeofStr+"')");
		baseObject['__'+property] = value;
	});
	// set the initialValue
	baseObject['__'+property]	= initialValue;
};

