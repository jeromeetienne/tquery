tQuery.register('TrackingObjectControls', function(object, trackedObject){
	
	var deltaTarget		= tQuery.createSphere().addTo(trackedObject)
					.geometry().scaleBy(1/4).back()
					.position(0, 0, +2);
	var deltaCamera		= tQuery.createSphere().addTo(trackedObject)
					.geometry().scaleBy(1/4).back()
					.position(0, 2, -3)
					//.position(0, 1, 0)
					//.position(0, 0.7, -0.07)
});