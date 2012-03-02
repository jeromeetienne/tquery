/**
 * plugin to handle deviceOrientation API
*/
define(['examples/domevent/threex.domevent'], function(){
	var domEvent;
	var getInstance	= function(){
		if( !domEvent ){
			domEvent	= new THREEx.DomEvent();
			// yuk!!!! workaround a bug
			// ugly kludge to automatically set the camera in threex.domevent
			// - see github issue #11
			// - better version would be to listen so events on tQuery ?
			// - tQuery.on('cameraChange', function(world){
			//   
			//   })
			domEvent.camera(tQuery.world.camera());
		}
		return domEvent
	}
	
	tQuery.Object3D.register('on', function(eventType, callback){
		var domEvent	= getInstance();

		this.each(function(object3d){
			domEvent.bind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
	
	tQuery.Object3D.register('off', function(eventType, callback){
		var domEvent	= getInstance();
		this.each(function(object3d){
			domEvent.unbind(object3d, eventType, callback, false);
		});
		return this;	// for chained API
	});
});


