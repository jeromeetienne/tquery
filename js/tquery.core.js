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
tQuery.VERSION	= "r53.0";

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
		var keepLooping	= callback(arr[i])
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

// make it pluginable
tQuery.pluginsStaticOn(tQuery, tQuery);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.mixinAttributes	= function(dstObject, properties){
	// mixin the new property
	// FIXME the inheritance should work now... not sure
	dstObject.prototype._attrProps	= tQuery.extend(dstObject.prototype._attrProps, properties);

	dstObject.prototype.attr	= function(name, value){
		// handle parameters
		if( name instanceof Object && value === undefined ){
			Object.keys(name).forEach(function(key){
				this.attr(key, name[key]);
			}.bind(this));
		}else if( typeof(name) === 'string' ){
			console.assert( Object.keys(this._attrProps).indexOf(name) !== -1, 'invalid property name:'+name);
		}else	console.assert(false, 'invalid parameter');

		// handle setter
		if( value !== undefined ){
			var convertFn	= this._attrProps[name];
			value		= convertFn(value);
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
		dstObject.prototype[name]	= function(value){
			return this.attr(name, value);
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
			tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
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
		this.trigger.apply(this, arguments)
		return this;
	}
};

