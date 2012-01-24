
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
// constructor
tQuery.Geometry	= function(object){
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
	// sanity check - all items MUST be THREE.Geometery
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Geometry);	});
	
	// compute bounding boxes
	this.each(function(geometry){
		geometry.computeBoundingBox();
	});
};

// make it pluginable
tQuery.Plugins.mixin(tQuery.Geometry);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.prototype.get	= function(idx){
	// sanity check - it MUST be defined
	console.assert(this._lists[idx]);
	return this._lists[idx];
};

tQuery.Geometry.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};


// constructor
tQuery.Material	= function(object){
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
	// sanity check - all items MUST be THREE.Geometery
	this._lists.forEach(function(item){ console.assert(item instanceof THREE.Material); });
};

// handle inheritance - TODO what how jQuery does it 
tQuery.Material.prototype = new THREE.Material();
tQuery.Material.prototype.constructor = tQuery.Material;

tQuery.Plugins.mixin(tQuery.Material, tQuery.Material.prototype);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Material.prototype.get	= function(idx){
	// sanity check - it MUST be defined
	console.assert(this._lists[idx]);
	return this._lists[idx];
};

tQuery.Material.prototype.each	= function(callback){
	for(var i = 0; i < this._lists.length; i++){
		var object3d	= this._lists[i];
		var keepLooping	= callback(object3d)
		if( keepLooping === false )	return false;
	}
	return true;
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// constructor
tQuery.Scene	= function(){
	// create a scene
	this._scene	= new THREE.Scene();

	// create a renderer
	if( Detector.webgl ){
		this._renderer = new THREE.WebGLRenderer({
			antialias		: true,	// to get smoother output
			preserveDrawingBuffer	: true	// to allow screenshot
		});
		this._renderer.setClearColorHex( 0xBBBBBB, 1 );
	// uncomment if webgl is required
	//}else{
	//	Detector.addGetWebGLMessage();
	//	return true;
	}else{
		this._renderer	= new THREE.CanvasRenderer();
	}
	// FIXME this window dimension is crap
	this._renderer.setSize( window.innerWidth, window.innerHeight );

	// create a camera in the scene
	// FIXME this window dimension is crap
	this._camera	= new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
	this._camera.position.set(0, 0, 5);
	this._scene.add(this._camera);
};

// make it pluginable
tQuery.Plugins.mixin(tQuery.Scene);


tQuery.Scene.prototype.destroy	= function()
{
	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.add	= function(object3d)
{
	// TODO make objects3d a possible array
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.add(object3d)
	// for chained API
	return this;
}
tQuery.Scene.prototype.remove	= function(object3d)
{
	console.assert(object3d instanceof THREE.Object3D)
	this._scene.remove(object3d)
	// for chained API
	return this;
}

tQuery.Scene.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	// for chained API
	return this;
}

tQuery.Scene.prototype.renderer	= function(){ return this._renderer;	}
tQuery.Scene.prototype.camera	= function(){ return this._camera;	}
tQuery.Scene.prototype.scene	= function(){ return this._scene;	}
tQuery.Scene.prototype.get	= function(){ return this._scene;	}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.render	= function()
{
	// actually render the scene
	this._renderer.render( this._scene, this._camera );
}
require([
	"../js/tquery.core.js",
], function(){

	//tQuery.register('create', function(){
	//	console.log("creation")
	//});

	tQuery.register('create', {
		scene	: function(){
			console.assert( tQuery.Scene )
			return new tQuery.Scene();
		}
	});

});	// require.js endrequire([
	"../js/tquery.geometry.js",
], function(){

//////////////////////////////////////////////////////////////////////////////////
//		Size functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('scale', function(scale){
	// handle parameters
	if( typeof scale === "number" && arguments.length === 1 ){
		scale	= new THREE.Vector3(scale, scale, scale);
	}else if( typeof scale === "number" && arguments.length === 3 ){
		scale	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(scale instanceof THREE.Vector3, "Geometry.scale parameter error");

	// change all geometry.vertices
	this.each(function(geometry){
		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.position.multiplySelf(scale); 
		}
		// mark the vertices as dirty
		geometry.__dirtyVertices = true;
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
			node.scale(1/size.x);
		}else if( size.y >= size.x && size.y >= size.z ){
			node.scale(1/size.y);
		}else{
			node.scale(1/size.z);
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
			vertex.position.addSelf(delta); 
		}
		// mark the vertices as dirty
		geometry.__dirtyVertices = true;
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
		geometry.__dirtyVertices = true;
		geometry.computeBoundingBox();
	});

	// return this, to get chained API	
	return this;
});

/**
*/
tQuery.Geometry.register('center', function(noX, noY, noZ){
	// change all geometry.vertices
	this.each(function(geometry){
		// compute delta
		var delta	= this.middlePoint().negate();
		if( noX )	delta.x	= 0;
		if( noY )	delta.y	= 0;
		if( noZ )	delta.z	= 0;

		return this.translate(delta)
	});
	// return this, to get chained API	
	return this;
});


});	// require.js end