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
// TODO make tthat cleaner
// - there is a list of functions registered by each plugins
//   - handle() object instanceof THREE.Mesh
//   - create() return new tQuery(object)
// - this list is processed in order here

	if( object instanceof THREE.Mesh  && tQuery.Mesh){
		return new tQuery.Mesh(object);

	}else if( object instanceof THREE.DirectionalLight && tQuery.DirectionalLight){
		return new tQuery.DirectionalLight(object);
	}else if( object instanceof THREE.AmbientLight && tQuery.AmbientLight){
		return new tQuery.AmbientLight(object);
	}else if( object instanceof THREE.Light && tQuery.Light){
		return new tQuery.Light(object);

	}else if( object instanceof THREE.Object3D  && tQuery.Object3D){
		return new tQuery.Object3D(object);
	}else if( object instanceof THREE.Geometry && tQuery.Geometry){
		return new tQuery.Geometry(object);
	}else if( object instanceof THREE.Material && tQuery.Material){
		return new tQuery.Material(object);
	}else if( typeof object === "string" && tQuery.Object3D){
		return new tQuery.Object3D(object, root);
	}else{
		console.assert(false, "unsupported type")
	}
	return undefined;
};

/**
 * The version of tQuery
*/
tQuery.VERSION	= "r49.1";

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
tQuery.extend = function(obj, base){
	var result	= {};
	base && Object.keys(base).forEach(function(key){
		result[key]	= base[key];
	})
	obj && Object.keys(obj).forEach(function(key){
		result[key]	= obj[key];
	})
	return result;
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
	object['register'+fnNameSuffix]		= function(name, funct) {
		if( dest[name] ){
			throw new Error('Conflict! Already method called: ' + name);
		}
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

tQuery.pluginsInstanceOn= function(klass){ return tQuery._pluginsOn(klass);			};
tQuery.pluginsStaticOn	= function(klass){ return tQuery._pluginsOn(klass, klass, 'Static');	};

/** for backward compatibility only */
tQuery.pluginsOn	= function(object, dest){
	console.warn("tQuery.pluginsOn is obsolete. prefere .pluginsInstanceOn, .pluginsStaticOn");
	console.trace();
	return tQuery._pluginsOn(object, dest)
}


// make it pluginable
tQuery.pluginsOn(tQuery, tQuery);

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
	destObj.bind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
		return fct;
	};
	destObj.unbind	= function(event, fct){
		if(this._events === undefined) 	this._events	= {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	};
	destObj.trigger	= function(event /* , args... */){
		if(this._events === undefined) 	this._events	= {};
		if( this._events[event] === undefined )	return;
		var tmpArray	= this._events[event].slice(); 
		for(var i = 0; i < tmpArray.length; i++){
			tmpArray[i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

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

tQuery.convert.toBool	= function(value){
	if( arguments.length === 1 && typeof(value) === 'boolean'){
		return value;
	}else{
		console.assert(false, "invalid parameter");
	}
	return undefined;	// never reached - just to workaround linter complaint
};
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
	if( value ){
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

/**
 * define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.Object3D, {
	receiveShadow	: tQuery.convert.toBool,
	castShadow	: tQuery.convert.toBool
});

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
	var materials	= [];
	this.each(function(object3d){
		materials.push(object3d.material)
	});
	return new tQuery.Material(materials);
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
	this.each(function(object3d){
		target.remove(object3d)
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
tQuery.Object3D.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		this.each(function(object1){
			object3d.each(function(object2){
				object1.add(object2);
			})
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this.each(function(object1){
			object1.add(object3d);
		});
	}else	console.assert(false, "invalid parameter");
	return this;
}

/**
 * remove all matched elements from a world
 * 
 * @param {tQuery.Object3D} object3d the object to add in this object
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.remove	= function(tqObject3d)
{
	console.assert( tqObject3d instanceof tQuery.Object3D )
	this.each(function(object1){
		tqObject3d.each(function(object2){
			object1.remove(object2);
		})
	}.bind(this));
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
	root		= root	|| tQuery.world.scene();
	var selectItems	= selector.split(' ').filter(function(v){ return v.length > 0;})

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
tQuery.pluginsInstanceOn(tQuery.Geometry);/**
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
	transparent	: tQuery.convert.toBool
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


tQuery.Mesh.prototype.material	= function(value){
	var parent	= tQuery.Mesh.parent;
	// handle the getter case
	if( value == undefined )	return parent.material.call(this);
	// handle the setter case
	this.each(function(tMesh){
		tMesh.material	= value;
	});
	return this;	// for the chained API
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle world (aka scene+camera+renderer)
 *
 * @class youpla
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
	tQuery.world	= this;


	this._autoRendering	= true;
	
	// create a scene
	this._scene	= opts.scene	||(new THREE.Scene());

 	// create a camera in the scene
	if( !opts.camera ){
		this._camera	= new THREE.PerspectiveCamera(35, opts.renderW / opts.renderH, 0.01, 10000 );
		this._camera.position.set(0, 0, 3);
		this._scene.add(this._camera);
	}else{
		this._camera	= opts.camera;
	}
	
	// create the loop
	this._loop	= new tQuery.Loop();

	// hook the render function in this._loop
	this._loop.hookOnRender(this._$loopCb = function(){
		this.render();
	}.bind(this));

	// create a renderer
	if( opts.renderer ){
		this._renderer	= opts.renderer;
	}else if( tQuery.World.hasWebGL() ){
		this._renderer	= new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
	}else if( !opts.webGLNeeded ){
		this._renderer	= new THREE.CanvasRenderer();
	}else{
		this._addGetWebGLMessage();
		throw new Error("WebGL required and not available")
	}
	this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	this._renderer.setSize( opts.renderW, opts.renderH );
};

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.World);

// make it eventable
tQuery.MicroeventMixin(tQuery.World.prototype)


tQuery.World.prototype.destroy	= function(){
	// microevent.js notification
	this.trigger('destroy');
	// unhook the render function in this._loop
	this._loop.hookOnRender(this._$loopCb);
	// destroy the loop
	this._loop.destroy();
	// remove this._cameraControls if needed
	this.removeCameraControls();
	// remove renderer element
	var parent	= this._renderer.domElement.parentElement;
	parent	&& parent.removeChild(this._renderer.domElement);
	
	// clear the global if needed
	if( tQuery.world === this )	tQuery.world = null;
}

//////////////////////////////////////////////////////////////////////////////////
//		WebGL Support							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * true if webgl is available, false otherwise
*/
tQuery.World._hasWebGL	= (function(){
	// test from Detector.js
	try{
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	} catch( e ){
		return false;
	}
})();

/**
 * @returns {Boolean} true if webgl is available, false otherwise
*/
tQuery.World.hasWebGL	= function(){
	return tQuery.World._hasWebGL;
};

/**
*/
tQuery.World.prototype._addGetWebGLMessage	= function(parent)
{
	parent	= parent || document.body;
	
	// message directly taken from Detector.js
	var domElement = document.createElement( 'div' );
	domElement.style.fontFamily = 'monospace';
	domElement.style.fontSize = '13px';
	domElement.style.textAlign = 'center';
	domElement.style.background = '#eee';
	domElement.style.color = '#000';
	domElement.style.padding = '1em';
	domElement.style.width = '475px';
	domElement.style.margin = '5em auto 0';
	domElement.innerHTML = window.WebGLRenderingContext ? [
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

tQuery.World.prototype.setCameraControls	= function(control){
	if( this.hasCameraControls() )	this.removeCameraControls();
	this._cameraControls	= control;
	return this;	// for chained API
};

tQuery.World.prototype.removeCameraControls	= function(){
	if( this.hasCameraControls() === false )	return this;
	this._cameraControls	= undefined;
	return this;	// for chained API
};

tQuery.World.prototype.getCameraControls	= function(){
	return this._cameraControls;
};

tQuery.World.prototype.hasCameraControls	= function(){
	return this._cameraControls !== undefined ? true : false;
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
			this._scene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.add(object3d)		
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
			this._scene.remove(object3d)
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.remove(object3d)
	}else	console.assert(false, "invalid type");
	// for chained API
	return this;
}

tQuery.World.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
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

tQuery.World.prototype.loop	= function(){ return this._loop;	}

tQuery.World.prototype.tRenderer= function(){ return this._renderer;	}
tQuery.World.prototype.tCamera	= function(){ return this._camera;	}
tQuery.World.prototype.tScene	= function(){ return this._scene;	}


// backward compatible functions to remove
tQuery.World.prototype.renderer	= function(){  console.trace();console.warn("world.renderer() is ovbslete, use .tRenderer() instead");
						return this._renderer;	}
tQuery.World.prototype.camera	= function(){ console.trace();console.warn("world.camera() is obsolete, use .tCamerar() instead");
						return this._camera;	}
tQuery.World.prototype.scene	= function(){ console.trace();console.warn("world.scene() is obsolete, use .tScene() instead");
						return this._scene;	}
tQuery.World.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.prototype.autoRendering	= function(value){
	if(value === undefined)	return this._autoRendering;
	this._autoRendering	= value;
	return this;
}


tQuery.World.prototype.render	= function()
{
	// update the cameraControl
	if( this.hasCameraControls() )	this._cameraControls.update();
	// render the scene 
	if( this._autoRendering )	this._renderer.render( this._scene, this._camera );
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

tQuery.Loop.prototype._onAnimationFrame	= function(time)
{
	// loop on request animation loop
	// - it has to be at the begining of the function
	// - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	this._timerId	= requestAnimationFrame( this._onAnimationFrame.bind(this) );

	// update time values
	var now		= time/1000;
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

tQuery.Loop.prototype.PRE_RENDER		= 20;
tQuery.Loop.prototype.ON_RENDER		= 50;
tQuery.Loop.prototype.POST_RENDER	= 80;

/**
 * hook a callback at a given priority
 *
 * @param {Number} priority for this callback
 * @param {Function} callback the function which will be called function(time){}
 * @returns {tQuery.Loop} chained API
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
	// for chained API
	return this;
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
	// handle parameters
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
tQuery.register('createWorld', function(opts){
	return new tQuery.World(opts);
});

/**
 * Create tQuery.World
*/
tQuery.register('createObject3D', function(){
	var object3d	= new THREE.Object3D();
	return tQuery(object3d);
});


/**
 * Create tQuery.loop
 * 
 * @param {tQuery.World} world the world to display (optional)
 * @function
*/
tQuery.register('createLoop', function(world){
	return new tQuery.Loop(world);
});


tQuery.register('createDirectionalLight', function(){
	var tLight	= new THREE.DirectionalLight(0xFFFFFF * Math.random());
	tLight.position.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
	return tQuery(tLight);
});

tQuery.register('createSpotLight', function(){
	var tLight	= new THREE.SpotLight(0xFFFFFF * Math.random());
	tLight.position.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
	return tQuery(tLight);
});

tQuery.register('createAmbientLight', function(){
	var tLight	= new THREE.AmbientLight(0xFFFFFF);
	return tQuery(tLight);
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
tQuery.register('defaultObject3DMaterial', new THREE.MeshNormalMaterial());

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
tQuery.register('createCube', function(){
	var ctor	= THREE.CubeGeometry;
	var dflGeometry	= [1, 1, 1];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createTorus', function(){
	var ctor	= THREE.TorusGeometry;
	var dflGeometry	= [0.5-0.15, 0.15];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createSphere', function(){
	var ctor	= THREE.SphereGeometry;
	var dflGeometry	= [0.5, 32, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createPlane', function(){
	var ctor	= THREE.PlaneGeometry;
	var dflGeometry	= [1, 1, 16, 16];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('createCylinder', function(){
	var ctor	= THREE.CylinderGeometry;
	var dflGeometry	= [0.5, 0.5, 1, 16, 4];
	return this._createMesh(ctor, dflGeometry, arguments)
});

tQuery.register('_createMesh', function(ctor, dflGeometry, args)
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

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/100);
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
	shadowMapWidth		: tQuery.convert.toInteger,
	shadowMapHeight		: tQuery.convert.toInteger,
	shadowCameraRight	: tQuery.convert.toNumber,
	shadowCameraLeft	: tQuery.convert.toNumber,
	shadowCameraTop		: tQuery.convert.toNumber,
	shadowCameraBottom	: tQuery.convert.toNumber,
	shadowCameraVisible	: tQuery.convert.toBool,
	
	shadowCameraNear	: tQuery.convert.toNumber,
	shadowCameraFar		: tQuery.convert.toNumber
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

	shadowDarkness		: tQuery.convert.toNumberZeroToOne,
	shadowMapWidth		: tQuery.convert.toInteger,
	shadowMapHeight		: tQuery.convert.toInteger,
	shadowCameraRight	: tQuery.convert.toNumber,
	shadowCameraLeft	: tQuery.convert.toNumber,
	shadowCameraTop		: tQuery.convert.toNumber,
	shadowCameraBottom	: tQuery.convert.toNumber,
	shadowCameraVisible	: tQuery.convert.toBool
});


/**
 * @fileOverview Plugins for tQuery.Geometry: tool box to play with geometry
*/

(function(){	// TODO why is there a closure here ?

//////////////////////////////////////////////////////////////////////////////////
//		Size functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('computeAll', function(){
	this.each(function(tGeometry){
		tGeometry.computeBoundingBox();
		tGeometry.computeCentroids();
		tGeometry.computeFaceNormals();
		tGeometry.computeVertexNormals();
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
tQuery.Geometry.register('scaleBy', function(vector3){
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
			vertex.multiplySelf(vector3); 
		}
		// mark the vertices as dirty
		geometry.verticesNeedUpdate = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.register('size', function(){
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
tQuery.Geometry.register('normalize', function(){
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


tQuery.Geometry.register('middlePoint', function(){
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

tQuery.Geometry.register('translate', function(delta){
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
			vertex.addSelf(delta); 
		}
		// mark the vertices as dirty
		geometry.verticesNeedUpdate = true;
		geometry.computeBoundingBox();
	})

	// return this, to get chained API	
	return this;
});

tQuery.Geometry.register('rotate', function(angles, order){
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
tQuery.Geometry.register('center', function(noX, noY, noZ){
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
tQuery.Geometry.register('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Geometry.register('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Geometry.register('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});
tQuery.Geometry.register('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Geometry.register('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Geometry.register('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});
tQuery.Geometry.register('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Geometry.register('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Geometry.register('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});

// backward compatibility
tQuery.Geometry.register('zoom'		, function(value){return this.scaleBy(value);		});
tQuery.Geometry.register('zoomX'	, function(ratio){ return this.zoom(ratio, 1, 1);	});
tQuery.Geometry.register('zoomY'	, function(ratio){ return this.zoom(1, ratio, 1);	});
tQuery.Geometry.register('zoomZ'	, function(ratio){ return this.zoom(1, 1, ratio);	});


})();	// closure function end
/**
 * @fileOverview Plugins for tQuery.Object3D to play with .position/.rotation/.scale
*/

(function(){	// TODO why is there a closure here ?

//////////////////////////////////////////////////////////////////////////////////
//		set function							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('scale', function(scale){
	// handle parameters
	if( typeof scale === "number" && arguments.length === 1 ){
		scale	= new THREE.Vector3(scale, scale, scale);
	}else if( typeof scale === "number" && arguments.length === 3 ){
		scale	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(scale instanceof THREE.Vector3, "Geometry.scale parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.copy(scale);
	});

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('position', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.position parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.position.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('rotation', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.rotation parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

//////////////////////////////////////////////////////////////////////////////////
//		add function							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(delta instanceof THREE.Vector3, "Object3D.translate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.position.addSelf(delta);
	})

	// return this, to get chained API	
	return this;
});


tQuery.Object3D.register('rotate', function(angles){
	// handle parameters
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(angles instanceof THREE.Vector3, "Object3D.rotate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.addSelf(angles);
	})

	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('scaleBy', function(ratio){
	// handle parameters
	if( typeof ratio === "number" && arguments.length === 1 ){
		ratio	= new THREE.Vector3(ratio, ratio, ratio);
	}else if( typeof ratio === "number" && arguments.length === 3 ){
		ratio	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(ratio instanceof THREE.Vector3, "Object3D.rotate parameter error");

	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.multiplySelf(ratio);
	})

	// return this, to get chained API	
	return this;
});


// some shortcuts
tQuery.Object3D.register('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Object3D.register('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Object3D.register('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});
tQuery.Object3D.register('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Object3D.register('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Object3D.register('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});
tQuery.Object3D.register('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Object3D.register('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Object3D.register('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});

// backward compatibility
tQuery.Object3D.register('zoom'		, function(value){ return this.scaleBy(value);		});
tQuery.Object3D.register('zoomX'	, function(ratio){ return this.zoom(ratio, 1, 1);	});
tQuery.Object3D.register('zoomY'	, function(ratio){ return this.zoom(1, ratio, 1);	});
tQuery.Object3D.register('zoomZ'	, function(ratio){ return this.zoom(1, 1, ratio);	});

})();	// closure function end
// backward compatibility only
tQuery.World.register('fullpage', function(){
	console.log("world.fullpage() is obsolete. use world.boilerplate() instead.");
	return this.boilerplate();
});

tQuery.World.register('boilerplate', function(opts){
	// put renderer fullpage
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	this.appendTo(domElement);
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
	
	// add the boilerplate
	this.addBoilerplate(opts);
	
	// for chained API
	return this;
});

tQuery.World.register('addBoilerplate', function(opts){
	var _this	= this;
	// sanity check - no boilerplate is already installed
	console.assert( this.hasBoilerplate() !== true );
	// handle parameters	
	opts	= tQuery.extend(opts, {
		honorInfo	: true,
		stats		: true,
		cameraControls	: true,
		windowResize	: true,
		screenshot	: true,
		fullscreen	: true
	});
	// get the context
	var ctx	= {};

	// create the context
	tQuery.data(this, '_boilerplateCtx', ctx);

	// add css for the info element if any
	if( opts.honorInfo ){
		var element	= document.getElementById('info');
		if( element ){
			element.style.position	= "absolute";
			element.style.width	= "100%";
			element.style.textAlign	= "center";
		}
	}


	// get some variables
	var tCamera	= this.tCamera();
	var tRenderer	= this.tRenderer();

	// add Stats.js - https://github.com/mrdoob/stats.js
	if( opts.stats ){
		ctx.stats	= new Stats();
		ctx.stats.domElement.style.position	= 'absolute';
		ctx.stats.domElement.style.bottom	= '0px';
		tRenderer.domElement.parentNode && tRenderer.domElement.parentNode.appendChild( ctx.stats.domElement );
		ctx.loopStats	= function(){
			ctx.stats.update();
		};
		this.loop().hook(ctx.loopStats);		
	}

	// create a camera contol
	if( opts.cameraControls ){
		ctx.cameraControls	= new THREEx.DragPanControls(tCamera);
		this.setCameraControls(ctx.cameraControls);		
	}

	// transparently support window resize
	if( opts.windowResize ){
		ctx.windowResize	= THREEx.WindowResize.bind(tRenderer, tCamera);		
	}
	// allow 'p' to make screenshot
	if( opts.screenshot ){		
		ctx.screenshot		= THREEx.Screenshot.bindKey(tRenderer);
	}
	// allow 'f' to go fullscreen where this feature is supported
	if( opts.fullscreen && THREEx.FullScreen.available() ){
		ctx.fullscreen	= THREEx.FullScreen.bindKey();		
	}

	// bind 'destroy' event on tQuery.world
	ctx._$onDestroy	= this.bind('destroy', function(){
		if( this.hasBoilerplate() === false )	return;
		this.removeBoilerplate();	
	});
	
	// for chained API
	return this;
});

tQuery.World.register('hasBoilerplate', function(){
	// get the context
	var ctx	= tQuery.data(this, "_boilerplateCtx")
	// return true if ctx if defined, false otherwise
	return ctx === undefined ? false : true;
});

tQuery.World.register('removeBoilerplate', function(){
	// get context
	var ctx	= tQuery.data(this, '_boilerplateCtx');
	// if not present, return now
	if( ctx === undefined )	return	this;
	// remove the context from this
	tQuery.removeData(this, '_boilerplateCtx');

	// unbind 'destroy' for tQuery.World
	this.unbind('destroy', this._$onDestroy);

	// remove stats.js
	ctx.stats		&& document.body.removeChild(ctx.stats.domElement );
	ctx.stats		&& this.loop().unhook(ctx.loopStats);
	// remove camera
	ctx.cameraControls	&& this.removeCameraControls()
	// stop windowResize
	ctx.windowResize	&& ctx.windowResize.stop();
	// unbind screenshot
	ctx.screenshot		&& ctx.screenshot.unbind();
	// unbind fullscreen
	ctx.fullscreen		&& ctx.fullscreen.unbind();
});// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}

THREEx.WindowResize.bind	= function(renderer, camera){
	return THREEx.WindowResize(renderer, camera);
}
/** @namespace */
var THREEx	= THREEx 		|| {};

// TODO http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
// able to upload your screenshot without running servers

// forced closure
(function(){

	/**
	 * Take a screenshot of a renderer
	 * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
	 * - TODO is it possible to check if this variable is set ? if so check it
	 *   and make advice in the console.log
	 *   - maybe with direct access to the gl context...
	 * 
	 * @param {Object} renderer to use
	 * @param {String} mimetype of the output image. default to "image/png"
	 * @param {String} dataUrl of the image
	*/
	var toDataURL	= function(renderer, mimetype)
	{
		mimetype	= mimetype	|| "image/png";
		var dataUrl	= renderer.domElement.toDataURL(mimetype);
		return dataUrl;
	}

	/**
	 * resize an image to another resolution while preserving aspect
	 *
	 * @param {String} srcUrl the url of the image to resize
	 * @param {Number} dstWidth the destination width of the image
	 * @param {Number} dstHeight the destination height of the image
	 * @param {Number} callback the callback to notify once completed with callback(newImageUrl)
	*/
	var _aspectResize	= function(srcUrl, dstW, dstH, callback){
		// to compute the width/height while keeping aspect
		var cpuScaleAspect	= function(maxW, maxH, curW, curH){
			var ratio	= curH / curW;
			if( curW >= maxW && ratio <= 1 ){ 
				curW	= maxW;
				curH	= maxW * ratio;
			}else if(curH >= maxH){
				curH	= maxH;
				curW	= maxH / ratio;
			}
			return { width: curW, height: curH };
		}
		// callback once the image is loaded
		var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onLoad	= __bind(function(){
			// init the canvas
			var canvas	= document.createElement('canvas');
			canvas.width	= dstW;	canvas.height	= dstH;
			var ctx		= canvas.getContext('2d');

			// TODO is this needed
			ctx.fillStyle	= "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// scale the image while preserving the aspect
			var scaled	= cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);

			// actually draw the image on canvas
			var offsetX	= (canvas.width  - scaled.width )/2;
			var offsetY	= (canvas.height - scaled.height)/2;
			ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

			// dump the canvas to an URL		
			var mimetype	= "image/png";
			var newDataUrl	= canvas.toDataURL(mimetype);
			// notify the url to the caller
			callback && callback(newDataUrl)
		}, this);

		// Create new Image object
		var image 	= new Image();
		image.onload	= onLoad;
		image.src	= srcUrl;
	}
	

	// Super cooked function: THREEx.Screenshot.bindKey(renderer)
	// and you are done to get screenshot on your demo

	/**
	 * Bind a key to renderer screenshot
	*/
	var bindKey	= function(renderer, opts){
		// handle parameters
		opts		= opts		|| {};
		var charCode	= opts.charCode	|| 'p'.charCodeAt(0);
		var width	= opts.width;
		var height	= opts.height;
		var callback	= opts.callback	|| function(url){
			window.open(url, "name-"+Math.random());
		};

		// callback to handle keypress
		var __bind	= function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
		var onKeyPress	= __bind(function(event){
			// return now if the KeyPress isnt for the proper charCode
			if( event.which !== charCode )	return;
			// get the renderer output
			var dataUrl	= this.toDataURL(renderer);

			if( width === undefined && height === undefined ){
				callback( dataUrl )
			}else{
				// resize it and notify the callback
				// * resize == async so if callback is a window open, it triggers the pop blocker
				_aspectResize(dataUrl, width, height, callback);				
			}
		}, this);

		// listen to keypress
		// NOTE: for firefox it seems mandatory to listen to document directly
		document.addEventListener('keypress', onKeyPress, false);

		return {
			unbind	: function(){
				document.removeEventListener('keypress', onKeyPress, false);
			}
		};
	}

	// export it	
	THREEx.Screenshot	= {
		toDataURL	: toDataURL,
		bindKey		: bindKey
	};
})();
// This THREEx helper makes it easy to handle the fullscreen API
// * it hides the prefix for each browser
// * it hides the little discrepencies of the various vendor API
// * at the time of this writing (nov 2011) it is available in 
//   [firefox nightly](http://blog.pearce.org.nz/2011/11/firefoxs-html-full-screen-api-enabled.html),
//   [webkit nightly](http://peter.sh/2011/01/javascript-full-screen-api-navigation-timing-and-repeating-css-gradients/) and
//   [chrome stable](http://updates.html5rocks.com/2011/10/Let-Your-Content-Do-the-Talking-Fullscreen-API).

// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};
THREEx.FullScreen	= THREEx.FullScreen	|| {};

/**
 * test if it is possible to have fullscreen
 * 
 * @returns {Boolean} true if fullscreen API is available, false otherwise
*/
THREEx.FullScreen.available	= function()
{
	return this._hasWebkitFullScreen || this._hasMozFullScreen;
}

/**
 * test if fullscreen is currently activated
 * 
 * @returns {Boolean} true if fullscreen is currently activated, false otherwise
*/
THREEx.FullScreen.activated	= function()
{
	if( this._hasWebkitFullScreen ){
		return document.webkitIsFullScreen;
	}else if( this._hasMozFullScreen ){
		return document.mozFullScreen;
	}else{
		console.assert(false);
	}
}

/**
 * Request fullscreen on a given element
 * @param {DomElement} element to make fullscreen. optional. default to document.body
*/
THREEx.FullScreen.request	= function(element)
{
	element	= element	|| document.body;
	if( this._hasWebkitFullScreen ){
		element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	}else if( this._hasMozFullScreen ){
		element.mozRequestFullScreen();
	}else{
		console.assert(false);
	}
}

/**
 * Cancel fullscreen
*/
THREEx.FullScreen.cancel	= function()
{
	if( this._hasWebkitFullScreen ){
		document.webkitCancelFullScreen();
	}else if( this._hasMozFullScreen ){
		document.mozCancelFullScreen();
	}else{
		console.assert(false);
	}
}


// internal functions to know which fullscreen API implementation is available
THREEx.FullScreen._hasWebkitFullScreen	= 'webkitCancelFullScreen' in document	? true : false;	
THREEx.FullScreen._hasMozFullScreen	= 'mozCancelFullScreen' in document	? true : false;	

/**
 * Bind a key to renderer screenshot
*/
THREEx.FullScreen.bindKey	= function(opts){
	opts		= opts		|| {};
	var charCode	= opts.charCode	|| 'f'.charCodeAt(0);
	var dblclick	= opts.dblclick !== undefined ? opts.dblclick : false;
	var element	= opts.element

	var toggle	= function(){
		if( THREEx.FullScreen.activated() ){
			THREEx.FullScreen.cancel();
		}else{
			THREEx.FullScreen.request(element);
		}		
	}

	// callback to handle keypress
	var __bind	= function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	var onKeyPress	= __bind(function(event){
		// return now if the KeyPress isnt for the proper charCode
		if( event.which !== charCode )	return;
		// toggle fullscreen
		toggle();
	}, this);

	// listen to keypress
	// NOTE: for firefox it seems mandatory to listen to document directly
	document.addEventListener('keypress', onKeyPress, false);
	// listen to dblclick
	dblclick && document.addEventListener('dblclick', toggle, false);

	return {
		unbind	: function(){
			document.removeEventListener('keypress', onKeyPress, false);
			dblclick && document.removeEventListener('dblclick', toggle, false);
		}
	};
}
/** @namespace */
var THREEx	= THREEx 		|| {};

THREEx.DragPanControls	= function(object, domElement)
{
	this._object	= object;
	this._domElement= domElement || document;

	// parameters that you can change after initialisation
	this.target	= new THREE.Vector3(0, 0, 0);
	this.speedX	= 0.03;
	this.speedY	= 0.03;
	this.rangeX	= -40;
	this.rangeY	= +40;

	// private variables
	this._mouseX	= 0;
	this._mouseY	= 0;

	var _this	= this;
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments); };
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments); };
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments); };

	this._domElement.addEventListener( 'mousemove', this._$onMouseMove, false );
	this._domElement.addEventListener( 'touchstart', this._$onTouchStart,false );
	this._domElement.addEventListener( 'touchmove', this._$onTouchMove, false );
}

THREEx.DragPanControls.prototype.destroy	= function()
{
	this._domElement.removeEventListener( 'mousemove', this._$onMouseMove, false );
	this._domElement.removeEventListener( 'touchstart', this._$onTouchStart,false );
	this._domElement.removeEventListener( 'touchmove', this._$onTouchMove, false );
}

THREEx.DragPanControls.prototype.update	= function(event)
{
	this._object.position.x += ( this._mouseX * this.rangeX - this._object.position.x ) * this.speedX;
	this._object.position.y += ( this._mouseY * this.rangeY - this._object.position.y ) * this.speedY;
	this._object.lookAt( this.target );
}

THREEx.DragPanControls.prototype._onMouseMove	= function(event)
{
	this._mouseX	= ( event.clientX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.clientY / window.innerHeight) - 0.5;
}

THREEx.DragPanControls.prototype._onTouchStart	= function(event)
{
	if( event.touches.length != 1 )	return;

	// no preventDefault to get click event on ios

	this._mouseX	= ( event.touches[ 0 ].pageX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.touches[ 0 ].pageY / window.innerHeight) - 0.5;
}

THREEx.DragPanControls.prototype._onTouchMove	= function(event)
{
	if( event.touches.length != 1 )	return;

	event.preventDefault();

	this._mouseX	= ( event.touches[ 0 ].pageX / window.innerWidth ) - 0.5;
	this._mouseY	= ( event.touches[ 0 ].pageY / window.innerHeight) - 0.5;
}

// stats.js r8 - http://github.com/mrdoob/stats.js
var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};

