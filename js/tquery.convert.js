tQuery.convert	= {};

/**
 * Convert the value into a THREE.Color object
 * 
 * @return {THREE.Color} the resulting color
*/
tQuery.convert.toThreeColor	= function(/* arguments */){
	// honor the plugins with 'preConvert' event
	var result	= tQuery.convert.toThreeColor.dispatchEvent('preConvert', arguments);
	if( result !== undefined )	return result;

	// default convertions
	if( arguments.length === 1 && typeof(arguments[0]) === 'number'){
		return new THREE.Color(arguments[0]);
	}else if( arguments.length === 1 && arguments[0] instanceof THREE.Color ){
		return arguments[0];
	}else if( arguments.length === 3 && typeof(arguments[0]) === 'number'
					&& typeof(arguments[1]) === 'number' 
					&& typeof(arguments[2]) === 'number' ){
		return new THREE.Color().setRGB(arguments[0], arguments[1], arguments[2]);
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
// make tQuery.convert.toThreeColor eventable
tQuery.MicroeventMixin(tQuery.convert.toThreeColor);


/**
 * Convert the arguments into a THREE.Vector3
 * @return {THREE.Vector3} the resulting THREE.Vector3
 */
tQuery.convert.toVector3	= function(/* arguments */){
	// handle parameters
	if( arguments[0] instanceof THREE.Vector3 && arguments.length === 1 ){
		return arguments[0]
	}else if( typeof arguments[0] === "number" && arguments.length === 3 ){
		return new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}else{
		console.assert(false, "invalid parameter for Vector3");
	}
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

tQuery.convert.toTextureCube	= function(/* arguments */){
	// honor the plugins with 'preConvert' event
	var result	= this.dispatchEvent('preConvert', arguments);
	if( result !== undefined )	return result;

	return tQuery.convert.toTexture.apply(tQuery.convert.toTexture, arguments);
};
// make tQuery.convert.toTextureCube eventable
tQuery.MicroeventMixin(tQuery.convert.toTextureCube);

tQuery.convert.toTexture	= function(value){
	// honor the plugins with 'preConvert' event
	var result	= this.dispatchEvent('preConvert', arguments);
	if( result !== undefined )	return result;
	
	// default convertions
	if( arguments.length === 1 && value instanceof THREE.Texture ){
		return value;
	}else if( arguments.length === 1 && value instanceof THREE.WebGLRenderTarget ){
		return value;
	}else if( arguments.length === 1 && typeof(value) === 'string' ){
		return THREE.ImageUtils.loadTexture(value);
	}else if( arguments.length === 1 && (value instanceof Image
						|| value instanceof HTMLVideoElement
						|| value instanceof HTMLCanvasElement) ){
		var texture		= new THREE.Texture( value );
		texture.needsUpdate	= true;
		return texture;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
// make tQuery.convert.toTexture eventable
tQuery.MicroeventMixin(tQuery.convert.toTexture);



