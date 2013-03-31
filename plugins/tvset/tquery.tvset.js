//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('TvSet', {});
tQuery.TvSet.baseUrl	= "../../../plugins/tvset/";

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.TvSet);



//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadTvSet', function(){
	var loader	= new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	var baseUrl	= tQuery.TvSet.baseUrl;
	var modelUrl	= baseUrl + 'models/OldTelevision01/models/models/OldTelevisionSet01/models/Old Television Set 01.dae'
	loader.load(modelUrl, function(collada){
		var model	= collada.scene;
		tQuery(model)
			.geometry()
				.scaleBy(1/200)
				.computeAll()
				.back()
	});
	return loader;
});

tQuery.registerStatic('createTvSet', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadTvSet()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});
