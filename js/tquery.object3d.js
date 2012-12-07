/**
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
tQuery.Object3D.prototype.traverseHierarchy	= function(callback){
	this.each(function(object3d){
		THREE.SceneUtils.traverseHierarchy(object3d, function(object3d){
			callback(object3d);
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
	var materials	= [];
	this.each(function(object3d){
		materials.push(object3d.material)
	});
	return new tQuery.Material(materials);
};


/**
 * Clone a Object3D
*/
tQuery.Object3D.prototype.clone	= function(){
	var clones	= [];
	this._lists.forEach(function(object3d){
		var clone	= object3d.clone();
		clones.push(clone);
	})  
	return tQuery(clones)
}

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
		this.each(function(object1){
			object1.add(object3D);
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
