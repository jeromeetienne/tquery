tQuery.register('SimpleMaze', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		squareW		: 1,
		squareH		: 1,
		squareD		: 1,
		enableCeiling	: true,
		enableGround	: true
	});

	var mazeMap	= opts.map;
	var mapD	= mazeMap.length;
	var mapW	= mazeMap[0].length;
	
	// TODO sanitize input
	// - opts.map especially
	
	this._container	= tQuery.createObject3D();
	
	// GROUND
	if( opts.enableGround ){
		var material	= new THREE.MeshLambertMaterial({
			ambient	: 0x444444,
			color	: 0xFF5588,
			map	: THREE.ImageUtils.loadTexture( "../../assets/images/water.jpg" )
		});
		this._ground	= tQuery.createPlane(material)
			.geometry()
				.rotateX(-Math.PI/2)
				.scaleBy(mapW, 1, mapD)
				.back()
			.addTo(this._container);		
	}

	// ceiling
	if( opts.enableCeiling ){
		var material	= new THREE.MeshLambertMaterial({
			ambient	: 0x444444,
			color	: 0x8855FF,
			map	: THREE.ImageUtils.loadTexture( "../../assets/images/water.jpg" )
		});
		this._ceiling	= tQuery.createPlane(material)
			.geometry()
				.rotateX(-Math.PI)
				.scaleBy(mapW, 1, mapD)
				.translateY(opts.squareH)
				.back()
			.addTo(this._container)
	}
	
	// CUBES	
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0x88FF55,
		map	: THREE.ImageUtils.loadTexture( "../../assets/images/water.jpg" )
	});
	// TODO one should merge all those cubes
	for(var z = 0; z < mapD; z++){
		for(var x = 0; x < mapW; x++){
			var value	= mazeMap[z].charCodeAt(x);
			// keep only walls
			if( value !== '*'.charCodeAt(0) )	continue;
			// TODO
			// - merge all those cubes, no upper/lower face
			tQuery.createCube(material).addTo(this._container)
				.geometry()
					.scaleBy(opts.squareW, opts.squareH, opts.squareD)
					.translateY(opts.squareH/2)
					.back()
				.translateX((x-mapW/2 + 0.5) * opts.squareW)
				.translateZ((z-mapD/2 + 0.5) * opts.squareW);
		}	
	}
});

tQuery.SimpleMaze.prototype.container	= function(){
	return this._container;
}