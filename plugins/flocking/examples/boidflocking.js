// Based on http://www.openprocessing.org/visuals/?visualID=6910

var Boid = function() {

	var vector		= new THREE.Vector3();
	var _acceleration; 
	var _width	= 500;
	var _height	= 500; 
	var _depth	= 200; 
	var _goal;
	var _neighborhoodRadius = 100;
	var _maxSpeed		= 4;
	var _maxSteerForce	= 0.1;
	var _avoidWalls		= false;

	this.position = new THREE.Vector3();
	this.velocity = new THREE.Vector3();
	_acceleration = new THREE.Vector3();

	this.setGoal = function ( target ) {

		_goal = target;

	}

	this.setAvoidWalls = function ( value ) {
		_avoidWalls = value;
	}

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

	this.move = function () {

		this.velocity.addSelf( _acceleration );

		var l = this.velocity.length();

		if ( l > _maxSpeed ) {

			this.velocity.divideScalar( l / _maxSpeed );

		}

		this.position.addSelf( this.velocity );
		_acceleration.set( 0, 0, 0 );
	}

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

	this.repulse = function ( target ) {

		var distance = this.position.distanceTo( target );

		if ( distance < 150 ) {

			var steer = new THREE.Vector3();

			steer.sub( this.position, target );
			steer.multiplyScalar( 0.5 / distance );

			_acceleration.addSelf( steer );

		}

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

		if ( count > 0 ) {

			velSum.divideScalar( count );

			var l = velSum.length();

			if ( l > _maxSteerForce ) {

				velSum.divideScalar( l / _maxSteerForce );

			}

		}

		return velSum;

	}

	this.cohesion = function ( boids ) {

		var boid, distance,
		posSum = new THREE.Vector3(),
		steer = new THREE.Vector3(),
		count = 0;

		for( var i = 0, il = boids.length; i < il; i ++ ){
			if ( Math.random() > 0.6 ) continue;

			boid = boids[ i ];
			distance = boid.position.distanceTo( this.position );

			if ( distance > 0 && distance <= _neighborhoodRadius ) {
				posSum.addSelf( boid.position );
				count++;
			}

		}

		if ( count > 0 ) {
			posSum.divideScalar( count );
		}

		steer.sub( posSum, this.position );

		var l = steer.length();

		if ( l > _maxSteerForce ) {
			steer.divideScalar( l / _maxSteerForce );
		}
		return steer;
	}

	this.separation = function ( boids ) {
		var boid, distance,
		posSum = new THREE.Vector3(),
		repulse = new THREE.Vector3();

		for ( var i = 0, il = boids.length; i < il; i ++ ) {
			if( Math.random() > 0.6 )	continue;
			boid = boids[ i ];
			distance = boid.position.distanceTo( this.position );

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
