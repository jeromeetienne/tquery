// constructor
tQuery.Object3D	= function(object, root){
	if( typeof object === "string"){
		object	= tQuery.Object3D._select(object, root);
	}
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
};

// handle inheritance - TODO what how jQuery does it 
tQuery.Object3D.prototype = new THREE.Object3D();
tQuery.Object3D.prototype.constructor = tQuery.Object3D;

// Make tQuery.Object3D pluginable
tQuery.Plugins.mixin(tQuery.Object3D);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.prototype.get	= function(idx){
	if( idx === undefined )	return this._lists;

	// sanity check - it MUST be defined
	console.assert(this._lists[idx], "element not defined");
	return this._lists[idx];
};

tQuery.Object3D.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};

//////////////////////////////////////////////////////////////////////////////////
//		geometry and material						//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.prototype.geometry	= function(){
	var geometries	= [];
	this.each(function(object3d){
		geometries.push(object3d.geometry)
	});
	return new tQuery.Geometry(geometries);
};

tQuery.Object3D.prototype.material	= function(){
	var materials	= [];
	this.each(function(object3d){
		materials.push(object3d.material)
	});
	return new tQuery.Material(material);
};

//////////////////////////////////////////////////////////////////////////////////
//		Handle dom attribute						//
//////////////////////////////////////////////////////////////////////////////////

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


tQuery.Object3D.prototype.addClass	= function(className){
	this.each(function(object3d){
		// init ._tqClasses if needed
		object3d._tqClasses	= object3d._tqClasses	|| '';

		if( tQuery.Object3D._hasClassOne(object3d, className) )	return;
		
		object3d._tqClasses	+= ' '+className;
	}.bind(this));
	return this;
};

tQuery.Object3D.prototype.removeClass	= function(className){
	console.assert(false, "not yet implemented")
	return this;
};

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


//////////////////////////////////////////////////////////////////////////////////
//			handling selection					//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D._select	= function(selector, root){
	root		= root	|| scene.scene();	// FIXME scene is global
	var selectItems	= selector.split(' ').filter(function(v){ return v.length > 0;})
	var lists	= this._crawls(root, selectItems)
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

tQuery.Object3D._selectItemMatch	= function(object3d, selectItem)
{
	// sanity check
//console.log("!seleect", arguments)
	console.assert( object3d instanceof THREE.Object3D );
	console.assert( typeof selectItem === 'string' );

	// all the geometries keywords
	// - Object.keys(THREE).filter(function(value){return value.match(/.+Geometry$/);}).map(function(value){ return value.replace(/Geometry$/,'').toLowerCase();});
	var geometries	= ["buffer", "cube", "cylinder", "extrude", "icosahedron", "lathe", "octahedron", "plane", "sphere", "text", "torus", "torusknot"];	

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
		}else if( geometries.indexOf(subItem) !== -1 ){	// Handle geometries
			var geometry	= object3d.geometry;
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Geometry";
			return geometry instanceof THREE[className];
		}else	console.assert(false, "invalid selector: "+subItem);
		return true;
	}.bind(this));
	
	return completed ? true : false;
}
