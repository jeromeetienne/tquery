tQuery.registerStatic('LeapController', function(opts){
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	})
	// init controller
	this._controller= new Leap.Controller({
		enableGestures	: true
	});
	
	
	this._lastFrame	= null;	
	this._controller.loop(function(frame) {
		this._lastFrame	= frame;
		this.dispatchEvent('frame', frame)
	}.bind(this));

	//////////////////////////////////////////////////////////////////////////////////
	//		gesture tracking						//
	//////////////////////////////////////////////////////////////////////////////////		
	var gesturesData= {};	
	this.addEventListener('frame', function(frame) {
		if( frame.valid !== true )	return;
		frame.gestures && frame.gestures.forEach(function(gesture){
			// get the eventEmitter for this gesture
			var gestureData	= gesturesData[gesture.id]
			// create eventEmitter if needed
			if( gestureData === undefined ){
				//console.log('create eventEmitter for', gesture.id)
				gesturesData[gesture.id] = {
					userData: {},
					emitter	: tQuery.MicroeventMixin({})
				};
				var gestureData	= gesturesData[gesture.id]
				//this.dispatchEvent('gestureTracking', gesture, gestureData)
			}
			// handle it by state
			if( gesture.state === 'start' ){
				this.dispatchEvent('start', gesture, gestureData)
			}else if( gesture.state === 'update' ){
				gestureData.emitter.dispatchEvent('update', gesture, gestureData)
			}else if( gesture.state === 'stop' ){
				gestureData.emitter.dispatchEvent('stop', gesture, gestureData)
				// delete eventEmitter
				delete gesturesData[gesture.id]
				//console.log('delete eventEmitter for', gesture.id)
			}
		}.bind(this));
	}.bind(this));

	//////////////////////////////////////////////////////////////////////////////////
	//		handle finger Tracking						//
	//////////////////////////////////////////////////////////////////////////////////		
	var pointablesData	= {};	
	this.addEventListener('frame', function(frame) {
		if( frame.valid !== true )	return;
		if( !frame.pointables )		return;
		
		// remove pointable which are no more present
		Object.keys(pointablesData).forEach(function(pointableId){
			// get the eventEmitter for this gesture
			var pointableData	= pointablesData[pointableId]
			// test if this pointableID is still in the frame
			var inFrame	= false;
			frame.pointables.forEach(function(pointable){
				if( String(pointable.id) === pointableId ){
					inFrame	= true;
				}
			});
			// if this pointableId is not more present, delete it
			if( inFrame === false ){
				console.log('pointable stop', pointableId)
				pointableData.emitter.dispatchEvent('stop', pointableId, pointableData)
				// delete eventEmitter
				delete pointablesData[pointableId]
			}
		});	

		frame.pointables.forEach(function(pointable){
			var pointableId	= String(pointable.id)
			// get the eventEmitter for this gesture
			var pointableData	= pointablesData[pointableId]
			// create eventEmitter if needed
			var justCreated	= false;
			if( pointableData === undefined ){
				//console.log('create eventEmitter for', gesture.id)
				pointablesData[pointableId] = {
					userData: {},
					emitter	: tQuery.MicroeventMixin({})
				};
				var pointableData	= pointablesData[pointableId]
				justCreated	= true;
			}
			// handle it by state
			if( justCreated ){
				this.dispatchEvent('pointableTracking', pointable, pointableData)
				console.log('pointable creating', pointableId)
			}else{
				pointableData.emitter.dispatchEvent('update', pointable, pointableData)				
				console.log('pointable updating', pointableId)
			}
		}.bind(this));
	}.bind(this));

});

// make it eventable
tQuery.MicroeventMixin(tQuery.LeapController.prototype);

/**
 * explicit destructor
 */
tQuery.LeapController.prototype.destroy	= function(){
};

tQuery.registerStatic('createLeapController', function(opts){
	return new tQuery.LeapController(opts)
});

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.LeapController.prototype.controller	= function(){
	return this._controller;
}

tQuery.LeapController.prototype.lastFrame = function() {
	return this._lastFrame;
};

tQuery.LeapController.prototype.convertPosition = function(/* arguments */) {
	var vector3	= tQuery.createVector3.apply(tQuery, arguments)
	vector3.x	= (vector3.x -   0)/ 50	
	vector3.y	= (vector3.y - 250)/ 50
	vector3.z	= (vector3.z -   0)/ 50	
	return vector3;
};

tQuery.LeapController.prototype.convertDistance = function(value){
	return value / 50;
}