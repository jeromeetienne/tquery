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

tQuery.registerStatic('loadSpaceShip3', function(){
	var loader	= new THREE.OBJMTLLoader();
	loader.addEventListener('load', function( event ){
		tQuery(event.content).scaleBy(1/10)
	});
	var baseUrl	= tQuery.SpaceShips.baseUrl;
	var objUrl	= baseUrl + 'models/SpaceFighter03/untitled.obj';
	var mtlUrl	= baseUrl + 'models/SpaceFighter03/untitled.mtl';
	loader.load(objUrl, mtlUrl);
	return loader;
});

tQuery.registerStatic('createSpaceShip3', function(){
	var container	= tQuery.createObject3D()
	var loader	= tQuery.loadSpaceShip3()
	loader.addEventListener('load', function(event){
		tQuery(event.content).addTo(container)
	})
	return container;
});	

