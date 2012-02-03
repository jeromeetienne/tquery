
function generateHeight( width, height ) {

	var size	= width * height;
	var data	= new Float32Array( size );
	var perlin	= new ImprovedNoise();
	var quality	= 1;
	var z		= Math.random() * 100;

	for ( var i = 0; i < size; i ++ ) {
		data[ i ] = 0
	}

	for ( var j = 0; j < 4; j ++ ) {
		for ( var i = 0; i < size; i ++ ) {
			var x	= i % width;
			var y	= ~~ ( i / width );
			data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
		}

		quality *= 5;
	}

	return data;

}


/**
 * terrain generator geometry
 *
 * all hard work in http://mrdoob.github.com/three.js/examples/webgl_geometry_terrain.html
*/
tQuery.register('generateTerrainGeometry', function(opts){
	opts	= tQuery.extend(opts, {
		width		: 5,
		height		: 5,
		segmentsW	: 128,
		segmentsH	: 128		
	});

	var data	= generateHeight( opts.segmentsW, opts.segmentsH );
	
	var geometry	= new THREE.PlaneGeometry(opts.width, opts.height, opts.segmentsW-1, opts.segmentsH-1 );
	geometry.dynamic	= true;

	for( var i = 0; i < geometry.vertices.length; i ++ ){
		geometry.vertices[i].position.z = data[i] * 2 / 750;
	}
	

	// mark the vertices as dirty
	geometry.__dirtyVertices = true;
	geometry.computeBoundingBox();
	geometry.computeCentroids();	
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();
	
	return tQuery(geometry);
});	
