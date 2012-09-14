/**
 * @fileoverview
 * 
 * TODO add _ prefix to private properties
 * TODO much cleanup needed
 * TODO no change of property from outside. use getter/setter
 * TODO only chained API
*/

/**
 * widely inspired from MD2Character.js from alteredq / http://alteredqualia.com/
 *
 * @name tQuery.MD2Character
 * @class
*/
tQuery.registerStatic('MD2Character', function(){
	this._scale		= 1;
	this.animationFPS	= 6;

	this._root		= new THREE.Object3D();
	this._meshBody		= null;
	this._meshWeapon	= null;

	this._skinsBody		= [];
	this._skinsWeapon	= [];

	this._weapons		= [];

	this._curAnimation	= null;
	this._nLoadInProgress	= 0;
});
//tQuery.MD2Character	= function(){

// make it eventable
tQuery.MicroeventMixin(tQuery.MD2Character.prototype);

// Make the class pluginable
tQuery.pluginsStaticOn(tQuery.MD2Character);

/**
 * Destructor
*/
tQuery.MD2Character.prototype.destroy	= function()
{
	console.log("tQuery.MD2Character destoy")
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Update the animation
 * 
 * @param {Number} deltaSeconds nb seconds since the last update
*/
tQuery.MD2Character.prototype.update	= function( deltaSeconds )
{
	if ( this._meshBody ) {
		var direction	= this._meshBody.direction;
		var timeBefore	= this._meshBody.time;
		// update the animation
		this._meshBody.updateAnimation( 1000 * deltaSeconds );
		// ugly kludge to get an event 'animationCompleted'
		var timeAfter	= this._meshBody.time;
		if( (direction === 1 && timeBefore > timeAfter) || (direction === -1 && timeAfter < timeBefore) ){
			this.trigger("animationCompleted", this, this._curAnimation)
			//console.log("endofanim", this._curAnimation)
		}
	}
	if ( this._meshWeapon ) {
		this._meshWeapon.updateAnimation( 1000 * deltaSeconds );
	}
	return this;	// for chained API
};

/**
 * @returns {THREE.Object3D} the object3D containing the object
*/
tQuery.MD2Character.prototype.container	= function(){
	return this._root;
}

/**
 * @return {Boolean} true if the character is loaded, false otherwise
*/
tQuery.MD2Character.prototype.isLoaded	= function(){
	return this._nLoadInProgress === 0 ? true : false;
}

/**
 * Getter/setter for the scale of the object
*/
tQuery.MD2Character.prototype.scale	= function(value){
	if( value === undefined )	return this._scale;
	this._scale	= value;
	return this;
}


//////////////////////////////////////////////////////////////////////////////////
//		Setter								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * @param {Boolean} enable true to enable wireframe, false otherwise
*/
tQuery.MD2Character.prototype.setWireframe = function ( enable )
{
	// TODO remove the added property on THREE.Mesh
	if( enable ){
		if ( this._meshBody )	this._meshBody.material	= this._meshBody.materialWireframe;
		if ( this._meshWeapon )	this._meshWeapon.material= this._meshWeapon.materialWireframe;
	} else {
		if ( this._meshBody )	this._meshBody.material	= this._meshBody.materialTexture;
		if ( this._meshWeapon )	this._meshWeapon.material= this._meshWeapon.materialTexture;
	}
	return this;	// for chained API
};

/**
 * Set the weapons
 *
 * @param {Number} index the index of the animations
*/
tQuery.MD2Character.prototype.setWeapon = function ( index )
{
	// make all weapons invisible
	for ( var i = 0; i < this._weapons.length; i ++ ){
		this._weapons[ i ].visible = false;
	}
	// set the active weapon
	var activeWeapon = this._weapons[ index ];

	if( activeWeapon ){
		activeWeapon.visible	= true;
		this._meshWeapon		= activeWeapon;

		activeWeapon.playAnimation( this._curAnimation, this.animationFPS );

		this._meshWeapon.baseDuration	= this._meshWeapon.duration;

		this._meshWeapon.time		= this._meshBody.time;
		this._meshWeapon.duration	= this._meshBody.duration;
	}
	return this;	// for chained API
};

/**
 * set the animation. TODO a setter/getter
 *
 * @param {string} animationName the animation name to set
*/
tQuery.MD2Character.prototype.animation = function( animationName )
{
	// for getter
	if( animationName === undefined ){
		return this._curAnimation;
	}
	// for setter when the animation is already the same, do nothign
	if( animationName === this._curAnimation ){
		return this;	// for chained API
	}
	// sanity check
	console.assert( Object.keys(this._meshBody.geometry.animations).indexOf(animationName) !== -1 );
	// setter on this._meshBody
	if ( this._meshBody ) {
		this._meshBody.playAnimation( animationName, this.animationFPS );
		this._meshBody.baseDuration	= this._meshBody.duration;
	}
	// setter on this._meshWeapon
	if ( this._meshWeapon ) {
		this._meshWeapon.playAnimation( animationName, this.animationFPS );
		this._meshWeapon.baseDuration	= this._meshWeapon.duration;
		this._meshWeapon.time		= this._meshBody.time;
	}
	// set the animation itself
	this._curAnimation = animationName;
	return this;	// for chained API
};

/**
 * @param {number} rate the rate to play the object
*/
tQuery.MD2Character.prototype.setPlaybackRate	= function( rate )
{
	if ( this._meshBody ){
		this._meshBody.duration = this._meshBody.baseDuration / rate;
	}
	if ( this._meshWeapon ){
		this._meshWeapon.duration = this._meshWeapon.baseDuration / rate;
	}
	return this;	// for chained API
};

/**
 * @param {Number} index set the index of the skin
*/
tQuery.MD2Character.prototype.setSkin	= function( index )
{
	if ( this._meshBody && this._meshBody.material.wireframe === false ) {
		console.assert( index < this._skinsBody.length );
		this._meshBody.material.map	= this._skinsBody[ index ];
	}
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		Loader								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Load the part of your characters
*/
tQuery.MD2Character.prototype.load		= function ( config )
{
	var _this		= this;
	this._nLoadInProgress	= config.weapons.length * 2 + config.skins.length + 1;

	var weaponsTextures = []
	for ( var i = 0; i < config.weapons.length; i ++ ){
		weaponsTextures[ i ] = config.weapons[ i ][ 1 ];
	}

	// SKINS
	this._skinsBody		= this._loadTextures( config.baseUrl + "skins/", config.skins );
	this._skinsWeapon	= this._loadTextures( config.baseUrl + "skins/", weaponsTextures );

	// BODY
	var loader	= new THREE.JSONLoader();

	loader.load( config.baseUrl + config.body, function( geometry ) {
		geometry.computeBoundingBox();
		_this._root.position.y	= - _this._scale * geometry.boundingBox.min.y;

		var mesh	= createPart( geometry, _this._skinsBody[ 0 ] );
		mesh.scale.set( _this._scale, _this._scale, _this._scale );

		_this._root.add( mesh );

		_this._meshBody		= mesh;
		_this._curAnimation	= geometry.firstAnimation;

		_this._checkLoadingComplete();
	} );

	// WEAPONS
	var generateCallback = function( index, name ){
		return function( geometry ) {
			var mesh	= createPart( geometry, _this._skinsWeapon[ index ] );
			mesh.scale.set( _this._scale, _this._scale, _this._scale );
			mesh.visible	= false;

			mesh.name	= name;

			_this._root.add( mesh );

			_this._weapons[ index ] = mesh;
			_this._meshWeapon = mesh;

			_this._checkLoadingComplete();
		}.bind(this);
	}.bind(this);

	for ( var i = 0; i < config.weapons.length; i ++ ) {
		var url		= config.baseUrl + config.weapons[ i ][ 0 ];
		var callback	= generateCallback( i, config.weapons[ i ][ 0 ] );
		loader.load( url, callback );
	}

	function createPart( geometry, skinMap ) {
		geometry.computeMorphNormals();

		var whiteMap		= THREE.ImageUtils.generateDataTexture( 1, 1, new THREE.Color( 0xffffff ) );
		var materialWireframe	= new THREE.MeshPhongMaterial({
			color		: 0xffaa00,
			specular	: 0x111111,
			shininess	: 50,
			wireframe	: true,
			shading		: THREE.SmoothShading,
			map		: whiteMap,
			morphTargets	: true,
			morphNormals	: true,
			perPixel	: true,
			metal		: false
		});

		var materialTexture	= new THREE.MeshPhongMaterial({
			color		: 0xffffff,
			specular	: 0x111111,
			shininess	: 50,
			wireframe	: false,
			shading		: THREE.SmoothShading,
			map		: skinMap,
			morphTargets	: true,
			morphNormals	: true,
			perPixel	: true,
			metal		: false
		});
		materialTexture.wrapAround = true;

		//

		var mesh	= new THREE.MorphAnimMesh( geometry, materialTexture );
		mesh.rotation.y = -Math.PI/2;

		mesh.castShadow		= true;
		mesh.receiveShadow	= true;

		//

		mesh.materialTexture	= materialTexture;
		mesh.materialWireframe	= materialWireframe;

		//

		mesh.parseAnimations();

		mesh.playAnimation( geometry.firstAnimation, _this.animationFPS );
		mesh.baseDuration	= mesh.duration;

		return mesh;
	};
	return this;	// for chained API
};

tQuery.MD2Character.prototype._checkLoadingComplete	= function()
{
	this._nLoadInProgress--;
	if( this._nLoadInProgress === 0 ){
		this.trigger('loaded');
	}
}

/**
 * Load a texture and return it
*/
tQuery.MD2Character.prototype._loadTextures	= function( baseUrl, textureUrls )
{
	var mapping	= new THREE.UVMapping();
	var textures	= [];
	var callback	= function(){
		this._checkLoadingComplete()
	}.bind(this);
	// load all textureUrls
	for( var i = 0; i < textureUrls.length; i ++ ){
		var url			= baseUrl + textureUrls[ i ];
		var texture		= THREE.ImageUtils.loadTexture( url, mapping, callback);
		textures[ i ]		= texture;
		textures[ i ].name	= textureUrls[ i ];
	}
	// return them
	return textures;
};
