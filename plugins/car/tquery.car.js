
tQuery.register('createCar', function(opts){
	return new tQuery.Car(opts)
});

/**
 * Plugins for sport car
*/
tQuery.register('Car', function(opts){
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		type	: "veyron",
		scale	: 1.5
	});

	this._opts.scale	/= 400;


	var car		= new THREE.Car();
	this._car	= car;
	car.modelScale	= this._opts.scale;
	
	car.backWheelOffset	= {
		"gallardo"	: 25 * car.modelScale,
		"veyron"	:  0 * car.modelScale
	}[this._opts.type];
	car.MAX_SPEED		*= car.modelScale;
	car.MAX_REVERSE_SPEED	*= car.modelScale;
	car.FRONT_ACCELERATION	*= car.modelScale;
	car.BACK_ACCELERATION	*= car.modelScale;
	car.FRONT_DECCELERATION	*= car.modelScale;
	car.STEERING_RADIUS_RATIO/= car.modelScale;

	car.callback	= function( object ) {
		console.log("callback called", object === car)
		console.dir(object)

		object.root.position.y	= {
			"gallardo"	: 0.13,
			"veyron"	: 0
		}[this._opts.type]
		world.add( object.root );

		//this._setMaterial();
		
		this._addFlare();
		
		this.trigger('load');
	}.bind(this);

	if( this._opts.type === "gallardo" ){
		car.loadPartsBinary( "obj/gallardo/parts/gallardo_body_bin.js", "obj/gallardo/parts/gallardo_wheel_bin.js" );	
	}else if( this._opts.type === "veyron" ){
		car.loadPartsBinary( "obj/veyron/parts/veyron_body_bin.js", "obj/veyron/parts/veyron_wheel_bin.js" );
	}else	console.assert(false);

	// the controls of the car
	this._controlsCar	= {
		moveForward	: false,
		moveBackward	: false,
		moveLeft	: false,
		moveRight	: false
	};

	// hook the rendering loop and update the car model
	this._loopCb	= function(deltaTime){
		this._car.updateCarModel( deltaTime, this._controlsCar );
	}.bind(this);
	world.loop().hook(this._loopCb);

	// to contains the flares sprite
	this._flareSprites	= {}
});

// make it pluginable at instance level
tQuery.pluginsInstanceOn(tQuery.Car);
// Make it pluginable at class level
tQuery.pluginsStaticOn(tQuery.Car);
// make it eventable
tQuery.MicroeventMixin(tQuery.Car.prototype);


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

tQuery.Car.prototype.flareVisible	= function(categories, value){
	var flareCategories	= ['frontA', 'frontB', 'backA', 'backB'];
	categories.forEach(function(category){
		console.assert( flareCategories.indexOf(category) !== -1 );
		var flares	= this._flareSprites[category];
		if( !flares )	return;
		flares.forEach(function(sprite){
			sprite.visible	= value;
		})
	}.bind(this))
};

tQuery.Car.prototype.flareOpacity	= function(categories, value){
	var flareCategories	= ['frontA', 'frontB', 'backA', 'backB'];
	categories.forEach(function(category){
		console.assert( flareCategories.indexOf(category) !== -1 );
		var flares	= this._flareSprites[category];
		if( !flares )	return;
		flares.forEach(function(sprite){
			sprite.opacity	= value;
		})
	}.bind(this))
};


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

	if( this._opts.type === "gallardo" ){
		var flares = [
			// front
			[ "frontA", scaleA, [ 70, 10, 160 ] ], [ "frontA", scaleA, [ 66, -1, 175 ] ], [ "frontA", scaleA, [ 66, -1, 165 ] ],
			[ "frontB", scaleB, [ 70, 10, 160 ] ], [ "frontB", scaleB, [ 66, -1, 175 ] ], [ "frontB", scaleB, [ 66, -1, 165 ] ],	
			[ "frontA", scaleA, [ -70, 10, 160 ] ], [ "frontA", scaleA, [ -66, -1, 175 ] ], [ "frontA", scaleA, [ -66, -1, 165 ] ],
			[ "frontB", scaleB, [ -70, 10, 160 ] ], [ "frontB", scaleB, [ -66, -1, 175 ] ], [ "frontB", scaleB, [ -66, -1, 165 ] ],
			
			// back
			[ "backA", scaleA, [ 61, 19, -185 ] ], [ "backA", scaleA, [ 55, 19, -185 ] ],
			[ "backB", scaleB, [ 61, 19, -185 ] ], [ "backB", scaleB, [ 55, 19, -185 ] ],
			[ "backA", scaleA, [ -61, 19, -185 ] ], [ "backA", scaleA, [ -55, 19, -185 ] ],
			[ "backB", scaleB, [ -61, 19, -185 ] ], [ "backB", scaleB, [ -55, 19, -185 ] ],
		];
		
	}else if( this._opts.type === "veyron" ){
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
	}else	console.assert(false);

	for( var i = 0; i < flares.length; i ++ ){
		var flare	= flares[i];
		var name	= flare[ 0 ];
		var param	= params[ name ];
		var scale	= flare[ 1 ] * this._car.modelScale;
		var position	= flare[ 2 ];

		var sprite	= new THREE.Sprite( param );
		sprite.scale.set( scale, scale, scale );
		sprite.position.set(position[0], position[1], position[2])
		// add the sprite
		object.bodyMesh.add( sprite );

		this._flareSprites[name]	= this._flareSprites[name] || [];
		this._flareSprites[name].push( sprite );
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
