//////////////////////////////////////////////////////////////////////////////////
//		Create funciton							//
//////////////////////////////////////////////////////////////////////////////////
tQuery.registerStatic('createCar', function(opts){
	return new tQuery.Car(opts)
});

//////////////////////////////////////////////////////////////////////////////////
//		Class								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Plugins for sport car
*/
tQuery.registerStatic('Car', function(opts){
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		type	: "veyron",
		scale	: 1.5,
		world	: tQuery.world 
	});
	this._opts.scale	/= 400;

	console.assert( ["gallardo", "veyron"].indexOf(this._opts.type) !== -1 );


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
		object.root.position.y	= {
			"gallardo"	: 0.13,
			"veyron"	: 0
		}[this._opts.type]

		//this._setNormalMaterial();
		this._setNiceMaterial();

		this._addFlare();

		this._car.enableShadows(true);

		this.trigger('load');
	}.bind(this);

	// determine urls
	var baseUrl	= tQuery.Car.baseUrl;
	if( this._opts.type === "gallardo" ){
		var bodyUrl	= baseUrl + '/examples/obj/gallardo/parts/gallardo_body_bin.js'
		var wheelUrl	= baseUrl + '/examples/obj/gallardo/parts/gallardo_wheel_bin.js'
	}else if( this._opts.type === "veyron" ){
		var bodyUrl	= baseUrl + '/examples/obj/veyron/parts/veyron_body_bin.js'
		var wheelUrl	= baseUrl + '/examples/obj/veyron/parts/veyron_wheel_bin.js'
	}else	console.assert(false);
	// start loading
	car.loadPartsBinary(bodyUrl, wheelUrl);	

	// the controls of the car
	this._controlsCar	= {
		moveForward	: false,
		moveBackward	: false,
		moveLeft	: false,
		moveRight	: false
	};

	// hook the rendering loop and update the car model
	this._loopCb	= function(delta){
		this._car.updateCarModel(delta, this._controlsCar);
	}.bind(this);
	this._opts.world.loop().hook(this._loopCb);

	// to contains the flares sprite
	this._flareSprites	= {}
});

// make it pluginable at instance level
tQuery.pluginsInstanceOn(tQuery.Car);

// make it eventable
tQuery.MicroeventMixin(tQuery.Car.prototype);

tQuery.Car.baseUrl	= "../../../plugins/car/";


tQuery.Car.prototype.destroy	= function(){
	this._opts.world.loop().unhook(this._loopCb);
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Car.prototype.controls	= function(){
	return this._controlsCar;
}

tQuery.Car.prototype.model	= function(){
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
			[ "frontA", scaleA, [ 70, 10, 160 ] ]	, [ "frontA", scaleA, [ 66, -1, 175 ] ]	, [ "frontA", scaleA, [ 66, -1, 165 ] ],
			[ "frontB", scaleB, [ 70, 10, 160 ] ]	, [ "frontB", scaleB, [ 66, -1, 175 ] ]	, [ "frontB", scaleB, [ 66, -1, 165 ] ],	
			[ "frontA", scaleA, [ -70, 10, 160 ] ]	, [ "frontA", scaleA, [ -66, -1, 175 ] ], [ "frontA", scaleA, [ -66, -1, 165 ] ],
			[ "frontB", scaleB, [ -70, 10, 160 ] ]	, [ "frontB", scaleB, [ -66, -1, 175 ] ], [ "frontB", scaleB, [ -66, -1, 165 ] ],
			// back
			[ "backA", scaleA, [ 61, 19, -185 ] ]	, [ "backA", scaleA, [ 55, 19, -185 ] ],
			[ "backB", scaleB, [ 61, 19, -185 ] ]	, [ "backB", scaleB, [ 55, 19, -185 ] ],
			[ "backA", scaleA, [ -61, 19, -185 ] ]	, [ "backA", scaleA, [ -55, 19, -185 ] ],
			[ "backB", scaleB, [ -61, 19, -185 ] ]	, [ "backB", scaleB, [ -55, 19, -185 ] ],
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

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Car.prototype._setNormalMaterial	= function()
{
	var car		= this._car;
	var materials	= car.bodyMaterials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// body
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// front under lights, back

	var materials	= car.wheelMaterials;
	materials[ 0 ]	= new THREE.MeshNormalMaterial();	// insides
	materials[ 1 ]	= new THREE.MeshNormalMaterial();	// tire
}

tQuery.Car.prototype._setNiceMaterial	= function(){
	var textureCube	= tQuery.createCubeTexture('swedishRoyalCastle');
	// directly from altered demo
	var mlib	= {
		body: [],

		"Chrome"	: new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: textureCube  } ),
		"ChromeN"	: new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.75  } ),
		"Dark chrome"	: new THREE.MeshLambertMaterial( { color: 0x444444, ambient: 0x444444, envMap: textureCube } ),

		"Black rough"	: new THREE.MeshLambertMaterial( { color: 0x050505, ambient: 0x050505 } ),

		"Dark glass"	: new THREE.MeshLambertMaterial( { color: 0x101020, ambient: 0x101020, envMap: textureCube, opacity: 0.5, transparent: true } ),
		"Orange glass"	: new THREE.MeshLambertMaterial( { color: 0xffbb00, ambient: 0xffbb00, opacity: 0.5, transparent: true } ),
		"Red glass"	: new THREE.MeshLambertMaterial( { color: 0xff0000, ambient: 0xff0000, opacity: 0.5, transparent: true } ),

		"Black metal"	: new THREE.MeshLambertMaterial( { color: 0x222222, ambient: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Orange metal"	: new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } )
	}

	mlib.body.push( [ "Orange"	, new THREE.MeshLambertMaterial( { color: 0x883300, ambient: 0x883300, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Blue"	, new THREE.MeshLambertMaterial( { color: 0x113355, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Red"		, new THREE.MeshLambertMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.1 } ) ] );
	mlib.body.push( [ "Black"	, new THREE.MeshLambertMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );
	mlib.body.push( [ "White"	, new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );

	mlib.body.push( [ "Carmine"	, new THREE.MeshPhongMaterial( { color: 0x770000, specular: 0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );
	mlib.body.push( [ "Gold"	, new THREE.MeshPhongMaterial( { color: 0xaa9944, specular: 0xbbaa99, shininess: 50, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );
	mlib.body.push( [ "Bronze"	, new THREE.MeshPhongMaterial( { color: 0x150505, specular: 0xee6600, shininess: 10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.2 } ) ] );
	mlib.body.push( [ "Chrome"	, new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ) ] );

	var car	= this._car;
	if( this._opts.type === 'gallardo' ){
		// BODY
		var materials	= car.bodyMaterials;
		materials[ 0 ]	= mlib.body[ 0 ][ 1 ]; 		// body
		materials[ 1 ]	= mlib[ "Dark chrome" ]; 	// front under lights, back

		// WHEELS
		var materials	= car.wheelMaterials;
		materials[ 0 ]	= mlib[ "Chrome" ];		// insides
		materials[ 1 ]	= mlib[ "Black rough" ];		// tire
	}else if( this._opts.type === 'veyron' ){
		// 0 - top, front center, back sides
		// 1 - front sides
		// 2 - engine
		// 3 - small chrome things
		// 4 - backlights
		// 5 - back signals
		// 6 - bottom, interior
		// 7 - windshield
		
		// BODY
		var materials	= car.bodyMaterials;
		materials[ 0 ]	= mlib[ "Black metal" ];		// top, front center, back sides
		materials[ 1 ]	= mlib[ "Chrome" ];		// front sides
		materials[ 2 ]	= mlib[ "Chrome" ];		// engine
		materials[ 3 ]	= mlib[ "Dark chrome" ];		// small chrome things
		materials[ 4 ]	= mlib[ "Red glass" ];		// backlights
		materials[ 5 ]	= mlib[ "Orange glass" ];	// back signals
		materials[ 6 ]	= mlib[ "Black rough" ];		// bottom, interior
		materials[ 7 ]	= mlib[ "Dark glass" ];		// windshield
		
		// WHEELS		
		var materials	= car.wheelMaterials;
		materials[ 0 ]	= mlib[ "Chrome" ];		// insides
		materials[ 1 ]	= mlib[ "Black rough" ];		// tire
	}else	console.assert( false );
}

