tQuery.registerStatic('createSimpleMaze', function(opts){
	return new tQuery.SimpleMaze(opts);
});

tQuery.registerStatic('SimpleMaze', function(opts){
	// handle parameters
	this._opts	= opts	= tQuery.extend(opts, {
		squareW		: 1,
		squareH		: 1,
		squareD		: 1,
		enableCeiling	: true,
		enableFloor	: true
	});

	var mazeMap	= opts.map;
	var mapD	= mazeMap.length;
	var mapW	= mazeMap[0].length;
	
	this._map	= opts.map;
	this._mapW	= mapW;
	this._mapD	= mapD;
	this._opts	= opts;
	
	// TODO sanitize input
	// - opts.map especially
	
	this._container	= tQuery.createObject3D();
	var textureUrl	= tQuery.SimpleMaze.baseUrl+"../assets/images/water.jpg";

	// opts.enableFloor
	if( opts.enableFloor ){
		var material	= new THREE.MeshBasicMaterial({
			color	: 0xFF5588,
			map	: THREE.ImageUtils.loadTexture( textureUrl )
		});
		this._floor	= tQuery.createPlane(material)
			.addClass('ground')
			.geometry()
				.rotateX(-Math.PI/2)
				.scaleBy(opts.squareW*mapW, 1, opts.squareD*mapD)
				.computeAll()
				.back()
			.addTo(this._container);		
	}

	// opts.enableCeiling
	if( opts.enableCeiling ){
		var material	= new THREE.MeshBasicMaterial({
			color	: 0x8855FF,
			map	: THREE.ImageUtils.loadTexture( textureUrl )
		});
		this._ceiling	= tQuery.createPlane(material)
			.addClass('ceiling')
			.geometry()
				.rotateX(Math.PI/2)
				.scaleBy(opts.squareW*mapW, 1, opts.squareD*mapD)
				.translateY(opts.squareH)
				.computeAll()
				.back()
			.addTo(this._container)
	}
	
	// CUBES
	var material	= new THREE.MeshBasicMaterial({
		color	: 0x88FF55,
		map	: THREE.ImageUtils.loadTexture( textureUrl )
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
				.addClass('wall')
				.geometry()
					.scaleBy(opts.squareW, opts.squareH, opts.squareD)
					.translateY(opts.squareH/2)
					.computeAll()
					.back()
				.translateX((x-mapW/2 + 0.5) * opts.squareW)
				.translateZ((z-mapD/2 + 0.5) * opts.squareD);
		}
	}
});

tQuery.SimpleMaze.baseUrl	= "../../../plugins/simplemaze/";

tQuery.SimpleMaze.prototype.object3D	= function(){
	return this._container;
}

tQuery.SimpleMaze.prototype.map = function(){
	return this._opts.map;
}

// TODO this funciton name is crap
tQuery.SimpleMaze.prototype.getTile = function(tileX, tileZ) {
	console.assert( tileX >= 0 && tileX < this._mapW )
	console.assert( tileZ >= 0 && tileZ < this._mapD )
	var mazeMap	= this._opts.map;
	var value	= mazeMap[tileZ].charCodeAt(tileX);
	return value;
}

// TODO this funciton name is crap
tQuery.SimpleMaze.prototype.getCoord = function(x, z) {
	var tileX	= Math.floor(x / this._opts.squareW);
	var tileZ	= Math.floor(z / this._opts.squareD);
	var value	= this.getTile(tileX, tileZ)
	return value;
}

tQuery.SimpleMaze.prototype.mapWidth = function() {
	return this._mapW
}

tQuery.SimpleMaze.prototype.mapDepth = function() {
	return this._mapD
}

tQuery.SimpleMaze.prototype.forEach = function(fn) {
	for(var tileZ = 0; tileZ < this._mapD; tileZ++){
		for(var tileX = 0; tileX < this._mapW; tileX++){
			var value	= this._map[tileZ].charCodeAt(tileX);
			fn(tileX, tileZ, value)
		}
	}
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Emulate tQuery.Object3D.addTo
*/
tQuery.SimpleMaze.prototype.addTo	= function(object3D){
	this.object3D().addTo(object3D);
	return this;
}

/**
 * Emulate tQuery.Object3D.removeFrom
*/
tQuery.SimpleMaze.prototype.removeFrom	= function(object3D){
	this.object3D().removeFrom(object3D);
	return this;
};
