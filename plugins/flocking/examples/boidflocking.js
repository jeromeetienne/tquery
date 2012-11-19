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
			_acceleration.addSelf( vector );

			vector.set( _width, this.position.y, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.addSelf( vector );

			vector.set( this.position.x, - _height, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.addSelf( vector );

			vector.set( this.position.x, _height, this.position.z );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.addSelf( vector );

			vector.set( this.position.x, this.position.y, - _depth );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.addSelf( vector );

			vector.set( this.position.x, this.position.y, _depth );
			vector = this.avoid( vector );
			vector.multiplyScalar( 5 );
			_acceleration.addSelf( vector );

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
			_acceleration.addSelf( this.reach( _goal, 0.005 ) );
		}

		_acceleration.addSelf( this.alignment( boids ) );
		_acceleration.addSelf( this.cohesion( boids ) );
		_acceleration.addSelf( this.separation( boids ) );
	}

	/**
	 * move this boid
	 */
	this.move = function () {
		// update velocity with _acceleration
		this.velocity.addSelf( _acceleration );
		_acceleration.set( 0, 0, 0 );
		// keep speed <= _maxSpeed
		var speed = this.velocity.length();
		if( speed > _maxSpeed ){
			this.velocity.divideScalar( speed / _maxSpeed );
		}
		// update position with velocity
		this.position.addSelf( this.velocity );
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
		steer.subSelf( target );

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
		steer.sub( this.position, target );
		steer.multiplyScalar( 0.5 / distance );
		// add steer vector
		_acceleration.addSelf( steer );
	}

	this.reach = function ( target, amount ) {

		var steer = new THREE.Vector3();

		steer.sub( target, this.position );
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

				velSum.addSelf( boid.velocity );
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
				posSum.addSelf( boid.position );
				count++;
			}
		}

		if( count > 0 )	posSum.divideScalar( count );

		steer.sub( posSum, this.position );

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
				repulse.sub( this.position, boid.position );
				repulse.normalize();
				repulse.divideScalar( distance );
				posSum.addSelf( repulse );
			}
		}
		return posSum;
	}
}
