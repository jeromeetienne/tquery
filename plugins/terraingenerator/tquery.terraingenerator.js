;(function(){

/**
 * Generate a light map
 * TODO make it more tunable
 * TODO make that usable standalone
*/
function generateTexture( data, width, height ){

	var sun		= new THREE.Vector3( 1, 0.5, 1 );
	sun.normalize();

	var canvas	= document.createElement( 'canvas' );
	canvas.width	= width;
	canvas.height	= height;

	var context	= canvas.getContext( '2d' );
	context.fillStyle = '#000';
	context.fillRect(0, 0, width, height );

	var image	= context.getImageData( 0, 0, canvas.width, canvas.height );
	var imageData	= image.data;

	var minColor	= new THREE.Color().setRGB(0.375, 0.125, 0);
	var rngColor	= new THREE.Color().setRGB(0.5, 0.375, 0.375);

	var normal	= new THREE.Vector3( 0, 0, 0 );
	for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
		// compute the normal
		normal.x	= data[ j - 2 ] - data[ j + 2 ];
		normal.y	= 2;
		normal.z	= data[ j - width * 2 ] - data[ j + width * 2 ];
		normal.normalize();
		// compute the shade
		var shade	= normal.dot( sun );
		// fill the pixel
		// - make color tunable
		var factor		= 256.0 * ( 0.5 + data[ j ] * 0.015 );
		//var factor		= 256.0;
		imageData[i + 0]	= (minColor.r + shade * rngColor.r) * factor;
		imageData[i + 1]	= (minColor.g + shade * rngColor.g) * factor;
		imageData[i + 2]	= (minColor.b + shade * rngColor.b) * factor;
	}
	// draw the image in a canvas
	context.putImageData(image, 0, 0);

return canvas;

	// Scaled 4x
	var canvasScaled	= document.createElement( 'canvas' );
	canvasScaled.width	= width  * 4;
	canvasScaled.height	= height * 4;

	var context	= canvasScaled.getContext( '2d' );
	context.scale(4, 4);
	context.drawImage(canvas, 0, 0);


	var image	= context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
	var imageData	= image.data;
	for(var i = 0; i < imageData.length; i += 4){
		var v	= Math.floor( Math.random() * 5 );
		imageData[i + 0]	+= v;
		imageData[i + 1]	+= v;
		imageData[i + 2]	+= v;
	}
	context.putImageData(image, 0, 0);

	return canvasScaled;

}

/**
 * Generate a terrain from Perlin
 * TODO make it more tunable
 * TODO make that usable standalone
*/
function generateHeight( width, height )
{
	var size	= width * height;
	var heights	= new Float32Array( size );
	var perlin	= new ImprovedNoise();
	var z		= Math.random() * 100;
	var quality	= 1;

	// zero the heights
	for(var i = 0; i < size; i ++)	heights[i] = 0;

// TODO find out what are all those constant and make them tunable

	for(var j = 0; j < 4; j++ ){
		for(var y = 0, i = 0; y < height; y++ ){
			for(var x = 0; x < width; x++, i++ ){
				var i		= x + y * width;
				var noise	= perlin.noise( x / quality, y / quality, z );
				heights[i]	+= Math.abs( noise * quality * 1.75 *2 );
			}
		}
		quality *= 5;
	}
	// return the generated heights
	return heights;
}


/**
 * terrain generator geometry
 *
 * all hard work in http://mrdoob.github.com/three.js/examples/webgl_geometry_terrain.html
*/
tQuery.registerStatic('generateTerrainGeometry', function(opts){
	
	opts	= tQuery.extend(opts, {
		width		: 10,
		height		: 10,
		segmentsW	: 128*2,
		segmentsH	: 128*2
	});

	// build basic geometry
	var tGeometry	= new THREE.PlaneGeometry(opts.width, opts.height, opts.segmentsW-1, opts.segmentsH-1 );
	tGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	var heights	= generateHeight( opts.segmentsW, opts.segmentsH );	
	for( var i = 0; i < tGeometry.vertices.length; i ++ ){
// TODO find out what are all those constant and make them tunable
		tGeometry.vertices[i].y = heights[i] / 375;
	}
	
	var canvas	= generateTexture( heights, opts.segmentsW, opts.segmentsH );
	var texture	= new THREE.Texture(canvas);
	texture.needsUpdate = true;

	// mark the vertices as dirty
	tGeometry.verticesNeedUpdate = true;
	tGeometry.computeBoundingBox();
	tGeometry.computeCentroids();	
	tGeometry.computeFaceNormals();
	tGeometry.computeVertexNormals();
	
	return {
		geometry	: tQuery(tGeometry),
		texture		: texture
	};
});	

})();