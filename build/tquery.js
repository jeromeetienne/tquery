// tquery.js - https://github.com/jeromeetienne/tquery - MIT License
/**
 * @fileOverview This file is the core of tQuery library. 
*/

/**
 * Create a tQuery element
 *
 * @class root class
 * 
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
var tQuery	= function(object, root)
{
	// support for tQuery(geometry, material)
	if( arguments.length === 2 && 
			(arguments[0] instanceof THREE.Geometry
				|| arguments[0] instanceof THREE.BufferGeometry
				|| arguments[0] instanceof tQuery.Geometry)
			&& 
			(arguments[1] instanceof THREE.Material || arguments[1] instanceof tQuery.Material)
			){
		var tGeometry	= arguments[0] instanceof tQuery.Geometry ? arguments[0].get(0) : arguments[0];
		var tMaterial	= arguments[1] instanceof tQuery.Material ? arguments[1].get(0) : arguments[1];
		var tMesh	= new THREE.Mesh(tGeometry, tMaterial);
		return tQuery( tMesh );
	}

// TODO make tthat cleaner
// - there is a list of functions registered by each plugins
//   - handle() object instanceof THREE.Mesh
//   - create() return new tQuery(object)
// - this list is processed in order here

	// if the object is an array, compare only the first element
	// - up to the subconstructor to check if the whole array has proper type
	var instance	= Array.isArray(object) ? object[0] : object;

	if( instance instanceof THREE.Mesh  && tQuery.Mesh){
		return new tQuery.Mesh(object);
	}else if( instance instanceof THREE.DirectionalLight && tQuery.DirectionalLight){
		return new tQuery.DirectionalLight(object);
	}else if( instance instanceof THREE.AmbientLight && tQuery.AmbientLight){
		return new tQuery.AmbientLight(object);
	}else if( instance instanceof THREE.Light && tQuery.Light){
		return new tQuery.Light(object);

	}else if( instance instanceof THREE.Object3D  && tQuery.Object3D){
		return new tQuery.Object3D(object);
	}else if( instance instanceof THREE.Geometry && tQuery.Geometry){
		return new tQuery.Geometry(object);
	}else if( instance instanceof THREE.Material && tQuery.Material){
		return new tQuery.Material(object);
	}else if( typeof instance === "string" && tQuery.Object3D){
		return new tQuery.Object3D(object, root);
	}else{
		console.assert(false, "unsupported type")
	}
	return undefined;
};

/**
 * The version of tQuery
*/
tQuery.VERSION	= "r56.0";

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * generic getter/setter
 * 
 * @param {Object} object the object in which store the data
 * @param {String} key the key/name of the data to get/set
 * @param {*} value the value to set (optional)
 * @param {Boolean} mustNotExist if true, ensure that the key doesnt already exist, optional default to false
 * 
 * @returns {*} return the value stored in this object for this key
*/
tQuery.data	= function(object, key, value, mustNotExist)
{
	// sanity check
	console.assert( object, 'invalid parameters' );
	console.assert( typeof key === 'string', 'invalid parameters');
	// handle default arguments values
	if( mustNotExist === undefined && value !== undefined )	mustNotExist = true;

	// init _tqData
	object['_tqData']	= object['_tqData']	|| {};
	// honor mustNotExist
	if( mustNotExist ){
		console.assert(object['_tqData'][key] === undefined, "This key already exists "+key);
	}
	// set the value if any
	if( value ){
		object['_tqData'][key]	= value;
	}
	// return the value
	return object['_tqData'][key];
};

/**
 * test if the data exist
 * @param  {Object}  object the object which may or may not contain the data
 * @param  {string}  key    the key of the data
 * @return {Boolean}        true if the data exist, false otherwise
 */
tQuery.hasData	= function(object, key){
	// if there is no data at all, return false
	if( object['_tqData'] === undefined )		return false;
	// if this data doesnt exist, return false
	if( object['_tqData'][key] === undefined )	return false;
	// if all previous test passed, return true
	return true;
}

/**
 * Same as jQuery.removeData()
 *
 * @param {Boolean} mustExist if true, ensure the key does exist, default to false
*/
tQuery.removeData	= function(object, key, mustExist)
{
	// handle the 'key as Array' case
	if( key instanceof Array ){
		key.forEach(function(key){
			tQuery.removeData(object, key);
		})
		return;
	}
	// sanity check
	console.assert( typeof key === "string");
	// honor mustNotExist
	if( mustExist ){
		console.assert(object['_tqData'][key] !== undefined, "This key doesnt already exists "+key);
	}
	// do delete the key
	delete object['_tqData'][key];
	// TOTO remove object[_tqData] if empty now
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * loop over a Array.
 * 
 * @param {Array} arr the array to traverse.
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.each	= function(arr, callback){
	for(var i = 0; i < arr.length; i++){
		var keepLooping	= callback(arr[i], i)
		if( keepLooping === false )	return false;
	}
	return true;
};

/**
 * precise version of Date.now() -
 * It provide submillisecond precision based on window.performance.now() when 
 * available, fall back on Date.now()
 * see http://updates.html5rocks.com/2012/05/requestAnimationFrame-API-now-with-sub-millisecond-precision 
*/
tQuery.now	= (function(){
	var p			= window.performance	|| {};
	if( p.now )		return function(){ return p.timing.navigationStart + p.now();		};
	else if( p.mozNow )	return function(){ return p.timing.navigationStart + p.mozNow();	};
	else if( p.webkitNow )	return function(){ return p.timing.navigationStart + p.webkitNow()	};
	else if( p.mskitNow )	return function(){ return p.timing.navigationStart + p.msNow()		};
	else if( p.okitNow )	return function(){ return p.timing.navigationStart + p.oNow()		};
	else			return function(){ return Date.now;					};	
})();


/**
 * Make a child Class inherit from the parent class.
 *
 * @param {Object} childClass the child class which gonna inherit
 * @param {Object} parentClass the class which gonna be inherited
*/
tQuery.inherit	= function(childClass, parentClass){
	// trick to avoid calling parentClass constructor
	var tempFn		= function() {};
	tempFn.prototype	= parentClass.prototype;
	childClass.prototype	= new tempFn();


	childClass.parent	= parentClass.prototype;
	childClass.prototype.constructor= childClass;	
};

/**
 * extend function. mainly aimed at handling default values - jme: im not sure at all it is the proper one.
 * http://jsapi.info/_/extend
 * similar to jquery one but much smaller
*/
tQuery.extend = function(obj, base, deep){
	// handle parameter polymorphism
	deep		= deep !== undefined ? deep	: true;
	var extendFn	= deep ? deepExtend : shallowExtend;
	var result	= {};
	base	&& extendFn(result, base);
	obj	&& extendFn(result, obj);
	return result;
	
	function shallowExtend(dst, src){
		Object.keys(src).forEach(function(key){
			dst[key]	= src[key];
		})
	};
	// from http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
	function deepExtend(dst, src){
		for (var property in src) {
			if (src[property] && src[property].constructor && src[property].constructor === Object) {
				dst[property] = dst[property] || {};
				arguments.callee(dst[property], src[property]);
			} else {
				dst[property] = src[property];
			}
		}
		return dst;
	};
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Make an object pluginable
 * 
 * @param {Object} object the object on which you mixin function
 * @param {Object} dest the object in which to register the plugin
 * @param {string} suffix the suffix to add to the function name
*/
tQuery._pluginsOn	= function(object, dest, fnNameSuffix){
	dest		= dest	|| object.prototype || object;
	fnNameSuffix	= fnNameSuffix || '';
	// sanity check 
	console.assert(object['register'+fnNameSuffix] === undefined);
	console.assert(object['unregister'+fnNameSuffix] === undefined);
	console.assert(object['registered'+fnNameSuffix] === undefined);

	object['register'+fnNameSuffix]		= function(name, funct) {
		console.assert(dest[name] === undefined, 'Conflict! Already method called: ' + name);
		dest[name]	= funct;
	};
	object['unregister'+fnNameSuffix]	= function(name){
		if( dest.hasOwnProperty(name) === false ){
			throw new Error('Plugin not found: ' + name);
		}
		delete dest[name];
	};
	object['registered'+fnNameSuffix]	= function(name){
		return dest.hasOwnProperty(name) === true;
	}
};

tQuery.pluginsInstanceOn= function(klass){
	tQuery._pluginsOn(klass, undefined, 'Instance');
};
tQuery.pluginsStaticOn	= function(klass){
	tQuery._pluginsOn(klass, klass, 'Static');
};

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.mixinAttributes	= function(dstObject, properties){
	// mixin the new property
	// FIXME the inheritance should work now... not sure
	dstObject.prototype._attrProps	= tQuery.extend(dstObject.prototype._attrProps, properties);

	dstObject.prototype.attr	= function(name, args){
		// handle parameters
		if( name instanceof Object && args === undefined ){
			Object.keys(name).forEach(function(key){
				this.attr(key, name[key]);
			}.bind(this));
		}else if( typeof(name) === 'string' ){
			console.assert( Object.keys(this._attrProps).indexOf(name) !== -1, 'invalid property name:'+name);
		}else	console.assert(false, 'invalid parameter');

		// handle setter
		if( args !== undefined ){
			var convertFn	= this._attrProps[name];
			var value	= convertFn.apply(convertFn, args);
			this.each(function(element){
				element[name]	= value;
			})
			return this;			
		}
		// handle getter
		if( this.length === 0 )	return undefined
		var element	= this.get(0);
		return element[name];
	};

	// add shortcuts
	Object.keys(properties).forEach(function(name){
		dstObject.prototype[name]	= function(/* arguments */){
			return this.attr(name, arguments);
		};
	}.bind(this));
};

//////////////////////////////////////////////////////////////////////////////////
//		put some helpers						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Flow control - from https://github.com/jeromeetienne/gowiththeflow.js
*/
tQuery.Flow	= function(){
	var self, stack = [], timerId = setTimeout(function(){ timerId = null; self._next(); }, 0);
	return self = {
		destroy	: function(){ timerId && clearTimeout(timerId);	},
		par	: function(callback, isSeq){
			if(isSeq || !(stack[stack.length-1] instanceof Array)) stack.push([]);
			stack[stack.length-1].push(callback);
			return self;
		},seq	: function(callback){ return self.par(callback, true);	},
		_next	: function(err, result){
			var errors = [], results = [], callbacks = stack.shift() || [], nbReturn = callbacks.length, isSeq = nbReturn == 1;
			callbacks && callbacks.forEach(function(fct, index){
				fct(function(error, result){
					errors[index]	= error;
					results[index]	= result;		
					if(--nbReturn == 0)	self._next(isSeq?errors[0]:errors, isSeq?results[0]:results)
				}, err, result)
			})
		}
	}
};

/**
 * microevents.js - https://github.com/jeromeetienne/microevent.js
*/
tQuery.MicroeventMixin	= function(destObj){
	var bind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	var unbind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	var trigger	= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			var result	= tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
			if( result !== undefined )	return result;
		}
		return undefined;
	};
	
	// backward compatibility
	destObj.bind	= bind;
	destObj.unbind	= unbind;
	destObj.trigger	= trigger;

	destObj.addEventListener	= function(event, fct){
		this.bind(event, fct)
		return this;	// for chained API
	}
	destObj.removeEventListener	= function(event, fct){
		this.unbind(event, fct)
		return this;	// for chained API
	}
	destObj.dispatchEvent		= function(event /* , args... */){
		return this.trigger.apply(this, arguments)
	}
};

/**
 * https://github.com/jeromeetienne/MicroCache.js
*/
tQuery.MicroCache	= function(){
	var _values	= {};
	return {
		get	: function(key){ return _values[key];	},
		contains: function(key){ return key in _values;	},
		remove	: function(key){ delete _values[key];	},
		set	: function(key, value){	_values[key] = value;},
		values	: function(){ return _values;	},
		getSet	: function(key, value){
			if( !this.contains(key) ){
				this.set(key, typeof value == 'function' ? value() : value )
			}
			return this.get(key);
		}
	}
}


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
	}else if( arguments.length === 1 && typeof(arguments[0]) === 'string'){
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

/**
 * Convert the arguments into a THREE.Vector2
 * @return {THREE.Vector2} the resulting THREE.Vector2
 */
tQuery.convert.toVector2	= function(/* arguments */){
	// handle parameters
	if( arguments[0] instanceof THREE.Vector2 && arguments.length === 1 ){
		return arguments[0]
	}else if( typeof arguments[0] === "number" && arguments.length === 2 ){
		return new THREE.Vector2(arguments[0], arguments[1]);
	}else{
		console.assert(false, "invalid parameter for Vector2");
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
	if( arguments.length === 1 && value instanceof tQuery.Texture ){
		return arguments[0].get(0);
	}else if( arguments.length === 1 && value instanceof THREE.Texture ){
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



/**
 * implementation of the tQuery.Node
 *
 * @class base class for tQuery objects
 *
 * @param {Object} object an instance or an array of instance
*/
tQuery.Node	= function(object)
{
	// handle parameters
	if( object instanceof Array )	this._lists	= object;
	else if( !object )		this._lists	= [];
	else				this._lists	= [object];
	this.length	= this._lists.length;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve the elements matched by the tQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.get	= function(idx)
{
	if( idx === undefined )	return this._lists;
	// sanity check - it MUST be defined
	console.assert(this._lists[idx], "element not defined");
	return this._lists[idx];
};

/**
 * loop over element
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Node.prototype.each	= function(callback)
{
	return tQuery.each(this._lists, callback)
};

/**
 * getter/setter of the back pointer
 *
 * @param {Object} back the value to return when .back() is called. optional
*/
tQuery.Node.prototype.back	= function(value)
{
	if( value  === undefined )	return this._back;
	this._back	= value;
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.data	= function(key, value)
{
	// handle the setter case
	if( value !== undefined ){
		this.each(function(element){
			tQuery.data(element, key, value);
		});
		return this;	// for chained API
	}
	// return the value of the first element
	if( this.length > 0 )	return tQuery.data(this.get(0), key)
	// return undegined if the list is empty
	console.assert(this.length === 0);
	return undefined
}

/**
 * same as .data() in jquery
*/
tQuery.Node.prototype.removeData	= function(key)
{
	this.each(function(element){
		tQuery.removeData(element, key);
	});
	return this;	// for chained API
}/**
 * Handle object3D
 *
 * @class include THREE.Object3D
 *
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
tQuery.Object3D	= function(object, root)
{
	// handle the case of selector
	if( typeof object === "string" ){
		object	= tQuery.Object3D._select(object, root);
	}

	// call parent ctor
	tQuery.Object3D.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Object3D
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Object3D); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Object3D, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Object3D);
tQuery.pluginsStaticOn(tQuery.Object3D);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Object3D, {
	eulerOrder		: tQuery.convert.toString,
	
	doubleSided		: tQuery.convert.toBoolean,
	flipSided		: tQuery.convert.toBoolean,
	
	rotationAutoUpdate	: tQuery.convert.toBoolean,
	matrixAutoUpdate	: tQuery.convert.toBoolean,
	matrixWorldNeedsUpdate	: tQuery.convert.toBoolean,
	useQuaternion		: tQuery.convert.toBoolean,

	visible			: tQuery.convert.toBoolean,

	receiveShadow		: tQuery.convert.toBoolean,
	castShadow		: tQuery.convert.toBoolean
});

/**
 * Traverse the hierarchy of Object3D. 
 * 
 * @returns {tQuery.Object3D} return the tQuery.Object3D itself
*/
tQuery.Object3D.prototype.traverse	= function(callback){
	this.each(function(tObject3d){
		tObject3d.traverse(function(childObject3D){
			callback(childObject3D, this);
		});
	});
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		geometry and material						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * get geometry.
 *
 * TODO this should be move in tQuery.Mesh
 * 
 * @returns {tQuery.Geometry} return the geometries from the tQuery.Object3D
*/
tQuery.Object3D.prototype.geometry	= function(value){
	var geometries	= [];
	this.each(function(object3d){
		geometries.push(object3d.geometry)
	});
	return new tQuery.Geometry(geometries).back(this);
};

/**
 * get material.
 * 
 * TODO this should be move in tQuery.Mesh
 * 
 * @returns {tQuery.Material} return the materials from the tQuery.Object3D
*/
tQuery.Object3D.prototype.material	= function(){
	var tMaterials	= [];
	this.each(function(object3d){
		tMaterials.push(object3d.material)
	});
	return new tQuery.Material(tMaterials);
};


/**
 * Clone a Object3D
*/
tQuery.Object3D.prototype.clone	= function(){
	var clones	= [];
	this.each(function(tObject3d){
		var clone	= tObject3d.clone();
		clones.push(clone);
	})  
	return tQuery(clones)
}

tQuery.Object3D.prototype.lookAt = function(position){
	position	= tQuery.convert.toVector3.apply(null, arguments);
	this.each(function(tObject3d){
		tObject3d.lookAt(position)
	}) 	
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//			addTo/removeFrom tQuery.World/tQuery.Object3d		//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add all matched elements to a world
 * 
 * @param {tQuery.World or tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.addTo	= function(target)
{
	console.assert( target instanceof tQuery.World || target instanceof tQuery.Object3D || target instanceof THREE.Object3D )
	this.each(function(object3d){
		target.add(object3d)
	}.bind(this));
	return this;
}

/**
 * remove all matched elements from a world
 * 
 * @param {tQuery.World or tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.removeFrom	= function(target)
{
	console.assert( target instanceof tQuery.World || target instanceof tQuery.Object3D )
	this.each(function(tObject3d){
		target.remove(tObject3d)
	}.bind(this));
	return this;
}

/**
 * remove an element from the parent to which it is attached
 * 
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.detach	= function()
{
	this.each(function(object3D){
		if( !object3D.parent )	return;
		object3D.parent.remove(object3D)
	}.bind(this));
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//			addTo/removeFrom tQuery.World/tQuery.Object3d		//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add all matched elements to a world
 * 
 * @param {tQuery.Object3D} target object to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.add	= function(object3D)
{
	if( object3D instanceof tQuery.Object3D ){
		this.each(function(object1){
			object3D.each(function(object2){
				object1.add(object2);
			})
		}.bind(this));
	}else if( object3D instanceof THREE.Object3D ){
		if( this.length > 0 ){
			this.each(function(tObject3D){
				tObject3D.add(object3D);
			});
		}else{
			this._lists.push(object3D);	
		}
	}else	console.assert(false, "invalid parameter");
	return this;
}

/**
 * remove all matched elements from a world
 * 
 * @param {tQuery.Object3D} object3d the object to add in this object
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.remove	= function(object3D)
{
	if( object3D instanceof tQuery.Object3D ){
		this.each(function(object1){
			object3D.each(function(object2){
				object1.remove(object2);
			})
		}.bind(this));
	}else if( object3D instanceof THREE.Object3D ){
		this.each(function(object1){
			object1.remove(object3D);
		});
	}else	console.assert(false, "invalid parameter");		
	return this;
}


//////////////////////////////////////////////////////////////////////////////////
//		Handle dom attribute						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Getter/Setter for the id of the matched elements
*/
tQuery.Object3D.prototype.id	= function(value)
{
	// sanity check 
	console.assert(this.length <= 1, "tQuery.Object3D.id used on multi-elements" );
	if( value !== undefined ){
		if( this.length > 0 ){
			var object3d	= this.get(0);
			object3d._tqId	= value;
		}
		return this;
	}else{
		if( this.length > 0 ){
			var object3d	= this.get(0);
			return object3d._tqId;
		}
		return undefined;
	}
};

/**
 * add a class to all matched elements
 * 
 * @param {string} className the name of the class to add
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.addClass	= function(className){
	this.each(function(tObject3d){
		// init ._tqClasses if needed
		tObject3d._tqClasses	= tObject3d._tqClasses	|| '';

		if( tQuery.Object3D._hasClassOne(tObject3d, className) )	return;
		
		tObject3d._tqClasses	+= ' '+className;
	}.bind(this));
	return this;
};

/**
 * remove a class to all matched elements
 * 
 * @param {string} className the name of the class to remove
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.removeClass	= function(className){
	this.each(function(tObject3d){
		tQuery.Object3D._removeClassOne(tObject3d, className);
	}.bind(this));
	return this;	// for chained api
};

/**
 * return true if any of the matched elements has this class
 *
 * @param {string} className the name of the class
 * @returns {tQuery.Object3D} true if any of the matched elements has this class, false overwise
*/
tQuery.Object3D.prototype.hasClass	= function(className){
	var completed	= this.each(function(object3d){
		// init ._tqClasses if needed
		object3d._tqClasses	= object3d._tqClasses	|| '';

		var hasClass	= tQuery.Object3D._hasClassOne(object3d, className);
		return hasClass ? false : true;
	}.bind(this));
	return completed ? false : true;
};

tQuery.Object3D._hasClassOne	= function(object3d, className){
	if( object3d._tqClasses === undefined )	return false;
	var classes	= object3d._tqClasses;
	var re		= new RegExp('(^| |\t)+('+className+')($| |\t)+');
	return classes.match(re) ? true : false;
};

tQuery.Object3D._removeClassOne	= function(object3d, className){
	if( object3d._tqClasses === undefined )	return;
	var re		= new RegExp('(^| |\t)('+className+')($| |\t)');
	object3d._tqClasses	= object3d._tqClasses.replace(re, ' ');
};

//////////////////////////////////////////////////////////////////////////////////
//			handling selection					//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D._select	= function(selector, root){
	// handle parameter
	root		= root	|| tQuery.world.tScene();
	if( root instanceof tQuery.Object3D )	root	= root.get(0)
	var selectItems	= selector.split(' ').filter(function(v){ return v.length > 0;})
	
	// sanity check
	console.assert(root instanceof THREE.Object3D);

	var lists	= [];
	root.children.forEach(function(child){
		var nodes	= this._crawls(child, selectItems);
		// FIXME reallocate the array without need
		lists		= lists.concat(nodes);
	}.bind(this));	
	return lists;
}

tQuery.Object3D._crawls	= function(root, selectItems)
{
	var result	= [];
//console.log("crawl", root, selectItems)
	console.assert( selectItems.length >= 1 );
	var match	= this._selectItemMatch(root, selectItems[0]);
//console.log("  match", match)
	var nextSelect	= match ? selectItems.slice(1) : selectItems;
//console.log("  nextSelect", nextSelect)

	if( nextSelect.length === 0 )	return [root];

	root.children.forEach(function(child){
		var nodes	= this._crawls(child, nextSelect);
		// FIXME reallocate the array without need
		result		= result.concat(nodes);
	}.bind(this));

	return result;
}

// all the geometries keywords
tQuery.Object3D._selectableGeometries	= Object.keys(THREE).filter(function(value){
	return value.match(/.+Geometry$/);}).map(function(value){ return value.replace(/Geometry$/,'').toLowerCase();
});

// all the light keywords
tQuery.Object3D._selectableLights	= Object.keys(THREE).filter(function(value){
	return value.match(/.+Light$/);}).map(function(value){ return value.replace(/Light$/,'').toLowerCase();
});

tQuery.Object3D._selectableClasses	= ['mesh', 'light'];

tQuery.Object3D._selectItemMatch	= function(object3d, selectItem)
{
	// sanity check
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof selectItem === 'string' );

	// parse selectItem into subItems
	var subItems	= selectItem.match(new RegExp("([^.#]+|\.[^.#]+|\#[^.#]+)", "g"));;

	// go thru each subItem
	var completed	= tQuery.each(subItems, function(subItem){
		var meta	= subItem.charAt(0);
		var suffix	= subItem.slice(1);
		//console.log("meta", meta, subItem, suffix, object3d)
		if( meta === "." ){
			var hasClass	= tQuery.Object3D._hasClassOne(object3d, suffix);
			return hasClass ? true : false;
		}else if( meta === "#" ){
			return object3d._tqId === suffix ? true : false;
		}else if( subItem === "*" ){
			return true;
		}else if( this._selectableGeometries.indexOf(subItem) !== -1 ){	// Handle geometries
			var geometry	= object3d.geometry;
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Geometry";
			return geometry instanceof THREE[className];
		}else if( this._selectableLights.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Light";
			return object3d instanceof THREE[className];
		}else if( this._selectableClasses.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1);
			return object3d instanceof THREE[className];
		}
		// this point should never be reached
		console.assert(false, "invalid selector: "+subItem);
		return true;
	}.bind(this));

	return completed ? true : false;
}
/**
 * Handle geometry. It inherit from tQuery.Node
 *
 * @class handle THREE.Geometry. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Geometry} object an instance or an array of instance
*/
tQuery.Geometry	= function(object)
{
	// call parent
	tQuery.Geometry.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Geometry
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Geometry); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Geometry, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Geometry);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Geometry, {
	hasTangents	: tQuery.convert.toBoolean,
	dynamic		: tQuery.convert.toBoolean
});/**
 * Handle material
 *
 * @class include THREE.Material. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Material} object an instance or array of instance
*/
tQuery.Material	= function(object)
{
	// call parent
	tQuery.Material.parent.constructor.call(this, object)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Material, tQuery.Node);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Material, {
	opacity		: tQuery.convert.toNumber,
	transparent	: tQuery.convert.toBoolean
});
/**
 * Handle light
 *
 * @class include THREE.Light. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Light} object an instance or array of instance
*/
tQuery.Light	= function(elements)
{
	// call parent ctor
	tQuery.Light.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Light); });
};

/**
 * inherit from tQuery.Node
 * - TODO this should inherit from tQuery.Object3D but but in inheritance
*/
tQuery.inherit(tQuery.Light, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Light);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Light, {
	color	: tQuery.convert.toThreeColor
});


/**
 * Handle mesh
 *
 * @class include THREE.Mesh. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Mesh} object an instance or array of instance
*/
tQuery.Mesh	= function(elements)
{
	// call parent ctor
	var parent	= tQuery.Mesh.parent;
	parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Mesh
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Mesh); });
};

/**
 * inherit from tQuery.Object3D
*/
tQuery.inherit(tQuery.Mesh, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Mesh);

// make it eventable
tQuery.MicroeventMixin(tQuery.Mesh.prototype)



//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * TODO to remove. this function is crap
*/
tQuery.Mesh.prototype.material	= function(value){
	var parent	= tQuery.Mesh.parent;
	// handle the getter case
	if( value === undefined )	return parent.material.call(this);
	// handle parameter polymorphism
	if( value instanceof tQuery.Material )	value	= value.get(0)
	// sanity check
	console.assert( value instanceof THREE.Material )
	// handle the setter case
	this.each(function(tMesh){
		tMesh.material	= value;
	});
	return this;	// for the chained API
}

/**
 * Create a tQuery.Sprite
 * 
 * @returns {tQuery.Sprite} the create object
*/
tQuery.registerStatic('createSprite', function(opts){
	var tSprite	= new THREE.Sprite(opts);
	var sprite	= new tQuery.Sprite(tSprite);
	return sprite;
})

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Wrapper on top of THREE.Sprite
*/
tQuery.registerStatic('Sprite', function(elements){
	// call parent ctor
	tQuery.Sprite.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Sprite); });
});

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Sprite, tQuery.Object3D);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Sprite);


/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Sprite, {
	rotation	: tQuery.convert.toNumber,
});

/**
 * TODO to remove. this function is crap
*/
tQuery.Sprite.prototype.material	= function(value){
	var parent	= tQuery.Sprite.parent;
	// handle the getter case
	if( value === undefined )	return parent.material.call(this);
	// handle parameter polymorphism
	if( value instanceof tQuery.Material )	value	= value.get(0)
	// sanity check
	console.assert( value instanceof THREE.SpriteMaterial )
	// handle the setter case
	this.each(function(tSprite){
		tSprite.material	= value;
	});
	return this;	// for the chained API
}//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle world (aka scene+camera+renderer)
 *
 * @class tQuery.World
 * 
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.World	= function(opts)
{
	// handle parameters
	opts	= opts	|| {};
	opts	= tQuery.extend(opts, {
		renderW		: window.innerWidth,
		renderH		: window.innerHeight,
		webGLNeeded	: true, 
		autoRendering	: true,
		scene		: null,
		camera		: null,
		renderer	: null
	});
	this._opts	= opts;

	// update default world.
	// - TODO no sanity check ?
	// - not clear what to do with this...
	// - tQuery.world is the user world. like the camera controls
	console.assert( !tQuery.word );
	tQuery.world	= this;

	this._autoRendering	= opts.autoRendering;
	
	// create a scene
	this._tScene	= opts.scene	||(new THREE.Scene());

 	// create a camera in the scene
	if( !opts.camera ){
		this._tCamera	= new THREE.PerspectiveCamera(35, opts.renderW / opts.renderH, 0.01, 10000 );
		this._tCamera.position.set(0, 0, 3);
		this._tScene.add(this._tCamera);
	}else{
		this._tCamera	= opts.camera;
	}
	
	// create the loop
	this._loop	= new tQuery.Loop();

	// hook the render function in this._loop
	this._$loopCb	= this._loop.hookOnRender(function(delta, now){
		this.render(delta);
	}.bind(this));

	// create a renderer
	if( opts.renderer ){
		this._tRenderer	= opts.renderer;
	}else if( tQuery.World.hasWebGL() ){
		this._tRenderer	= new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
	}else if( !opts.webGLNeeded ){
		this._tRenderer	= new THREE.CanvasRenderer();
	}else{
		this._addGetWebGLMessage();
		throw new Error("WebGL required and not available")
	}
	this._tRenderer.setClearColorHex( 0xBBBBBB, 1 );
	this._tRenderer.setSize( opts.renderW, opts.renderH );
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.World);

// make it eventable
tQuery.MicroeventMixin(tQuery.World.prototype)

/**
 * destructor
 */
tQuery.World.prototype.destroy	= function(){
	// microevent.js notification
	this.trigger('destroy');
	// unhook the render function in this._loop
	this._loop.unhookOnRender(this._$loopCb);
	// destroy the loop
	this._loop.destroy();
	// remove this._tCameraControls if needed
	this.removeCameraControls();
	// remove renderer element
	var parent	= this._tRenderer.domElement.parentElement;
	parent	&& parent.removeChild(this._tRenderer.domElement);
	
	// clear the global if needed
	if( tQuery.world === this )	tQuery.world = null;
}

//////////////////////////////////////////////////////////////////////////////////
//		WebGL Support							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World._hasWebGL	= undefined;
/**
 * @returns {Boolean} true if webgl is available, false otherwise
*/
tQuery.World.hasWebGL	= function(){
	if( tQuery.World._hasWebGL !== undefined )	return tQuery.World._hasWebGL;

	// test from Detector.js
	try{
		tQuery.World._hasWebGL	= !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ){
		tQuery.World._hasWebGL	= false;
	}
	return tQuery.World._hasWebGL;
};

/**
 * display 'add webgl message' - taken from detector.js
 * @param   {DOMElement?} parent dom element to which we hook it
 * @private
 */
tQuery.World.prototype._addGetWebGLMessage	= function(parent)
{
	parent	= parent || document.body;
	
	// message directly taken from Detector.js
	var domElement = document.createElement( 'div' );
	domElement.style.fontFamily	= 'monospace';
	domElement.style.fontSize	= '13px';
	domElement.style.textAlign	= 'center';
	domElement.style.background	= '#eee';
	domElement.style.color		= '#000';
	domElement.style.padding	= '1em';
	domElement.style.width		= '475px';
	domElement.style.margin		= '5em auto 0';
	domElement.innerHTML		= window.WebGLRenderingContext ? [
		'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' ) : [
		'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
		'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
	].join( '\n' );

	parent.appendChild(domElement);
}

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

// TODO why not a getter/setter here
tQuery.World.prototype.setCameraControls	= function(control){
	if( this.hasCameraControls() )	this.removeCameraControls();
	this._tCameraControls	= control;
	return this;	// for chained API
};

tQuery.World.prototype.getCameraControls	= function(){
	return this._tCameraControls;
};

/**
 * remove the camera controls
 * @return {tQuery.World} for chained API
 */
tQuery.World.prototype.removeCameraControls	= function(){
	if( this.hasCameraControls() === false )	return this;
	this._tCameraControls	= undefined;
	return this;	// for chained API
};

/**
 * test if there is a camera controls
 * @return {Boolean} true if there is, false otherwise
 */
tQuery.World.prototype.hasCameraControls	= function(){
	return this._tCameraControls !== undefined ? true : false;
};

//////////////////////////////////////////////////////////////////////////////////
//		add/remove object3D						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.World.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._tScene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._tScene.add(object3d)		
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

/**
 * remove an object to the scene
 * 
 * @param {tQuery.Object3D} object3D to add to the scene (THREE.Object3D is accepted)
*/
tQuery.World.prototype.remove	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._tScene.remove(object3d)
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._tScene.remove(object3d)
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

/**
 * append renderer domElement
 * @param  {DOMElement} domElement the domelement which will be parent
 * @return {tQuery.World} for chained API
 */
tQuery.World.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._tRenderer.domElement)
	// for chained API
	return this;
}

/**
 * Start the loop
*/
tQuery.World.prototype.start	= function(){
	this._loop.start();
	return this;	// for chained API
}
/**
 * Stop the loop
*/
tQuery.World.prototype.stop	= function(){
	this._loop.stop();
	return this;	// for chained API
}

/**
 * alias on world.loop().hook()
 */
tQuery.World.prototype.hook	= function(priority, callback){
	return this._loop.hook(priority, callback);
}

/**
 * alias on world.loop().unhook()
 */
tQuery.World.prototype.unhook	= function(priority, callback){
	return this._loop.unhook(priority, callback);
}

tQuery.World.prototype.loop	= function(){ return this._loop;		}
tQuery.World.prototype.tRenderer= function(){ return this._tRenderer;		}
tQuery.World.prototype.tScene	= function(){ return this._tScene;		}
tQuery.World.prototype.tCamera	= function(){ return this._tCamera;		}
tQuery.World.prototype.scene	= function(){ return tQuery(this._tScene);	}
tQuery.World.prototype.camera	= function(){ return tQuery(this._tCamera);	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.prototype.autoRendering	= function(value){
	if(value === undefined)	return this._autoRendering;
	this._autoRendering	= value;
	return this;
}


tQuery.World.prototype.render	= function(delta)
{
	// update the cameraControl
	if( this.hasCameraControls() )	this._tCameraControls.update(delta);
	// render the scene 
	if( this._autoRendering )	this._tRenderer.render( this._tScene, this._tCamera );
}
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle the rendering loop
 *
 * @class This class handle the rendering loop
 *
 * @param {THREE.World} world the world to display (optional)
*/
tQuery.Loop	= function()
{	
	// internally if world present do that
	this._hooks	= [];
	this._lastTime	= null;
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.Loop);

/**
 * destructor
*/
tQuery.Loop.prototype.destroy	= function()
{
	this.stop();
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * start looping
 * 
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.start	= function()
{
	if( this._timerId )	this.stop();
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );
	// for chained API
	return this;
}

/**
 * stop looping
 * 
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.stop	= function()
{
	cancelAnimationFrame(this._timerId);
	this._timerId	= null;
	// for chained API
	return this;
}

tQuery.Loop.prototype.isRunning = function() {
	return this._timerId ? true : false;
};

tQuery.Loop.prototype.pauseToggle= function() {
	if( this.isRunning() )	this.stop()
	else			this.start();
	return this;
};

tQuery.Loop.prototype._onAnimationFrame	= function()
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );

	// update time values
	var now		= tQuery.now()/1000;
	if( !this._lastTime )	this._lastTime = now - 1/60;
	var delta	= now - this._lastTime;
	this._lastTime	= now;

	// run all the hooks - from lower priority to higher - in order of registration
	for(var priority = 0; priority <= this._hooks.length; priority++){
		if( this._hooks[priority] === undefined )	continue;
		var callbacks	= this._hooks[priority].slice(0)
		for(var i = 0; i < callbacks.length; i++){
			callbacks[i](delta, now);
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle the hooks						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Loop.prototype.PRE_RENDER	= 20;
tQuery.Loop.prototype.ON_RENDER		= 50;
tQuery.Loop.prototype.POST_RENDER	= 80;

/**
 * hook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {Function} the callback function. usefull for this._$callback = loop.hook(this._callback.bind(this))
 *                     and later loop.unhook(this._$callback)
*/
tQuery.Loop.prototype.hook	= function(priority, callback)
{
	// handle parameters
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	this._hooks[priority]	= this._hooks[priority] || [];
	console.assert(this._hooks[priority].indexOf(callback) === -1)
	this._hooks[priority].push(callback);
	return callback;
}

/**
 * unhook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {tQuery.Loop} chained API
*/
tQuery.Loop.prototype.unhook	= function(priority, callback)
{
	// handle arguments polymorphism
	if( typeof priority === 'function' ){
		callback	= priority;
		priority	= this.PRE_RENDER;
	}

	var index	= this._hooks[priority].indexOf(callback);
	console.assert(index !== -1);
	this._hooks[priority].splice(index, 1);
	this._hooks[priority].length === 0 && delete this._hooks[priority]
	// for chained API
	return this;
}


// bunch of shortcut
// - TODO should it be in a plugin ?

tQuery.Loop.prototype.hookPreRender	= function(callback){ return this.hook(this.PRE_RENDER, callback);	};
tQuery.Loop.prototype.hookOnRender	= function(callback){ return this.hook(this.ON_RENDER, callback);	};
tQuery.Loop.prototype.hookPostRender	= function(callback){ return this.hook(this.POST_RENDER, callback);	};
tQuery.Loop.prototype.unhookPreRender	= function(callback){ return this.unhook(this.PRE_RENDER, callback);	};
tQuery.Loop.prototype.unhookOnRender	= function(callback){ return this.unhook(this.ON_RENDER, callback);	};
tQuery.Loop.prototype.unhookPostRender	= function(callback){ return this.unhook(this.POST_RENDER, callback);	};
/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Create tQuery.World
*/
tQuery.registerStatic('createWorld', function(opts){
	return new tQuery.World(opts);
});

/**
 * Create tQuery.World
*/
tQuery.registerStatic('createObject3D', function(){
	var object3d	= new THREE.Object3D();
	return tQuery(object3d);
});

tQuery.registerStatic('createVector3', function(x, y, z){
	return new THREE.Vector3(x, y, z);
});

tQuery.registerStatic('createVector2', function(x, y){
	return new THREE.Vector2(x, y);
});


//////////////////////////////////////////////////////////////////////////////////
//		create for lights						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createHemisphereLight', function(){
	var tLight	= new THREE.HemisphereLight();
	return new tQuery.HemisphereLight([tLight]);
});

tQuery.registerStatic('createDirectionalLight', function(){
	var tLight	= new THREE.DirectionalLight();
	return new tQuery.DirectionalLight([tLight]);
});

tQuery.registerStatic('createSpotLight', function(){
	var tLight	= new THREE.SpotLight();
	return new tQuery.SpotLight([tLight]);
});

tQuery.registerStatic('createPointLight', function(){
	var tLight	= new THREE.PointLight();
	return new tQuery.PointLight([tLight]);
});

tQuery.registerStatic('createAmbientLight', function(){
	var tLight	= new THREE.AmbientLight();
	return new tQuery.AmbientLight([tLight]);
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * contains the default material to use when create tQuery.Object3D
 * 
 * @fieldOf tQuery
 * @name defaultObject3DMaterial
*/
tQuery.registerStatic('defaultObject3DMaterial', new THREE.MeshNormalMaterial());

tQuery.Geometry.prototype.toMesh	= function(material){
	var meshes	= [];
	this.each(function(tGeometry){
		// handle paramters
		material	= material || tQuery.defaultObject3DMaterial;
		// create the THREE.Mesh
		var mesh	= new THREE.Mesh(tGeometry, material)
		// return it
		meshes.push(mesh);
	});
	return new tQuery.Mesh(meshes);
};


/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.registerStatic('createCube', function(){
	var ctor	= THREE.CubeGeometry;
	var dflGeometry	= [1, 1, 1];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var dflGeometry	= [0.5-0.15, 0.15];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createTorusKnot', function(){
	var ctor	= THREE.TorusKnotGeometry;
	var dflGeometry	= [0.27, 0.1, 128, 32];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createCircle', function(){
	var ctor	= THREE.CircleGeometry;
	var dflGeometry	= [0.5, 32];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var dflGeometry	= [0.5, 32, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createPlane', function(){
	var ctor	= THREE.PlaneGeometry;
	var dflGeometry	= [1, 1, 16, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('createCylinder', function(){
	var ctor	= THREE.CylinderGeometry;
	var dflGeometry	= [0.5, 0.5, 1, 16, 4];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.registerStatic('_createMesh', function(ctor, dflGeometry, args)
{
	// convert args to array if it is instanceof Arguments
	// FIXME if( args instanceof Arguments )
	args	= Array.prototype.slice.call( args );
	
	// init the material
	var material	= tQuery.defaultObject3DMaterial;
	// if the last arguments is a material, use it
	if( args.length && args[args.length-1] instanceof THREE.Material ){
		material	= args.pop();
	}
	
	// ugly trick to get .apply() to work 
	var createFn	= function(ctor, a0, a1, a2, a3, a4, a5, a6, a7){
		console.assert(arguments.length <= 9);
		//console.log("createFn", arguments)
		return new ctor(a0,a1,a2,a3,a4,a5,a6,a7);
	}
	if( args.length === 0 )	args	= dflGeometry.slice();
	args.unshift(ctor);
	var geometry	= createFn.apply(this, args);

	// set the geometry.dynamic by default
	geometry.dynamic= true;
	// create the THREE.Mesh
	var mesh	= new THREE.Mesh(geometry, material)
	// return it
	return tQuery(mesh);
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	return tQuery(axis);
});
/**
 * Handle ambient light
 *
 * @class include THREE.AmbientLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.AmbientLight} element an instance or array of instance
*/
tQuery.AmbientLight	= function(elements)
{
	// call parent ctor
	tQuery.AmbientLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.AmbientLight); });
};

/**
 * inherit from tQuery.Node
*/
tQuery.inherit(tQuery.AmbientLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.AmbientLight);
/**
 * Handle directional light
 *
 * @class include THREE.DirectionalLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.DirectionalLight} element an instance or array of instance
*/
tQuery.DirectionalLight	= function(elements)
{
	// call parent ctor
	tQuery.DirectionalLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.DirectionalLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.DirectionalLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.DirectionalLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.DirectionalLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber,

	shadowDarkness		: tQuery.convert.toNumberZeroToOne,
	shadowBias		: tQuery.convert.toNumber,

	shadowMapWidth		: tQuery.convert.toInteger,
	shadowMapHeight		: tQuery.convert.toInteger,

	shadowCameraRight	: tQuery.convert.toNumber,
	shadowCameraLeft	: tQuery.convert.toNumber,
	shadowCameraTop		: tQuery.convert.toNumber,
	shadowCameraBottom	: tQuery.convert.toNumber,
	shadowCameraVisible	: tQuery.convert.toBoolean,
	
	shadowCameraNear	: tQuery.convert.toNumber,
	shadowCameraFar		: tQuery.convert.toNumber
});



/**
 * Handle directional light
 *
 * @class include THREE.HemisphereLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.HemisphereLight} element an instance or array of instance
*/
tQuery.HemisphereLight	= function(elements)
{
	// call parent ctor
	tQuery.HemisphereLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.HemisphereLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.HemisphereLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.HemisphereLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.HemisphereLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber,
	groundColor	: tQuery.convert.toThreeColor
});


/**
 * Handle directional light
 *
 * @class include THREE.PointLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.PointLight} element an instance or array of instance
*/
tQuery.PointLight	= function(elements)
{
	// call parent ctor
	tQuery.PointLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.PointLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.PointLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.PointLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.PointLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber
});


/**
 * Handle directional light
 *
 * @class include THREE.SpotLight. It inherit from {@link tQuery.Light}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.SpotLight} element an instance or array of instance
*/
tQuery.SpotLight	= function(elements)
{
	// call parent ctor
	tQuery.SpotLight.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Light
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.SpotLight); });
};

/**
 * inherit from tQuery.Light
*/
tQuery.inherit(tQuery.SpotLight, tQuery.Light);

/**
 * Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.SpotLight);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.SpotLight, {
	intensity	: tQuery.convert.toNumber,
	distance	: tQuery.convert.toNumber,

	angle		: tQuery.convert.toNumber,
	exponent	: tQuery.convert.toNumber,

	onlyShadow	: tQuery.convert.toBoolean,

	shadowDarkness		: tQuery.convert.toNumberZeroToOne,
	shadowBias		: tQuery.convert.toNumber,
	shadowMapWidth		: tQuery.convert.toInteger,
	shadowMapHeight		: tQuery.convert.toInteger,
	shadowCameraRight	: tQuery.convert.toNumber,
	shadowCameraLeft	: tQuery.convert.toNumber,
	shadowCameraTop		: tQuery.convert.toNumber,
	shadowCameraBottom	: tQuery.convert.toNumber,
	shadowCameraVisible	: tQuery.convert.toBoolean,
	
	shadowCameraNear	: tQuery.convert.toNumber,
	shadowCameraFar		: tQuery.convert.toNumber
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setBasicMaterial', function(opts){
	var material	= tQuery.createMeshBasicMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshBasicMaterial', function(opts){
	var tMaterial	= new THREE.MeshBasicMaterial(opts);
	var material	= new tQuery.MeshBasicMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle Basic Material
 *
 * @class include THREE.MeshBasicMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.BasicMaterial} element an instance or array of instance
*/
tQuery.MeshBasicMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshBasicMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshBasicMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshBasicMaterial, tQuery.Material);


/**
 * Initial code to automatically extract attribute names from THREE.Material child classes

 	var extractMaterialAttribute	= function(className){
		var parentClass	= new THREE.Material();
		var mainClass	= new THREE[className]();
		var parentProps	= Object.keys(parentClass)
		var mainProps	= Object.keys(mainClass)
		console.log("parentProps", JSON.stringify(parentProps, null, '\t'),"mainProps", JSON.stringify(mainProps, null, '\t'));
		mainProps	= mainProps.filter(function(property){
			return parentProps.indexOf(property) === -1;
		})
		console.log("mainProps", JSON.stringify(mainProps, null, '\t'));
		return mainProps;
	}
*/
/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshBasicMaterial, {
	color			: tQuery.convert.toThreeColor,
	ambient			: tQuery.convert.toThreeColor,
	map			: tQuery.convert.toTexture,
	envMap			: tQuery.convert.toTextureCube,
	refractionRatio		: tQuery.convert.toNumber,
	side			: tQuery.convert.identity,
	wireframe		: tQuery.convert.toBoolean,
	wireframeLinewidth	: tQuery.convert.toInteger,
	wireframeLinecap	: tQuery.convert.toString
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setLambertMaterial', function(opts){
	var material	= tQuery.createMeshLambertMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshLambertMaterial', function(opts){
	var tMaterial	= new THREE.MeshLambertMaterial(opts);
	var material	= new tQuery.MeshLambertMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle directional light
 *
 * @class include THREE.LambertMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.LambertMaterial} element an instance or array of instance
*/
tQuery.MeshLambertMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshLambertMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshLambertMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshLambertMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshLambertMaterial, {
	color		: tQuery.convert.toThreeColor,
	ambient		: tQuery.convert.toThreeColor,
	map		: tQuery.convert.toTexture,
	bumpMap		: tQuery.convert.toTexture,
	bumpScale	: tQuery.convert.toNumber,
	side		: tQuery.convert.identity
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setNormalMaterial', function(opts){
	var material	= tQuery.createMeshNormalMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshNormalMaterial', function(opts){
	var tMaterial	= new THREE.MeshNormalMaterial(opts);
	var material	= new tQuery.MeshNormalMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MeshNormalMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshNormalMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshNormalMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshNormalMaterial, tQuery.Material);
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.registerInstance('setPhongMaterial', function(opts){
	var material	= tQuery.createMeshPhongMaterial(opts);
	this.material( material.get(0) );
	return material.back(this);
})

tQuery.registerStatic('createMeshPhongMaterial', function(opts){
	var tMaterial	= new THREE.MeshPhongMaterial(opts);
	var material	= new tQuery.MeshPhongMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle directional light
 *
 * @class include THREE.PhongMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.PhongMaterial} element an instance or array of instance
*/
tQuery.MeshPhongMaterial	= function(elements)
{
	// call parent ctor
	tQuery.MeshPhongMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.MeshPhongMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.MeshPhongMaterial, tQuery.Material);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.MeshPhongMaterial, {
	map		: tQuery.convert.toTexture,
	
	color		: tQuery.convert.toThreeColor,
	ambient		: tQuery.convert.toThreeColor,
	emissive	: tQuery.convert.toThreeColor,
	specular	: tQuery.convert.toThreeColor,

	shininess	: tQuery.convert.toNumber,

	envMap		: tQuery.convert.toTexture,
	refractionRatio	: tQuery.convert.toNumber,
	reflectivity	: tQuery.convert.toNumber,
	
	bumpMap		: tQuery.convert.toTexture,
	bumpScale	: tQuery.convert.toNumber,

	metal		: tQuery.convert.toBoolean,
	perPixel	: tQuery.convert.toBoolean
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Sprite.registerInstance('setSpriteMaterial', function(opts){
	var material	= tQuery.createSpriteMaterial(opts).back(this);
	this.material( material.get(0) );
	return material;
})

tQuery.registerStatic('createSpriteMaterial', function(opts){
	opts		= tQuery.extend(opts, {
		useScreenCoordinates	: false
	});
	var tMaterial	= new THREE.SpriteMaterial(opts);
	var material	= new tQuery.SpriteMaterial(tMaterial);
	return material;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle Sprite Material
 *
 * @class include THREE.SpriteMaterial. It inherit from {@link tQuery.Material}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.SpriteMaterial} element an instance or array of instance
*/
tQuery.SpriteMaterial	= function(elements)
{
	// call parent ctor
	tQuery.SpriteMaterial.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Material
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.SpriteMaterial); });
};

/**
 * inherit from tQuery.Material
*/
tQuery.inherit(tQuery.SpriteMaterial, tQuery.Material);


/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.SpriteMaterial, {
	color			: tQuery.convert.toThreeColor,
	map			: tQuery.convert.toTexture,
	useScreenCoordinates	: tQuery.convert.toBoolean,
	depthTest		: tQuery.convert.toBoolean,
	sizeAttenuation		: tQuery.convert.toBoolean,
	scaleByViewport		: tQuery.convert.toBoolean,
	
	fog			: tQuery.convert.toBoolean,
});


/**
 * @fileOverview Plugins for tQuery.Geometry: tool box to play with geometry
*/

(function(){	// TODO why is there a closure here ?

//////////////////////////////////////////////////////////////////////////////////
//		Size functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.registerInstance('computeAll', function(){
	this.each(function(tGeometry){
		tGeometry.computeBoundingSphere();
		tGeometry.computeBoundingBox();
		//tGeometry.computeCentroids();
		tGeometry.computeFaceNormals();
		//tGeometry.computeVertexNormals();
		//tGeometry.computeTangents();
	});

	// return this, to get chained API	
	return this;
});

/**
 * zoom a geometry
 *
 * @name zoom
 * @methodOf tQuery.Geometry
*/
tQuery.Geometry.registerInstance('scaleBy', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 1 ){
		vector3	= new THREE.Vector3(vector3, vector3, vector3);
	}else if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Geometry.vector3 parameter error");

	// change all geometry.vertices
	this.each(function(geometry){
		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.multiply(vector3); 
		}
		// mark the vertices as dirty
		geometry.verticesNeedUpdate = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.registerInstance('size', function(){
	// only on zero-or-one element
	console.assert(this.length <= 1)
	// if no element, return undefined
	if( this.length === 0 )	return undefined

	// else measure the size of the element
	var geometry	= this.get(0);
	// compute middle
	var size= new THREE.Vector3()
	size.x	= geometry.boundingBox.max.x - geometry.boundingBox.min.x;
	size.y	= geometry.boundingBox.max.y - geometry.boundingBox.min.y;
	size.z	= geometry.boundingBox.max.z - geometry.boundingBox.min.z;

	// return the just computed middle
	return size;	
});

/**
*/
tQuery.Geometry.registerInstance('normalize', function(){
	// change all geometry.vertices
	this.each(function(geometry){
		var node	= tQuery(geometry);
		var size	= node.size();
		if( size.x >= size.y && size.x >= size.z ){
			node.zoom(1/size.x);
		}else if( size.y >= size.x && size.y >= size.z ){
			node.zoom(1/size.y);
		}else{
			node.zoom(1/size.z);
		}
	});
	// return this, to get chained API	
	return this;
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////


tQuery.Geometry.registerInstance('middlePoint', function(){
	// only on zero-or-one element
	console.assert(this.length <= 1)
	// if no element, return undegined
	if( this.length === 0 )	return undefined
	// else measure the size of the element
	var geometry	= this.get(0);
	// compute middle
	var middle	= new THREE.Vector3()
	middle.x	= ( geometry.boundingBox.max.x + geometry.boundingBox.min.x ) / 2;
	middle.y	= ( geometry.boundingBox.max.y + geometry.boundingBox.min.y ) / 2;
	middle.z	= ( geometry.boundingBox.max.z + geometry.boundingBox.min.z ) / 2;

	// return the just computed middle
	return middle;
});

//////////////////////////////////////////////////////////////////////////////////
//		move functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.registerInstance('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(delta instanceof THREE.Vector3, "Geometry.translate parameter error");

	// change all geometry.vertices
	this.each(function(geometry){
		// change all geometry.vertices
		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.add(delta); 
		}
		// mark the vertices as dirty
		geometry.verticesNeedUpdate = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.registerInstance('rotate', function(angles, order){
	// handle parameters
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(angles instanceof THREE.Vector3, "Geometry.rotate parameter error");
	// set default rotation order if needed
	order	= order	|| 'XYZ';
	// compute transformation matrix
	var matrix	= new THREE.Matrix4();
	matrix.setRotationFromEuler(angles, order);

	// change all geometry.vertices
	this.each(function(geometry){
		// apply the matrix
		geometry.applyMatrix( matrix );
	
		// mark the vertices as dirty
		geometry.verticesNeedUpdate = true;
		geometry.computeBoundingBox();
	});

	// return this, to get chained API	
	return this;
});

/**
*/
tQuery.Geometry.registerInstance('center', function(noX, noY, noZ){
	// change all geometry.vertices
	this.each(function(tGeometry){
		var geometry	= tQuery(tGeometry);
		// compute delta
		var delta 	= geometry.middlePoint().negate();
		if( noX )	delta.x	= 0;
		if( noY )	delta.y	= 0;
		if( noZ )	delta.z	= 0;

		return geometry.translate(delta)
	});
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Geometry.registerInstance('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Geometry.registerInstance('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Geometry.registerInstance('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});
tQuery.Geometry.registerInstance('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Geometry.registerInstance('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Geometry.registerInstance('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});
tQuery.Geometry.registerInstance('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Geometry.registerInstance('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Geometry.registerInstance('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});

// backward compatibility
tQuery.Geometry.registerInstance('zoom'		, function(value){return this.scaleBy(value);		});
tQuery.Geometry.registerInstance('zoomX'	, function(ratio){ return this.zoom(ratio, 1, 1);	});
tQuery.Geometry.registerInstance('zoomY'	, function(ratio){ return this.zoom(1, ratio, 1);	});
tQuery.Geometry.registerInstance('zoomZ'	, function(ratio){ return this.zoom(1, 1, ratio);	});


})();	// closure function end
/**
 * @fileOverview Plugins for tQuery.Object3D to play with .position/.rotation/.scale
*/

//////////////////////////////////////////////////////////////////////////////////
//		position 							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('position', function(vector3){
	// handle the getter
	if( vector3 === undefined )	return this.get(0).position;
	// handle parameters
	vector3	= tQuery.convert.toVector3.apply(null, arguments);
	// do the operation on each node
	this.each(function(tObject3d){
		tObject3d.position.copy(vector3);
	});
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.registerInstance('positionX', function(scalar){
	if( scalar === undefined )	return this.get(0).position.x;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.x = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('positionY', function(scalar){
	if( scalar === undefined )	return this.get(0).position.y;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.y = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('positionZ', function(scalar){
	if( scalar === undefined )	return this.get(0).position.z;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.z = scalar;	});
	return this;
});

tQuery.Object3D.registerInstance('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(delta instanceof THREE.Vector3, "Object3D.translate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.position.add(delta);
	});
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Object3D.registerInstance('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Object3D.registerInstance('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Object3D.registerInstance('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});


//////////////////////////////////////////////////////////////////////////////////
//		rotation							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('rotation', function(vector3){
	// handle the getter
	if( vector3 === undefined )	return this.get(0).rotation;
	// handle parameters polymorphism
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.rotation parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.copy(vector3);
	})
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.registerInstance('rotationX', function(scalar){
	if( scalar === undefined )	return this.get(0).rotation.x;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.x = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('rotationY', function(scalar){
	if( scalar === undefined )	return this.get(0).rotation.y;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.y = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('rotationZ', function(scalar){
	if( scalar === undefined )	return this.get(0).rotation.z;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.z = scalar;	});
	return this;
});

tQuery.Object3D.registerInstance('rotate', function(angles){
	// handle parameter polymorphism
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(angles instanceof THREE.Vector3, "Object3D.rotate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.add(angles);
	})
	// return this, to get chained API	
	return this;
});


// some shortcuts
tQuery.Object3D.registerInstance('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Object3D.registerInstance('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Object3D.registerInstance('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});

//////////////////////////////////////////////////////////////////////////////////
//		scale								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('scale', function(vector3){
	// handle the getter
	if( vector3 === undefined )	return this.get(0).scale;
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 1 ){
		vector3	= new THREE.Vector3(vector3, vector3, vector3);
	}else if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.scale parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.copy(vector3);
	});
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.registerInstance('scaleX', function(scalar){
	if( scalar === undefined )	return this.get(0).scale.x;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.x = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('scaleY', function(scalar){
	if( scalar === undefined )	return this.get(0).scale.y;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.y = scalar;	});
	return this;
});
tQuery.Object3D.registerInstance('scaleZ', function(scalar){
	if( scalar === undefined )	return this.get(0).scale.z;
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.z = scalar;	});
	return this;
});

tQuery.Object3D.registerInstance('scaleBy', function(ratio){
	// handle parameters
	if( typeof ratio === "number" && arguments.length === 1 ){
		ratio	= new THREE.Vector3(ratio, ratio, ratio);
	}else if( typeof ratio === "number" && arguments.length === 3 ){
		ratio	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(ratio instanceof THREE.Vector3, "Object3D.rotate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.multiply(ratio);
	})
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Object3D.registerInstance('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Object3D.registerInstance('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Object3D.registerInstance('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});
/**
 * Handle light
 *
 * @class include THREE.Texture. It inherit from {@link tQuery.Node}
 * 
 * @borrows tQuery.Node#get as this.get
 * @borrows tQuery.Node#each as this.each
 * @borrows tQuery.Node#back as this.back
 *
 * @param {THREE.Light} object an instance or array of instance
*/
tQuery.Texture	= function(elements)
{
	// call parent ctor
	tQuery.Texture.parent.constructor.call(this, elements)

	// sanity check - all items MUST be THREE.Texture
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Texture); });
};

// inherit from tQuery.Node
tQuery.inherit(tQuery.Texture, tQuery.Node);

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.Texture);

// Make each instances pluginable
tQuery.pluginsInstanceOn(tQuery.Texture);

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Texture, {
	offset	: tQuery.convert.toVector2,
	repeat	: tQuery.convert.toVector2,
});


