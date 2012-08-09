/**
 * plugin to handle deviceOrientation API
*/
(function(){
	//alert('kkk')
	var domEvent;
	var getInstance	= function(){
		if( !domEvent ){
			domEvent	= new THREEx.DomEvent(tQuery.world.tCamera());
		}
		return domEvent
	}
	
	tQuery.World.bind('cameraChange', function(world) {
		domEvent.camera(world.tCamera());
	});
	
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
})();
