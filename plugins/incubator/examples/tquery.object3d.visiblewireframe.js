tQuery.Object3D.registerInstance('visibleWireframe', function(visible){
	var object3D	= this;
	if( visible ){
		// if it is already present, return now
		var isPresent	= tQuery('.visibleWireframe', object3D).length > 0;
		if( isPresent )	return;
		// add a cloned object with a wireframe
		object3D.clone().addTo(object3D)
			.setBasicMaterial()
				.wireframe(true)
				.back()	
			.addClass('visibleWireframe')
	}else{
		tQuery('.visibleWireframe', object3D).detach();		
	}
	// for chained API
	return this;
});
