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

tQuery.convert.toNumberZeroToOne	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		value	= Math.min(value, 1.0);
		value	= Math.max(value, 0);
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.toInteger	= function(value){
	if( arguments.length === 1 && typeof(value) === 'number'){
		value	= Math.floor(value);
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.identity	= function(value){
	return value;
};

tQuery.convert.toBoolean	= function(value){
	if( arguments.length === 1 && typeof(value) === 'boolean'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.toString	= function(value){
	if( arguments.length === 1 && typeof(value) === 'string'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};

tQuery.convert.toTexture	= function(value){
	if( arguments.length === 1 && value instanceof THREE.Texture ){
		return value;
	}else if( arguments.length === 1 && typeof(value) === 'string' ){
		return THREE.ImageUtils.loadTexture(value);
	}else if( arguments.length === 1 && (value instanceof Image || value instanceof HTMLCanvasElement) ){
		var texture		= new THREE.Texture( value );
		texture.needsUpdate	= true;
		return texture;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
