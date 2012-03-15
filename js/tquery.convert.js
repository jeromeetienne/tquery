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

/**
* Convert the value into a THREE.Vector3 object
* 
* @return {THREE.Vector3} the resulting vector3
*/
tQuery.convert.toThreeVector = function (value) {
    if (arguments.length === 1 && typeof (value) === 'number') {
        return new THREE.Vector3(value, value, value);
    } else if (arguments.length === 3 && typeof (value) === 'number') {
        return new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 1 && value instanceof THREE.Vector3) {
        return value;
    } else {
        console.assert(false, "invalid parameter");
    }
    return undefined; // never reached - just to workaround linter complaint
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

tQuery.convert.toBool	= function(value){
	if( arguments.length === 1 && typeof(value) === 'boolean'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
