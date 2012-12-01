tQuery.registerStatic('SimpleMazePathFinding', function(opts){
	// sanity check
	console.assert(opts.maze instanceof tQuery.SimpleMaze);

	// copy the parameters	
	this._maze	= opts.maze;
	
	// get maze dimension
	var mazeMap	= this._maze.map();
	var mapD	= mazeMap.length;
	var mapW	= mazeMap[0].length; 
	// build the grid for pathfinding
	this._grid	= new PF.Grid(mapW, mapD);
	for(var z = 0; z < mapD; z++){
		for(var x = 0; x < mapW; x++){
			var value	= mazeMap[z].charCodeAt(x);
			var isWall	= value === '*'.charCodeAt(0);
			this._grid.setWalkableAt(x, z, isWall ? false : true);
		}
	}
	// create a path finder
	this._finder	= new PF.AStarFinder();
});

/**
 * set a new path from source to destination on the simplemaze
 * 
 * @todo make polymorphism. especially srcX, srcY, dstX, dstY
 * 
 * @param {THREE.Vector2} source      the source of the path
 * @param {THREE.Vector2} destination the destination of the path
 * @return {tQuery.SimpleMazePathFinding} for chained API
 */
tQuery.SimpleMazePathFinding.prototype.computePath = function(source, destination){
	// use PathFinding.js to get the path on the grid
	var pfPath	= this._finder.findPath(source.x, source.y, destination.x, destination.y, this._grid.clone());
	
	// get maze dimension
	var mazeMap	= this._maze.map();
	var mapD	= mazeMap.length;
	var mapW	= mazeMap[0].length; 
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
};

tQuery.SimpleMazePathFinding.prototype.path = function() {
	return this._path;
};
