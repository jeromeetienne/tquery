
/**
 * @fileOverview This file is the core of tQuery library. 
*/

/**
 * Create a tQuery element
 *
 * @class root class
 * 
 * - do something for crawling the three
 *   - like python.walk ?
 * - docs with jsdoc
 *   - http://www.thebrightlines.com/2010/05/06/new-template-for-jsdoctoolkit-codeview/
 *
 * 
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
var tQuery	= function(object, root)
{
	if( object instanceof THREE.Object3D  && tQuery.Object3D){
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
tQuery.VERSION	= "0.0.1";

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
	var tempFn		= function() {};
	tempFn.prototype	= parentClass.prototype;
	childClass.prototype	= new tempFn();

	childClass.prototype.parent	= parentClass.prototype;
	childClass.prototype.constructor= childClass;	
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Make an object pluginable
 * 
 * @param {Object} object the object on which you mixin function
 * @param {Object} dest the object in which to register the plugin
*/
tQuery.pluginsMixin	= function(object, dest){
	dest	= dest	|| object.prototype || object;
	object.register	= function(name, funct) {
		if( dest[name] ){
			throw new Error('Conflict! Already method called: ' + name);
		}
		dest[name]	= funct;
	};
	object.unregister	= function(name){
		if( dest.hasOwnProperty(name) === false ){
			throw new Error('Plugin not found: ' + name);
		}
		delete dest[name];
	};
	object.registered	= function(name){
		return dest.hasOwnProperty(name) === true;
	}
};


// make it pluginable
tQuery.pluginsMixin(tQuery, tQuery);


/**
 * @fileOverview plugins for tQuery.core to help creation of object
*/

/**
 * Create tQuery.Scene
*/
tQuery.register('createScene', function(){
	return new tQuery.Scene();
});

/**
 * Create tQuery.loop
 * 
 * @param {THREE.Scene} scene the scene to display (optional)
 * @function
*/
tQuery.register('createLoop', function(scene){
	return new tQuery.Loop(scene);
});

/**
 * Create a cube
 * 
 * @returns {tQuery.Object3D} a tQuery.Object3D containing it
*/
tQuery.register('createCube', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.CubeGeometry(1,1,1);
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createTorus', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.TorusGeometry( 0.5-0.15, 0.15 );
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createSphere', function(){
	var material	= new THREE.MeshNormalMaterial();
	var geometry	= new THREE.SphereGeometry( 0.5, 0.5 );
	geometry.dynamic= true;
	var mesh	= new THREE.Mesh(geometry, material)
	return tQuery(mesh);
});

tQuery.register('createAxis', function(){
	var axis	= new THREE.AxisHelper();
	axis.scale.multiplyScalar(1/40);
	return tQuery(axis);
});
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
	for(var i = 0; i < this._lists.length; i++){
		var element	= this._lists[i];
		var keepLooping	= callback(element);
		if( keepLooping === false )	return false;
	}
	return true;
};

/**
 * getter/setter of the back pointer
 *
 * @param {Object} back the value to return when .back() is called. optional
*/
tQuery.Node.prototype.back	= function(value)
{
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
};



/**
 * Handle object3D
 *
 * @class include THREE.Object3D
 *
 * @param {} object
 * @param {THREE.Object3D} rootnode
 * @returns {tQuery.*} the tQuery object created
*/
tQuery.Object3D	= function(object, root){
	if( typeof object === "string"){
		object	= tQuery.Object3D._select(object, root);
	}
	this._lists	= object instanceof Array ? object : [object];
	this.length	= this._lists.length;
};


// Make tQuery.Object3D pluginable
tQuery.pluginsMixin(tQuery.Object3D);


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Retrieve the elements matched by the jQuery object
 * 
 * @param {Function} callback the function to notify. function(element){ }.
 * 			loop interrupted if it returns false
 * 
 * @returns {Boolean} return true if completed, false if interrupted
*/
tQuery.Object3D.prototype.get	= function(idx){
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

/**
 * get geometry.
 * 
 * @returns {tQuery.Geometry} return the geometries from the tQuery.Object3D
*/
tQuery.Object3D.prototype.geometry	= function(){
	var geometries	= [];
	this.each(function(object3d){
		geometries.push(object3d.geometry)
	});
	return new tQuery.Geometry(geometries).back(this);
};

/**
 * get material.
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
//			handling selection					//
//////////////////////////////////////////////////////////////////////////////////

/**
 * add all matched elements to a scene
 * 
 * @param {tQuery.Scene} scene to which add it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.addTo	= function(scene)
{
	console.assert( scene instanceof tQuery.Scene )
	this.each(function(object3d){
		scene.add(object3d)
	}.bind(this));
	return this;
}

/**
 * remove all matched elements from a scene
 * 
 * @param {tQuery.Scene} scene from which remove it
 * @returns {tQuery.Object3D} chained API
*/
tQuery.Object3D.prototype.removeFrom	= function(scene)
{
	console.assert( scene instanceof tQuery.Scene )
	this.each(function(object3d){
		scene.remove(object3d)
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
	this.each(function(object3d){
		// init ._tqClasses if needed
		object3d._tqClasses	= object3d._tqClasses	|| '';

		if( tQuery.Object3D._hasClassOne(object3d, className) )	return;
		
		object3d._tqClasses	+= ' '+className;
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
	console.assert(false, "not yet implemented")
	return this;
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


//////////////////////////////////////////////////////////////////////////////////
//			handling selection					//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D._select	= function(selector, root){
	root		= root	|| tQuery.scene.scene();	// FIXME scene is global
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
	this.parent.constructor.call(this, object)

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
tQuery.pluginsMixin(tQuery.Geometry);/**
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
	this.parent.constructor.call(this, object)

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
tQuery.pluginsMixin(tQuery.Material);//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle scene
 *
 * @class include THREE.Material
 *
 * @param {THREE.Material} object an instance or an array of instance
*/
tQuery.Scene	= function()
{
	// update default scene.
	// - TODO no sanity check ?
	tQuery.scene	= this;
	
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
tQuery.pluginsMixin(tQuery.Scene);


tQuery.Scene.prototype.destroy	= function()
{
	
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Scene.prototype.add	= function(object3d)
{
	if( object3d instanceof tQuery.Object3D ){
		object3d.each(function(object3d){
			this._scene.add(object3d)			
		}.bind(this));
	}else if( object3d instanceof THREE.Object3D ){
		this._scene.add(object3d)		
	}else	console.assert(false);
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

tQuery.Scene.prototype.fullpage	= function()
{
	// Should that be in pluging
	var domElement	= document.body;
	domElement.style.margin		= "0";
	domElement.style.padding	= "0";
	domElement.style.overflow	= 'hidden';
	return this.appendTo(domElement);
}

tQuery.Scene.prototype.appendTo	= function(domElement)
{
	domElement.appendChild(this._renderer.domElement)
	this._renderer.setSize( domElement.offsetWidth, domElement.offsetHeight );
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
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Handle the rendering loop
 *
 * @class This class handle the rendering loop
 *
 * @param {THREE.Scene} scene the scene to display (optional)
*/
tQuery.Loop	= function(scene)
{
	// update default scene.
	// - TODO no sanity check ?
	tQuery.loop	= this;
	
	// internally if scene present do that
	this._scene	= scene;
	this._hooks	= [];

	// if scene is available, hook it ON_RENDER
	this._scene && this.hookOnRender(function(){
		this._scene.render();
	}.bind(this));
};

// make it pluginable
tQuery.pluginsMixin(tQuery.Loop);

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

	// run all the hooks - from lower priority to higher - in order of registration
	for(var priority = 0; priority <= this._hooks.length; priority++){
		if( this._hooks[priority] === undefined )	continue;
		var callbacks	= this._hooks[priority].slice(0)
		for(var i = 0; i < callbacks.length; i++){
			callbacks[i](time);
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
 * @fileOverview Plugins for tQuery and Stats.js
*/

(function(){	// closure function

/**
 * 
*/
var DragPanControls	= function(loop)
{
	this._loop	= loop	|| tQuery.loop;

	this._controls	= new THREEx.DragPanControls(tQuery.scene.camera());
	this._$onRender	= this._onRender.bind(this);
	this._loop.hookPreRender(this._$onRender);
};

DragPanControls.prototype.destroy	= function(){
	this._loop.unhookPreRender(this._$onRender);	
};

DragPanControls.prototype._onRender	= function(){
	this._controls.update();
};


// register the plugins
tQuery.register('DragPanControls', DragPanControls);
tQuery.register('createDragPanControls', function(loop){ return new tQuery.DragPanControls(loop); });

})();	// closure function end
/**
 * @fileOverview Plugins for tQuery.Geometry: tool box to play with geometry
*/

(function(){

//////////////////////////////////////////////////////////////////////////////////
//		Size functions							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Geometry.register('zoom', function(vector3){
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
			vertex.position.multiplySelf(vector3); 
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


})();	// closure function end
/**
 * @fileOverview Plugins for tQuery.Object3D to play with .position/.rotation/.scale
*/

(function(){

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

tQuery.Object3D.register('zoom', function(ratio){
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
tQuery.Object3D.register('zoomX'	, function(ratio){ return this.zoom(ratio, 0, 0);	});
tQuery.Object3D.register('zoomY'	, function(ratio){ return this.zoom(0, ratio, 0);	});
tQuery.Object3D.register('zoomZ'	, function(ratio){ return this.zoom(0, 0, ratio);	});


})();	// closure function end
/**
 * @fileOverview Plugins for tQuery and Stats.js
*/

(function(){

/**
 * 
*/
var myStats	= function(loop)
{
	// add Stats.js - https://github.com/mrdoob/stats.js
	this._stats	= new Stats();
	this._stats.domElement.style.position	= 'absolute';
	this._stats.domElement.style.bottom	= '0px';
	document.body.appendChild( this._stats.domElement );

	this._loop	= loop	|| tQuery.loop;

	this._$onRender	= this._onRender.bind(this);
	this._loop.hookPostRender(this._$onRender);
}

myStats.prototype.destroy	= function(){
	this._loop.unhookPostRender(this._$onRender);	
	document.body.removeChild(this._stats.domElement );
}

myStats.prototype._onRender	= function(){
	this._stats.update();
};

// register the plugins
tQuery.register('Stats', myStats);
tQuery.register('createStats', function(loop){ return new tQuery.Stats(loop); });

})();	// closure function end
