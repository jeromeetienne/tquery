// This THREEx helper makes it easy to handle the mouse events in your 3D scene
//
// * CHANGES NEEDED
//   * handle drag/drop
//   * notify events not object3D - like DOM
//     * so single object with property
//   * implement bubling/capturing
//   * implement event.stopPropagation()
//   * implement event.type = "click" and co
//   * implement event.target
//
// # Lets get started
//
// First you include it in your page
//
// ```<script src='threex.domevent.js'></script>```
//
// # use the object oriented api
//
// You bind an event like this
// 
// ```mesh.on('click', function(object3d){ ... })```
//
// To unbind an event, just do
//
// ```mesh.off('click', function(object3d){ ... })```
//
// As an alternative, there is another naming closer DOM events.
// Pick the one you like, they are doing the same thing
//
// ```mesh.addEventListener('click', function(object3d){ ... })```
// ```mesh.removeEventListener('click', function(object3d){ ... })```
//
// # Supported Events
//
// Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
// The semantic is the same too.
// Currently, the available events are
// [click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
// [mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).
//
// # use the standalone api
//
// The object-oriented api modifies THREE.Object3D class.
// It is a global class, so it may be legitimatly considered unclean by some people.
// If this bother you, simply do ```THREEx.DomEvent.noConflict()``` and use the
// standalone API. In fact, the object oriented API is just a thin wrapper
// on top of the standalone API.
//
// First, you instanciate the object
//
// ```var domEvent = new THREEx.DomEvent();```
// 
// Then you bind an event like this
//
// ```domEvent.bind(mesh, 'click', function(object3d){ object3d.scale.x *= 2; });```
//
// To unbind an event, just do
//
// ```domEvent.unbind(mesh, 'click', callback);```
//
// 
// # Code

//

/** @namespace */
var THREEx		= THREEx 		|| {};

// # Constructor
THREEx.DomEvent	= function(domElement)
{
	this._domElement= domElement || document;
	this._projector	= new THREE.Projector();
	
	this._selected	= null;

	// Bind dom event for mouse and touch
	var _this	= this;
	this._$onClick		= function(){ _this._onClick.apply(_this, arguments);		};
	this._$onDblClick	= function(){ _this._onDblClick.apply(_this, arguments);	};
	this._$onMouseMove	= function(){ _this._onMouseMove.apply(_this, arguments);	};
	this._$onMouseDown	= function(){ _this._onMouseDown.apply(_this, arguments);	};
	this._$onMouseUp	= function(){ _this._onMouseUp.apply(_this, arguments);		};
	this._$onTouchMove	= function(){ _this._onTouchMove.apply(_this, arguments);	};
	this._$onTouchStart	= function(){ _this._onTouchStart.apply(_this, arguments);	};
	this._$onTouchEnd	= function(){ _this._onTouchEnd.apply(_this, arguments);	};
	this._domElement.addEventListener( 'click'	, this._$onClick	, false );
	this._domElement.addEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.addEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.addEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.addEventListener( 'mouseup'	, this._$onMouseUp	, false );
	this._domElement.addEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.addEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.addEventListener( 'touchend'	, this._$onTouchEnd	, false );
}

// # Destructor
THREEx.DomEvent.prototype.destroy	= function()
{
	// unBind dom event for mouse and touch
	this._domElement.removeEventListener( 'click'		, this._$onClick	, false );
	this._domElement.removeEventListener( 'dblclick'	, this._$onDblClick	, false );
	this._domElement.removeEventListener( 'mousemove'	, this._$onMouseMove	, false );
	this._domElement.removeEventListener( 'mousedown'	, this._$onMouseDown	, false );
	this._domElement.removeEventListener( 'mouseup'		, this._$onMouseUp	, false );
	this._domElement.removeEventListener( 'touchmove'	, this._$onTouchMove	, false );
	this._domElement.removeEventListener( 'touchstart'	, this._$onTouchStart	, false );
	this._domElement.removeEventListener( 'touchend'	, this._$onTouchEnd	, false );
}

THREEx.DomEvent.eventNames	= [
	"click",
	"dblclick",
	"mouseover",
	"mouseout",
	"mousedown",
	"mouseup"
];

/********************************************************************************/
/*		domevent context						*/
/********************************************************************************/

// handle domevent context in object3d instance

THREEx.DomEvent.prototype._objectCtxInit	= function(object3d){
	object3d._3xDomEvent = {};
}
THREEx.DomEvent.prototype._objectCtxDeinit	= function(object3d){
	delete object3d._3xDomEvent;
}
THREEx.DomEvent.prototype._objectCtxIsInit	= function(object3d){
	return object3d._3xDomEvent ? true : false;
}
THREEx.DomEvent.prototype._objectCtxGet	= function(object3d){
	return object3d._3xDomEvent;
}

/********************************************************************************/
/*										*/
/********************************************************************************/

THREEx.DomEvent.prototype.bind	= function(object3d, eventName, callback, useCapture)
{
	console.assert( THREEx.DomEvent.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);
	var objectCtx	= this._objectCtxGet(object3d);	
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	objectCtx[eventName+'Handlers'].push({
		callback	: callback,
		useCapture	: useCapture
	});
}

THREEx.DomEvent.prototype._bound	= function(eventName, object3d)
{
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return false;
	return objectCtx[eventName+'Handlers'] ? true : false;
}

THREEx.DomEvent.prototype.unbind	= function(object3d, eventName, callback)
{
	console.assert( THREEx.DomEvent.eventNames.indexOf(eventName) !== -1, "not available events:"+eventName );

	if( !this._objectCtxIsInit(object3d) )	this._objectCtxInit(object3d);

	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx[eventName+'Handlers'] )	objectCtx[eventName+'Handlers']	= [];

	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		if( callback != handler.callback )	continue;
		if( useCapture != handler.useCapture )	continue;
		handlers.splice(i, 1)
		break;
	}
}

/********************************************************************************/
/*		onMove								*/
/********************************************************************************/

// # handle mousemove kind of events

THREEx.DomEvent.prototype._onMove	= function(mouseX, mouseY)
{
	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	this._projector.unprojectVector( vector, camera );

	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var intersects = ray.intersectScene( scene );
	
	var oldSelected	= this._selected;

	if( intersects.length > 0 ){
		var intersect	= intersects[ 0 ];
		var newSelected	= intersect.object;
		this._selected	= newSelected;
	
		var overHandlers, outHandlers;
		if( oldSelected != newSelected ){
			// if newSelected bound mouseenter, notify it
			if( this._bound('mouseover', newSelected) ){
				overHandlers	= this._objectCtxGet(newSelected).mouseoverHandlers.slice(0); 
			}
			// if there is a oldSelect and oldSelected bound mouseleave, notify it
			if( oldSelected && this._bound('mouseout', oldSelected) ){
				outHandlers	= this._objectCtxGet(oldSelected).mouseoutHandlers.slice(0); 
			}
		}
	}else{
		// if there is a oldSelect and oldSelected bound mouseleave, notify it
		if( oldSelected && this._bound('mouseout', oldSelected) ){
			outHandlers	= this._objectCtxGet(oldSelected).mouseoutHandlers.slice(0); 
		}
		this._selected	= null;
	}

	// notify mouseEnter - done at the end with a copy of the list to allow callback to remove handlers
	overHandlers && overHandlers.forEach(function(handler){
		this._notify(handler, 'mouseover', newSelected);
	}.bind(this));
	// notify mouseLeave - done at the end with a copy of the list to allow callback to remove handlers
	outHandlers && outHandlers.forEach(function(handler){
		this._notify(handler, 'mouseout', oldSelected);
	}.bind(this))
}


/********************************************************************************/
/*		onEvent								*/
/********************************************************************************/

// # handle click kind of events

THREEx.DomEvent.prototype._onEvent	= function(eventName, mouseX, mouseY)
{
	var vector	= new THREE.Vector3( mouseX, mouseY, 1 );
	this._projector.unprojectVector( vector, camera );

	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var intersects	= ray.intersectScene( scene );
	// FIXME to test only the bound objects is likely faster to run
	// - handle the list
	// var intersects = ray.intersectObjects( [mesh] );

	// if there are no intersections, return now
	if( intersects.length === 0 )	return;

	// init some vairables
	var intersect	= intersects[0];
	var object3d	= intersect.object;
	var objectCtx	= this._objectCtxGet(object3d);
	if( !objectCtx )	return;

	// notify handlers
	this._notify(eventName, object3d);
}

THREEx.DomEvent.prototype._notify	= function(eventName, object3d)
{
	var objectCtx	= this._objectCtxGet(object3d);
	var handlers	= objectCtx ? objectCtx[eventName+'Handlers'] : null;

	// do bubbling
	if( !objectCtx || !handlers || handlers.length === 0 ){
		object3d.parent && this._notify(eventName, object3d.parent);
		return;
	}
	
	
	// notify all handlers
	var handlers	= objectCtx[eventName+'Handlers'];
	for(var i = 0; i < handlers.length; i++){
		var handler	= handlers[i];
		var toPropagate	= true;
		handler.callback({
			type		: eventName,
			target		: object3d,
			stopPropagation	: function(){
				toPropagate	= false;
			}
		});
		if( !toPropagate )	continue;
		// do bubbling
		if( handler.useCapture === false ){
			object3d.parent && this._notify(eventName, object3d.parent);
		}
	}
}

/********************************************************************************/
/*		handle mouse events						*/
/********************************************************************************/
// # handle mouse events

THREEx.DomEvent.prototype._onMouseDown	= function(event){ return this._onMouseEvent('mousedown', event);	}
THREEx.DomEvent.prototype._onMouseUp	= function(event){ return this._onMouseEvent('mouseup'	, event);	}


THREEx.DomEvent.prototype._onMouseEvent	= function(eventName, domEvent)
{
	var mouseX	= +(domEvent.clientX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(domEvent.clientY / window.innerHeight) * 2 + 1;
	return this._onEvent(eventName, mouseX, mouseY);
}

THREEx.DomEvent.prototype._onMouseMove	= function(event)
{
	var mouseX	= +(event.clientX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(event.clientY / window.innerHeight) * 2 + 1;
	return this._onMove(mouseX, mouseY);
}

THREEx.DomEvent.prototype._onClick		= function(event)
{
	// TODO handle touch ?
	return this._onMouseEvent('click'	, event);
}
THREEx.DomEvent.prototype._onDblClick		= function(event)
{
	// TODO handle touch ?
	return this._onMouseEvent('dblclick'	, event);
}

/********************************************************************************/
/*		handle touch events						*/
/********************************************************************************/
// # handle touch events


THREEx.DomEvent.prototype._onTouchStart	= function(event){ return this._onTouchEvent('mousedown', event);	}
THREEx.DomEvent.prototype._onTouchEnd	= function(event){ return this._onTouchEvent('mouseup'	, event);	}

THREEx.DomEvent.prototype._onTouchMove	= function(event)
{
	if( event.touches.length != 1 )	return undefined;

	event.preventDefault();

	var mouseX	= +(event.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(event.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	return this._onMove('mousemove', mouseX, mouseY);
}

THREEx.DomEvent.prototype._onTouchEvent	= function(eventName, domEvent)
{
	if( event.touches.length != 1 )	return undefined;

	event.preventDefault();

	var mouseX	= +(event.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
	var mouseY	= -(event.touches[ 0 ].pageY / window.innerHeight) * 2 + 1;
	return this._onEvent(eventName, mouseX, mouseY);	
}

