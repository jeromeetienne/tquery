/**
 * @todo code a loadFromRaw as data are currently in 'raw'
 * 
 * ### todo tomorrow
 * * heightmap, test a zone
 *   * visualise the tested zone
 * * code the camera to never go thru a non walkable zone
 * * code heightmap.pathfinding.js
 *   * create pathfinding.js grid
 *   * tile the heightmap image
 *     * as parameter, add a function to know if a given tile is walkable or not
 *     * where to put the tile ?
 *     * for the tile dimension, tileW, tileH
 *     * for the tile offset, tileX, tileY
 *   * similar to the tquery.simplemaze.pathfinding.js
 *   * how to write that ?
 *     * generate the grid
 *     * handle the pathfinding.js to the get path
 *     * get the path, display it 
 * * better understanding of the behavior tree
 *   * when each function are entered
 *   * can function and state entering function
 *   * first understand the logic behind the lib before applying it to your own case
 *   * do not try to jump
 * * describe a tester for the image normal occlusion boundary
 *   * display the heightmap itself
 *   * display the boundary image extracted from it
 *   * display parser window dimension
 *   * display a magnified parser window on the side, which is under the 
 *     mouse when overing the boundary image. good for testing
 *     * include the source data, aka the pixels in the parser window from the boundary image 
 *     * display center of window
 *     * display boundary entry point, boundary exit point
 *     * display line between the two
 *     * display same slope line at the center / boundary point.
 *   * normal extraction is a offline process
 *     * running time isnt relevant
 *     * keep the code as simple as possible
 * * DONE without modif control - code the collision from heightmap
 *   * event notified by minecraftcontrol
 *   * hook postChange event, function(previousPosition, currentPosition)
 *     * if currentPosition is a non walkable, compute actual position post impact with non walkble
 *     * set position to this value
 *   * what about just a function after in the render loop
 */

/**
 * @class handle heightmap in 3d
 */
tQuery.registerStatic('HeightMap', function(opts){
	// set default value
	this._opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		minNonWalkable	: 243
	});
	// sanity check
	console.assert(opts.bboxMin instanceof THREE.Vector3)
	console.assert(opts.bboxMax instanceof THREE.Vector3)
	
	this._imageData		= null;
	this._debugTexture	= null;

	// load the url if present
	this._opts.url	&& this.loadFromImage(this._opts.url)
});

// make it eventable
tQuery.MicroeventMixin(tQuery.HeightMap.prototype);

/**
 * Load the heightmap from a image
 * 
 * @param  {String} url the url pointing on the image location
 * @returns {tQuery.HeighMap} for chained api
 */
tQuery.HeightMap.prototype.loadFromImage = function(url){
	// load the image
	var image	= new Image();
	// bind load event
	image.onload	= function(){
		// create the canvas
		var canvas	= document.createElement('canvas');
		var context	= canvas.getContext('2d');
		canvas.width	= image.width;
		canvas.height	= image.height;
		
		// draw the loaded image to the canvas
		context.drawImage(image, 0, 0, canvas.width, canvas.height);

		// get ImageData
		this._imageData	= context.getImageData(0, 0, canvas.width, canvas.height);
		console.log('imageData', this._imageData)
		// dispatch the 'load' event
		this.dispatchEvent("load");
	}.bind(this);
	// start loading
	image.src = url;
	// for chained api
	return this;
};

/**
 * test if the map is loaded
 * 
 * @return {Boolean} true if the map is alredy loaded, false otherwise
 */
tQuery.HeightMap.prototype.isLoaded = function(){
	return this._imageData ? true : false;
};

tQuery.HeightMap.prototype.minNonWalkable = function() {
	return this._opts.minNonWalkable;
};

/**
 * Generate a debug canvas based on the heightMap
 * 
 * @return {HTMLCanvasElement} the just built canvas
 */
tQuery.HeightMap.prototype.buildDebugCanvas = function() {
	// sanity check - 
	console.assert( this.isLoaded(), 'the map isnt loaded');
	// create the canvas
	var canvas	= document.createElement("canvas");
	var context	= canvas.getContext("2d");
	canvas.width	= this._imageData.width;
	canvas.height	= this._imageData.height;
	// copy back the data in the canvas
	context.putImageData(this._imageData, 0, 0);
	// return the just-built canvas
	return canvas;
};

/**
 * return height for a given vector3
 * 
 * @param  {THREE.Vector3} vector3 the location where to pick the height
 * @return {Number}        the height at this point. if Infinity it is in a nonWalkable zone
 */
tQuery.HeightMap.prototype.heightAt = function(position, inputCoords){
	inputCoords	= inputCoords	|| [{
		deltaX	: 0,
		deltaY	: 0,
		weight	: 1,	
	}];
	// sanity check - ensure the map is already loaded
	console.assert(this.isLoaded(), 'the map MUST be loaded before');

	// init some variables
	var canvasPos	= tQuery.createVector2();
	var bboxMin	= this._opts.bboxMin;
	var bboxMax	= this._opts.bboxMax;
	var canvasW	= this._imageData.width;
	var canvasH	= this._imageData.height;

	// compute coordinate in the THREE.Vector2
	canvasPos.x	= (position.x - bboxMin.x) / (bboxMax.x - bboxMin.x);
	canvasPos.y	= (position.z - bboxMin.z) / (bboxMax.z - bboxMin.z);
	
	console.assert(canvasPos.x >= 0 && canvasPos.x <= 1)
	console.assert(canvasPos.y >= 0 && canvasPos.y <= 1)

	canvasPos.x	= Math.round(canvasPos.x * canvasW);	
	canvasPos.y	= Math.round(canvasPos.y * canvasH);
/*
 * TODO
 * * make a array of pixel offset to test. inputCoords = []
 * * default to [[0,0]]
 * * if out of the heightmap dimension, assume a height of 255
 * * return an array of height if the inputCoords.length > 1
 * * thus, user can agregate the way they like.
 */
 	var heights3D	= new Array(inputCoords.length);
	for(var i = 0; i < inputCoords.length; i++){
		var inputCoord	= inputCoords[i];

		var offset	= (canvasPos.y + inputCoord.deltaY) * canvasW
					+ (canvasPos.x + inputCoord.deltaX);
		var height	= this._imageData.data[offset*4 + 1];

		// return Infinite if in a non walkable zone	
		if( height >= this._opts.minNonWalkable ){
			heights3D[i]	= Infinity;
		}else{
			heights3D[i]	= height/255 * (bboxMax.y - bboxMin.y) + bboxMin.y;
		}
	}
	
	return heights3D;
};
