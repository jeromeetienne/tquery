// Based on http://www.openprocessing.org/visuals/?visualID=6910
// #### TODO pass in tQuery plugins
// * tQuery.extends for all parameters
// * .prototype function
// * bind it automatically 

var Boid = function() {
	var vector	= new THREE.Vector3();
	var _width	= 500;
	var _height	= 500; 
	var _depth	= 200; 
	var _goal;
	var _acceleration; 
	var _neighborhoodRadius = 100;
	var _maxSpeed		= 2;
	var _maxSteerForce	= 0.1;
	var _avoidWalls		= false;

	this.position = new THREE.Vector3();
	this.velocity = new THREE.Vector3();
	_acceleration = new THREE.Vector3();

	/**
	 * Set the goal of the boid - if any
	*/
	this.setGoal = function( target ){
		_goal = target;
	}
	/**
	 * getter/setter on the walls
	*/
	this.avoidWalls = function( value ){
		if( value === undefined )	return _avoidWalls;
		_avoidWalls = value;
		return this;
	};
	/**
	 * Setter on world size
	*/
	this.setWorldSize = function ( width, height, depth ) {
		_width	= width;
		_height = height;
		_depth	= depth;
	}

	this.run = function ( boids ) {

		if ( _avoidWalls ) {

			vector.set( - _width, this.position.y, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

			vector.set( _width, this.position.y, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

			vector.set( this.position.x, - _height, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

			vector.set( this.position.x, _height, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

			vector.set( this.position.x, this.position.y, - _depth );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

			vector.set( this.position.x, this.position.y, _depth );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.add( vector );

		}/* else {

			this.checkBounds();

		}
		*/

		if ( Math.random() > 0.5 ) {

			this.flock( boids );

		}

		this.move();

	}

	this.flock = function ( boids ) {

		if ( _goal ) {
			_acceleration.add( this.reach( _goal, 0.005 ) );
		}

		_acceleration.add( this.alignment( boids ) );
		_acceleration.add( this.cohesion( boids ) );
		_acceleration.add( this.separation( boids ) );
	}

	/**
	 * move this boid
	 */
	this.move = function () {
		// update velocity with _acceleration
		this.velocity.add( _acceleration );
		_acceleration.set( 0, 0, 0 );
		// keep speed <= _maxSpeed
		var speed = this.velocity.length();
		if( speed > _maxSpeed ){
			this.velocity.divideScalar( speed / _maxSpeed );
		}
		// update position with velocity
		this.position.add( this.velocity );
	}

	/**
	 * if the boid is out of the world - warp it around
	*/
	this.checkBounds = function () {
		if ( this.position.x >   _width )	this.position.x = - _width;
		if ( this.position.x < - _width )	this.position.x =   _width;
		if ( this.position.y >   _height )	this.position.y = - _height;
		if ( this.position.y < - _height )	this.position.y =   _height;
		if ( this.position.z >   _depth )	this.position.z = - _depth;
		if ( this.position.z < - _depth )	this.position.z =   _depth;
	}

	//

	this.avoid = function ( target ) {

		var steer = new THREE.Vector3();

		steer.copy( this.position );
		steer.sub( target );

		steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );

		return steer;

	}

	/**
	 * will steer away from the target
	 * @param  {[type]} target      [description]
	 * @param  {[type]} maxDistance [description]
	 * @return {[type]}             [description]
	 */
	this.repulse = function( target, maxDistance ){
		// sanity check
		console.assert( target !== undefined );
		console.assert( maxDistance !== undefined );
		// compute distance to the target
		var distance	= this.position.distanceTo( target );
		// if too far, do nothing
		if ( distance >= maxDistance )	return;
		// compute vector to steer away
		var steer	= new THREE.Vector3();
		steer.subVectors( this.position, target );
		steer.multiplyScalar( 0.5 / distance );
		// add steer vector
		_acceleration.add( steer );
	}

	this.reach = function ( target, amount ) {

		var steer = new THREE.Vector3();

		steer.subVectors( target, this.position );
		steer.multiplyScalar( amount );

		return steer;

	}

	this.alignment = function ( boids ) {

		var boid, velSum = new THREE.Vector3(),
		count = 0;

		for ( var i = 0, il = boids.length; i < il; i++ ) {

			if ( Math.random() > 0.6 ) continue;

			boid = boids[ i ];

			distance = boid.position.distanceTo( this.position );

			if ( distance > 0 && distance <= _neighborhoodRadius ) {

				velSum.add( boid.velocity );
				count++;

			}

		}

		if( count > 0 ){
			velSum.divideScalar( count );
			var l = velSum.length();
			if ( l > _maxSteerForce ) {
				velSum.divideScalar( l / _maxSteerForce );
			}
		}
		return velSum;
	}

	this.cohesion = function ( boids ) {
		var posSum	= new THREE.Vector3();
		var steer	= new THREE.Vector3();
		var count	= 0;

		for( var i = 0, il = boids.length; i < il; i ++ ){
			if ( Math.random() > 0.6 ) continue;

			var boid	= boids[ i ];
			var distance	= boid.position.distanceTo( this.position );

			if( distance > 0 && distance <= _neighborhoodRadius ){
				posSum.add( boid.position );
				count++;
			}
		}

		if( count > 0 )	posSum.divideScalar( count );

		steer.subVectors( posSum, this.position );

		var steerLen	= steer.length();
		if( steerLen > _maxSteerForce ) {
			steer.divideScalar( steerLen / _maxSteerForce );
		}
		return steer;
	}

	this.separation = function ( boids ) {
		var posSum	= new THREE.Vector3();
		var repulse	= new THREE.Vector3();

		for ( var i = 0, il = boids.length; i < il; i ++ ) {
			if( Math.random() > 0.6 )	continue;
			var boid	= boids[ i ];
			var distance	= boid.position.distanceTo( this.position );

			if( distance > 0 && distance <= _neighborhoodRadius ){
				repulse.subVectors( this.position, boid.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				posSum.add( repulse );
			}
		}
		return posSum;
	}
}
