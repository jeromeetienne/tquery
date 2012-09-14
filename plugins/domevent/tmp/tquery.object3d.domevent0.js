/**
 * plugin to handle deviceOrientation API
*/
(function(){
	//alert('kkk')
	var domEvent;
	var getInstance	= function(){
		if( !domEvent ){
			domEvent	= new THREEx.DomEvent();
		}
		return domEvent
	}
	
	tQuery.Object3D.registerInstance('on', function(eventType, callback){
		var domEvent	= getInstance();
		// yuk!!!! workaround a bug
		// ugly kludge to automatically set the camera in threex.domevent
		// - see github issue #11
		// - better version would be to listen so events on tQuery ?
		// - tQuery.on('cameraChange', function(world){
		//   })
		domEvent.camera(tQuery.world.tCamera());
		this.each(function(object3d){
			domEvent.bind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
	
	tQuery.Object3D.registerInstance('off', function(eventType, callback){
		var domEvent	= getInstance();
		// yuk!!!! workaround a bug
		// ugly kludge to automatically set the camera in threex.domevent
		// - see github issue #11
		// - better version would be to listen so events on tQuery ?
		// - tQuery.on('cameraChange', function(world){
		//   })
		domEvent.camera(tQuery.world.tCamera());
		this.each(function(object3d){
			domEvent.unbind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
})();


