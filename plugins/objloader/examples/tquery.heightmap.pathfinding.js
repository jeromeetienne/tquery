/**
 * glue tQuery.pathfinding.js to pathfinding.js
 */
tQuery.registerStatic('HeightMapPathFinding', function(opts){
	// set default value
	this._opts	= tQuery.extend(opts, {
		tileW	: 16,
		tileH	: 16,
	});

	// sanity check - 
	console.assert(opts.heightMap instanceof tQuery.HeightMap);
	
	this._heightMap	= this._opts.heightMap;
	this._gridCanvas= null;

	// create a path finder
	this._finder	= new PF.AStarFinder();
});

tQuery.HeightMapPathFinding.prototype.gridCanvas = function() {
	if( this._gridCanvas )	return this._gridCanvas;

	var debugCanvas	= this._heightMap.buildDebugCanvas();
	var tileW	= this._opts.tileW;
	var tileH	= this._opts.tileH;
	var nonWalkable	= this._heightMap.minNonWalkable();
	this._gridCanvas= this._buildGridCanvas(debugCanvas, this._opts.tileW, this._opts.tileW, nonWalkable);
	// return the gridCanvas
	return this._gridCanvas;
};

tQuery.HeightMapPathFinding.prototype._gridPathFinding = function() {
	var gridCanvas	= this.gridCanvas();
	var gridContext	= gridCanvas.getContext('2d')
	var imageData	= gridContext.getImageData(0, 0, gridCanvas.width, gridCanvas.height);
	// get maze dimension
	var mapW	= imageData.width;
	var mapH	= imageData.height; 
	// build the grid for pathfinding
	this._grid	= new PF.Grid(mapW, mapD);
	for(var x = 0; x < mapW; x++){
		for(var y = 0; y < mapH; y++){
			// draw in the dstCanvas
			var offset	= x + y * imageData.width;
			var isWalkable	= imageData.data[offset*4+0] !== 255;
			this._grid.setWalkableAt(x, y, isWalkable);
		}
	}
};

/**
 * set a new path from source to destination
 * 
 * @todo make polymorphism. especially srcX, srcY, dstX, dstY
 * 
 * @param {THREE.Vector2} source      the source of the path
 * @param {THREE.Vector2} destination the destination of the path
 * @return {tQuery.HeightMapPathFinding} for chained API
 */
tQuery.HeightMapPathFinding.prototype.computePath = function(source, destination){
	// use PathFinding.js to get the path on the grid
	var pfPath	= this._finder.findPath(source.x, source.y, destination.x, destination.y, this._grid.clone());
	
	// get maze dimension
	var gridCanvas	= this.gridCanvas();
	var mapD	= gridCanvas.height;
	var mapW	= gridCanvas.width; 
	// convert pathfinding.js coordinate into three.js one
	this._path	= [];
	for(var i = 0; i < pfPath.length; i++){
		var position	= tQuery.createVector3();
		position.x	= pfPath[i][0] - Math.floor(mapW/2);
		position.z	= pfPath[i][1] - Math.floor(mapD/2)
		this._path.push(position)
	}
	// for chained API
	return this;
}

tQuery.HeightMapPathFinding.prototype.path = function() {
	return this._path;
};


/**
 * build a gridCanvas aka split the heightmap canvas into a grid of tile walkable or not. it is store in a canvas
 * @param  {HTMLCanvasElement} srcCanvas the canvas from the heightmap
 * @param  {number} tileW     a tile width in pixel
 * @param  {number} tileH     a tile height in pixel
 * @return {HTMLCanvasElement} the grid stored in a canvas
 */
tQuery.HeightMapPathFinding.prototype._buildGridCanvas = function(srcCanvas, tileW, tileH, minNonWalkable) {
	// compute stuff from srcCanvas
	var srcContext	= srcCanvas.getContext('2d');
	var nTilesW	= Math.ceil(srcCanvas.width / tileW);
	var nTilesH	= Math.ceil(srcCanvas.height/ tileH);
	// create destination canvas
	var dstCanvas	= document.createElement("canvas");	
	var dstContext	= dstCanvas.getContext("2d");
	dstCanvas.width	= nTilesW;
	dstCanvas.height= nTilesH;
	// get ImageData
	var srcImageData= srcContext.getImageData(0, 0, srcCanvas.width, srcCanvas.height);
	var srcData	= srcImageData.data;
	var dstImageData= dstContext.getImageData(0, 0, dstCanvas.width, dstCanvas.height);
	var dstData	= dstImageData.data;
	// go thru each pixel of the dstCanvas
	for(var dstX = 0; dstX < dstCanvas.width; dstX++){
		for(var dstY = 0; dstY < dstCanvas.height; dstY++){
			// test if it is walkable
			var walkable	= tileIsWalkable(dstX, dstY, minNonWalkable);
			// draw in the dstCanvas
			var offset	= dstX + dstY * dstCanvas.width;
			dstData[offset*4+0]	= walkable ? 255 : 0;
			dstData[offset*4+1]	= 0;
			dstData[offset*4+2]	= walkable ? 255 : 0;;
			dstData[offset*4+3]	= 255;
		}
	}
	// copy back the data in the canvas
	dstContext.putImageData(dstImageData, 0, 0);
	// return the just-built canvas
	return dstCanvas;

	function tileIsWalkable(x, y, minNonWalkable){
		// got thru the tile in the srcCanvas
		for(var srcX = x*tileW; srcX < (x+1)*tileW; srcX++){
			for(var srcY = y*tileH; srcY < (y+1)*tileH; srcY++){
				// if coordonates out of srcCanvas, return nonWalkable
				if( srcX < 0 || srcX >= srcCanvas.width )	return false;
				if( srcY < 0 || srcY >= srcCanvas.height )	return false;
				// read the height in srcCanvas
				var offset	= srcX + srcY*srcCanvas.width;
				var height	= srcData[offset*4+1];
				if( height >= minNonWalkable )	return false;
			}
		}
		// if all pixels height are walkable, then the tile is walkable
		return true;
	}
};