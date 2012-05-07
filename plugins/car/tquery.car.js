
/**
 * Plugins for sport car
*/
tQuery.register('Car', function(){
	var car	= new THREE.Car();
	this._car	= car;
	
	car.modelScale	 	= 1/400;
	car.backWheelOffset	= 25 * car.modelScale;
	car.MAX_SPEED		*= car.modelScale;
	car.MAX_REVERSE_SPEED	*= car.modelScale;
	car.FRONT_ACCELERATION	*= car.modelScale;
	car.BACK_ACCELERATION	*= car.modelScale;
	car.FRONT_DECCELERATION	*= car.modelScale;
	car.STEERING_RADIUS_RATIO/= car.modelScale/1.5;

	car.callback	= function( object ) {
		console.log("callback called", object === car)
		console.dir(object)

		object.root.position.set( 0, 0.13, 0 );
		world.add( object.root );

		//this._setMaterial();
		
		//this._addFlare();
	}.bind(this);

	car.loadPartsBinary( "obj/gallardo/parts/gallardo_body_bin.js", "obj/gallardo/parts/gallardo_wheel_bin.js" );

	this._controlsCar	= {
		moveForward	: false,
		moveBackward	: false,
		moveLeft	: false,
		moveRight	: false
	};

	this._loopCb	= function(deltaTime){
		this._car.updateCarModel( deltaTime, this._controlsCar );
	}.bind(this);
	world.loop().hook(this._loopCb);
});

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.Car);

tQuery.Car.prototype.destroy	= function(){
	world.loop().unhook(this._loopCb);
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Car.prototype.controls	= function(){
	return this._controlsCar;
}

tQuery.Car.prototype.object3d	= function(){
	return this._car.root;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Car.prototype._addFlare	= function(){
	var object	= this._car;
	var scaleA	= 2;
	var scaleB	= 5;

	// FLARES
	var flareA	= THREE.ImageUtils.loadTexture( "images/lensflare2.jpg" );
	var flareB	= THREE.ImageUtils.loadTexture( "images/lensflare0.png" );

	var params 	= {
		"frontA" 	: { map: flareA, useScreenCoordinates: false, color: 0xffffff, blending: THREE.AdditiveBlending },
		"frontB" 	: { map: flareB, useScreenCoordinates: false, color: 0xffffff, blending: THREE.AdditiveBlending },
		"backA" 	: { map: flareA, useScreenCoordinates: false, color: 0xff0000, blending: THREE.AdditiveBlending },
		"backB" 	: { map: flareB, useScreenCoordinates: false, color: 0xff0000, blending: THREE.AdditiveBlending }
	};

	var flares = [
		// front
		[ "frontA", scaleA, [  47, 38, 120 ] ]	, [ "frontA", scaleA, [  40, 38, 120 ] ], [ "frontA", scaleA, [  32, 38, 122 ] ],
		[ "frontB", scaleB, [  47, 38, 120 ] ]	, [ "frontB", scaleB, [  40, 38, 120 ] ], [ "frontB", scaleB, [  32, 38, 122 ] ],
		[ "frontA", scaleA, [ -47, 38, 120 ] ]	, [ "frontA", scaleA, [ -40, 38, 120 ] ], [ "frontA", scaleA, [ -32, 38, 122 ] ],
		[ "frontB", scaleB, [ -47, 38, 120 ] ]	, [ "frontB", scaleB, [ -40, 38, 120 ] ], [ "frontB", scaleB, [ -32, 38, 122 ] ],
		// back
		[ "backA", scaleA, [  22, 50, -123 ] ]	, [ "backA", scaleA, [  32, 49, -123 ] ],
		[ "backB", scaleB, [  22, 50, -123 ] ]	, [ "backB", scaleB, [  32, 49, -123 ] ],
		[ "backA", scaleA, [ -22, 50, -123 ] ]	, [ "backA", scaleA, [ -32, 49, -123 ] ],
		[ "backB", scaleB, [ -22, 50, -123 ] ]	, [ "backB", scaleB, [ -32, 49, -123 ] ],		
	];

	for ( var i = 0; i < flares.length; i ++ ) {
		var flare	= flares[i];
		var param	= params[ flare[ 0 ] ];
		var scale	= flare[ 1 ];
		var position	= flare[ 2 ];

		var sprite = new THREE.Sprite( param );
		sprite.scale.set( scale, scale, scale );
		sprite.position.set( position[0]*1.5, position[1]/5, position[2]*1.5 );

		object.bodyMesh.add( sprite );
	}
};

tQuery.Car.prototype._setMaterial	= function()
{
	var car	= this._car;
	var materials	= car.bodyGeometry.materials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// body
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// front under lights, back

	materials	= car.wheelGeometry.materials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// insides
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// tire
}
