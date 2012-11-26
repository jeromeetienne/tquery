/**
 * @class handle heightmap in 3d
 */
tQuery.registerStatic('HeightMap', function(opts){
	// set default value
	this._opts	= tQuery.extend(opts, {
		
	})
	// sanity check
	console.assert(opts.bboxMin instanceof THREE.Vector3)
	console.assert(opts.bboxMax instanceof THREE.Vector3)

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
tQuery.HeightMap.prototype.isLoaded = function() {
	// TODO to implement
	return true;
};

/**
 * return height for a given vector3
 * 
 * @param  {THREE.Vector3} vector3 the location where to pick the height
 * @return {Number}        the height at this point
 */
tQuery.HeightMap.prototype.heightAt = function(vector3){
	// sanity check - ensure the map is already loaded
	console.log(this.isLoaded(), 'the map MUST be loaded before');
	// TODO to implement

	// init some variables
	var vector2	= tQuery.createVector2();
	var bboxMin	= this._opts.bboxMin;
	var bboxMax	= this._opts.bboxMax;
	// compute coordinate in the THREE.Vector2
	var bboxWidth	= bboxMax.x - bboxMin.x;
	vector2.x	= (vector3.x - bboxMin.x) / bboxWidth;
	var bboxDepth	= bboxMax.z - bboxMin.z;
	vector2.y	= (vector3.z - bboxMin.z) / bboxDepth;
};

