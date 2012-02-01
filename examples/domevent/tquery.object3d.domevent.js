tQuery.Object3D.register('on', function(eventType, callback){

	// yuk!!!! workaround a bug
	// ugly kludge to automatically set the camera in threex.domevent
	// - better version would be to listen so events on tQuery
	// - tQuery.on('cameraChange', function(world){
	//   
	//   })
	tQuery.Object3D.prototype._tqDomEvent.camera(tQuery.world.camera());
		


	var domEvent	= this._tqDomEvent;
	this.each(function(object3d){
		domEvent.bind(object3d, eventType, callback, false);
	});
	return this;	// for chained API
});

tQuery.Object3D.register('off', function(eventType, callback){
	var domEvent	= this._tqDomEvent;
	this.each(function(object3d){
		domEvent.unbind(object3d, eventType, callback, false);
	});
	return this;	// for chained API
});

tQuery.Object3D.register('_tqDomEvent', new THREEx.DomEvent());


