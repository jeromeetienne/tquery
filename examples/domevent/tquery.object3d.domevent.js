/**
 * plugin to handle deviceOrientation API
*/
define(['examples/domevent/threex.domevent'], function(domEvent){

	tQuery.Object3D.register('on', function(eventType, callback){
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
});


