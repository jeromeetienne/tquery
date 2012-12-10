/**
 * creator of tQuery.Headtrackr
 * @return {tQuery.Headtrackr} the created instance
 */
tQuery.registerStatic('createHeadtrackr', function(opts){
	return new tQuery.Headtrackr(opts);
})

/**
 * Wrapper on top of headtrackr.js - https://github.com/auduno/headtrackr
 */
tQuery.registerStatic('Headtrackr', function(opts){
	// handle default options
	this._opts	= opts	= tQuery.extend(opts, {
		width		: 320,
		height		: 240,
		headtrackrOpts	: {}
	});
	
	// bind facetrackingEvent
	this._$facetrackingEventCb	= this._facetrackingEventCb.bind(this);
	document.addEventListener("facetrackingEvent", this._$facetrackingEventCb);

	
	// create videoInput element to read the webcam
	var videoInput	= document.createElement('video');
	videoInput.setAttribute('autoplay');
	videoInput.setAttribute('loop');
	videoInput.setAttribute('width'	, this._opts.width.toString());
	videoInput.setAttribute('height', this._opts.height.toString());
	videoInput.style.display	= 'none';
	this._videoInput	= videoInput;

	// create canvasInput element to read the webcam
	var canvasInput	= document.createElement('canvas');
	canvasInput.setAttribute('width' , this._opts.width.toString());
	canvasInput.setAttribute('height', this._opts.height.toString());
	canvasInput.style.display	= 'none';
	this._canvasInput	= canvasInput;

	// create the headtracker itself
	this._htracker	= new headtrackr.Tracker(opts.headtrackrOpts);
	this._htracker.init(videoInput, canvasInput);
});

// make it eventable
tQuery.MicroeventMixin(tQuery.Headtrackr.prototype);

/**
 * detructor
 */
tQuery.Headtrackr.prototype.destroy = function() {
	// stop converting headtrackr.js event to normalized one 
	document.removeEventListener("facetrackingEvent", this._$facetrackingEventCb);
	// stop head tracking
	this.stop();
	// disable debug view
	this.debugView(false);
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * start head tracking
 * @return {tQuery.Headtrackr} for chained API
 */
tQuery.Headtrackr.prototype.start = function(){
	this._htracker.start();
	return this;
};

/**
 * stop head tracking
 * @return {tQuery.Headtrackr} for chained API
 */
tQuery.Headtrackr.prototype.stop = function(){
	this._htracker.stop();
	return this;
};

/**
 * Reset the headtracker
 * @return {tQuery.Headtrackr} for chained API
 */
tQuery.Headtrackr.prototype.reset = function() {
	// reset the head tracker
	var htracker	= this._htracker;
	htracker.stop();
	htracker.start();
	return this;
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Headtrackr.prototype._facetrackingEventCb = function(headtrackrEvent){
	var canvasHalfW	= this._opts.width/2;
	var canvasHalfH	= this._opts.width/2;
	// build the event to notify
	var event	= {};	
	event.x		= - (headtrackrEvent.x-canvasHalfW)/canvasHalfW;
	event.y		= - (headtrackrEvent.y-canvasHalfH)/canvasHalfH;
	event.width	= headtrackrEvent.width  / canvasHalfW;
	event.height	= headtrackrEvent.height / canvasHalfH;
	event.angle	= headtrackrEvent.angle + Math.PI/2;
	event.headtrackrEvent	= headtrackrEvent;
	// dispatch the event
	this.dispatchEvent('found', event);
};

//////////////////////////////////////////////////////////////////////////////////
//		Handle debugView						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * enable/disable the debug view
 * @param  {Boolean|undefined} onOff if true, enable it, if false disable it, if undefined, getter
 * @return {tQuery.Headtrackr} for chained API
 */
tQuery.Headtrackr.prototype.debugView = function(onOff){
	if( onOff === undefined )	return this._$debugViewCallback	? true : false;
	if( onOff === true ){
		// if already on, do nothing
		if( this.debugView() === true )	return;
		// create the element
		var canvasView		= document.createElement('canvas');
		this._canvasView	= canvasView;
		// hook the events
		this._$debugViewCallback= this._debugViewCallback.bind(this);
		document.addEventListener("facetrackingEvent", this._$debugViewCallback);
		// set attribute
		canvasView.setAttribute('width' , this._opts.width.toString());
		canvasView.setAttribute('height', this._opts.height.toString());
		// put it on topleft absolute
		canvasView.style.position	= 'absolute';
		canvasView.style.top		= '0px';
		canvasView.style.left		= '0px';
		// mirror horizontal - needed as it is from the webcam	
        	canvasView.style.transform	= 'scaleX(-1)'
        	canvasView.style.webkitTransform= 'scaleX(-1)'
        	canvasView.style.mozTransform	= 'scaleX(-1)'
        	canvasView.style.oTransform	= 'scaleX(-1)'
		// handle zIndex to be above the reset
		canvasView.style.zIndex		= '1';
		document.body.appendChild(canvasView);
	}else if( onOff === false ){
		// if already on, do nothing
		if( this.debugView() === false )	return;
		// removeEventListener
		document.removeEventListener("facetrackingEvent", this._$debugViewCallback);
		this._$debugViewCallback= null;
		// remove the canvas
		var canvasView	= this._canvasView;
		canvasView.parentNode.removeChild( canvasView );
		this._canvasView= null;
	}else	console.assert(false);
	
	return this;	// for chained API
};

/**
 * [_debugViewCallback description]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
tQuery.Headtrackr.prototype._debugViewCallback = function(event){
	// sanity check
	console.assert( this.debugView() === true );
	// clear canvas with videoInput
	var context = this._canvasView.getContext('2d');
	context.drawImage(this._videoInput, 0, 0, this._opts.width, this._opts.height);

	// once we have stable tracking, draw rectangle
	context.save();
	context.translate(event.x, event.y)
	context.rotate(event.angle - Math.PI/2);

	context.strokeStyle	= '#00CC00';
	context.strokeRect(-Math.floor(event.width/2), -Math.floor(event.height/2)
			, event.width, event.height);
	context.restore();
};



