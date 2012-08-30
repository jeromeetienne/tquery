/**
 * Define a bird on top of THREE.Geometry 
 * see http://github.com/mrdoob/three.js/examples/object/bird.js
*/
var BirdGeometry = function(){
	// call the parent constructor
	THREE.Geometry.call( this );

	var scope = this;

	v(   5,   0,   0 );
	v( - 5, - 2,   1 );
	v( - 5,   0,   0 );
	v( - 5, - 2, - 1 );

	v(   0,   2, - 6 );
	v(   0,   2,   6 );
	v(   2,   0,   0 );
	v( - 3,   0,   0 );

	f3( 0, 2, 1 );
	// f3( 0, 3, 2 );

	f3( 4, 7, 6 );
	f3( 5, 6, 7 );

	this.computeCentroids();
	this.computeFaceNormals();

	/**
	 * Add a THREE.Vector3
	*/
	function v( x, y, z ) {
		scope.vertices.push( new THREE.Vector3( x, y, z ) );
	}
	/**
	 * Add a THREE.Face3
	*/
	function f3( a, b, c ) {
		scope.faces.push( new THREE.Face3( a, b, c ) );
	}
}

BirdGeometry.prototype = Object.create( THREE.Geometry.prototype );
