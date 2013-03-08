//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('SpaceShips', {});
tQuery.SpaceShips.baseUrl	= "../../../plugins/spaceships/";

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.SpaceShips);



//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadShuttle01', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery('mesh', event.content)
			.geometry()
				.scaleBy(1/400)
				.computeAll()
				.back()
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/Shuttle01/Shuttle01.obj';
	var mtlUrl	= baseUrl + 'models/Shuttle01/Shuttle01.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createShuttle01', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadShuttle01()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadShuttle02', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery('mesh', event.content)
			.geometry()
				.scaleBy(1/400)
				.computeAll()
				.back()
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/Shuttle02/Shuttle02.obj';
	var mtlUrl	= baseUrl + 'models/Shuttle02/Shuttle02.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createShuttle02', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadShuttle02()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadSpaceFighter01', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery('mesh', event.content)
			.geometry()
				.scaleBy(1/300)
				.computeAll()
				.back()
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/SpaceFighter01/SpaceFighter01.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter01/SpaceFighter01.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createSpaceFighter01', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadSpaceFighter01()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});
	
//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadSpaceFighter02', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery('mesh', event.content)
			.geometry()
				.scaleBy(1/200)
				.computeAll()
				.back()
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/SpaceFighter02/SpaceFighter02.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter02/SpaceFighter02.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createSpaceFighter02', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadSpaceFighter02()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});	

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('loadSpaceFighter03', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery(event.content).scaleBy(1/10)
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/SpaceFighter03/SpaceFighter03.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter03/SpaceFighter03.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createSpaceFighter03', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadSpaceFighter03()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});	

