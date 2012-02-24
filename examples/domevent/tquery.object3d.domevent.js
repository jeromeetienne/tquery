(function(){
	var domEvent	= new THREEx.DomEvent();
	tQuery.Object3D.register('on', function(eventType, callback){

		// yuk!!!! workaround a bug
		// ugly kludge to automatically set the camera in threex.domevent
		// - see github issue #11
		// - better version would be to listen so events on tQuery ?
		// - tQuery.on('cameraChange', function(world){
		//   
		//   })
		domEvent.camera(tQuery.world.camera());
			
	
	
		this.each(function(object3d){
			domEvent.bind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
	
	tQuery.Object3D.register('off', function(eventType, callback){
		this.each(function(object3d){
			domEvent.unbind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
})();


