tQuery.registerStatic('SimpleMazePathFinding', function(opts){
	// sanity check
	console.assert(opts.maze instanceof tQuery.SimpleMaze);
	
	this._maze	= opts.maze;
	
	// get maze dimension
	var mazeMap	= maze.map();
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
 * @param {THREE.Vector2} source      the source of the path
 * @param {THREE.Vector2} destination the destination of the path
 */
tQuery.SimpleMazePathFinding.prototype.computePath = function(source, destination){
	// use PathFinding.js to get the path on the grid
	var path	= this._finder.findPath(source.x, source.y, destination.x, destination.y, this._grid.clone());

	// get maze dimension
	var mazeMap	= maze.map();
	var mapD	= mazeMap.length;
	var mapW	= mazeMap[0].length; 
	// build a THREE.Path from the path - it is the canonical version of it
	this._tPath	= new THREE.Path();
	console.assert(path.length > 0)
	this._tPath.moveTo(path[0][0] - Math.floor(mapW/2),path[0][1] - Math.floor(mapD/2));	
	for(var i = 1; i < path.length; i++){
		this._tPath.lineTo(path[i][0]  - Math.floor(mapW/2),path[i][1] - Math.floor(mapD/2));
	}
	// get the length of the whole path
	this._tPathLength	= this._tPath.getLength();
};

/**
 * getter for the last path computed
 * @return {THREE.Path} the last path computed
 */
tQuery.SimpleMazePathFinding.prototype.tPath = function(){
	return this._tPath;
};