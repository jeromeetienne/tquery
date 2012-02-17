tQuery.convert	= {};

/**
 * Convert the value into a THREE.Color object
 * 
 * @return {THREE.Color} the resulting color
*/
tQuery.convert.toThreeColor	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		return new THREE.Color(value);
	}else if( arguments.length === 1 && value instanceof THREE.Color ){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.toNumber	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.identity	= function(value){
	return value;
};

