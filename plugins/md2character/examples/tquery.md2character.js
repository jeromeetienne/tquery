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
*/
tQuery.register('MD2Character', function(){
	this.scale		= 1;
	this.animationFPS	= 6;

	this._root		= new THREE.Object3D();
	this.meshBody		= null;
	this.meshWeapon		= null;

	this.skinsBody		= [];
	this.skinsWeapon	= [];

	this.weapons		= [];

	this.activeAnimation	= null;
	this._nLoadInProgress	= 0;
});

// make it eventable
tQuery.MicroeventMixin(tQuery.MD2Character.prototype);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MD2Character.prototype.update	= function( delta )
{
	if ( this.meshBody ) {
		this.meshBody.updateAnimation( 1000 * delta );
	}
	if ( this.meshWeapon ) {
		this.meshWeapon.updateAnimation( 1000 * delta );
	}
	return this;	// for chained API
};

tQuery.MD2Character.prototype.container	= function(){
	return this._root;
}

tQuery.MD2Character.prototype.isLoaded	= function(){
	return this._nLoadInProgress === 0 ? true : false;
}

//////////////////////////////////////////////////////////////////////////////////
//		Setter								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.MD2Character.prototype.setWireframe = function ( enable )
{
	// TODO remove the added property on THREE.Mesh
	if( enable ){
		if ( this.meshBody )	this.meshBody.material	= this.meshBody.materialWireframe;
		if ( this.meshWeapon )	this.meshWeapon.material= this.meshWeapon.materialWireframe;
	} else {
		if ( this.meshBody )	this.meshBody.material	= this.meshBody.materialTexture;
		if ( this.meshWeapon )	this.meshWeapon.material= this.meshWeapon.materialTexture;
	}
	return this;	// for chained API
};

tQuery.MD2Character.prototype.setWeapon = function ( index )
{
	// make all weapons invisible
	for ( var i = 0; i < this.weapons.length; i ++ ){
		this.weapons[ i ].visible = false;
	}
	// set the active weapon
	var activeWeapon = this.weapons[ index ];

	if( activeWeapon ){
		activeWeapon.visible	= true;
		this.meshWeapon		= activeWeapon;

		activeWeapon.playAnimation( this.activeAnimation, this.animationFPS );

		this.meshWeapon.baseDuration	= this.meshWeapon.duration;

		this.meshWeapon.time		= this.meshBody.time;
		this.meshWeapon.duration	= this.meshBody.duration;
	}
	return this;	// for chained API
};

tQuery.MD2Character.prototype.setAnimation = function( animationName )
{
	if ( this.meshBody ) {
		this.meshBody.playAnimation( animationName, this.animationFPS );
		this.meshBody.baseDuration	= this.meshBody.duration;
	}
	if ( this.meshWeapon ) {
		this.meshWeapon.playAnimation( animationName, this.animationFPS );
		this.meshWeapon.baseDuration	= this.meshWeapon.duration;
		this.meshWeapon.time		= this.meshBody.time;
	}
	this.activeAnimation = animationName;
	return this;	// for chained API
};

tQuery.MD2Character.prototype.setPlaybackRate	= function( rate )
{
	if ( this.meshBody ){
		this.meshBody.duration = this.meshBody.baseDuration / rate;
	}
	if ( this.meshWeapon ){
		this.meshWeapon.duration = this.meshWeapon.baseDuration / rate;
	}
	return this;	// for chained API
};

tQuery.MD2Character.prototype.setSkin	= function( index )
{
	if ( this.meshBody && this.meshBody.material.wireframe === false ) {
		this.meshBody.material.map	= this.skinsBody[ index ];
	}
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		Loader								//
//////////////////////////////////////////////////////////////////////////////////
tQuery.MD2Character.prototype.loadParts		= function ( config )
{
	var _this		= this;
	this._nLoadInProgress	= config.weapons.length * 2 + config.skins.length + 1;

	var weaponsTextures = []
	for ( var i = 0; i < config.weapons.length; i ++ ){
		weaponsTextures[ i ] = config.weapons[ i ][ 1 ];
	}

	// SKINS

	this.skinsBody	= this._loadTextures( config.baseUrl + "skins/", config.skins );
	this.skinsWeapon= this._loadTextures( config.baseUrl + "skins/", weaponsTextures );

	// BODY

	var loader	= new THREE.JSONLoader();

	loader.load( config.baseUrl + config.body, function( geometry ) {
		geometry.computeBoundingBox();
		_this._root.position.y	= - _this.scale * geometry.boundingBox.min.y;

		var mesh	= createPart( geometry, _this.skinsBody[ 0 ] );
		mesh.scale.set( _this.scale, _this.scale, _this.scale );

		_this._root.add( mesh );

		_this.meshBody		= mesh;
		_this.activeAnimation	= geometry.firstAnimation;

		_this._checkLoadingComplete();
	} );

	// WEAPONS

	var generateCallback = function( index, name ){
		return function( geometry ) {
			var mesh	= createPart( geometry, _this.skinsWeapon[ index ] );
			mesh.scale.set( _this.scale, _this.scale, _this.scale );
			mesh.visible	= false;

			mesh.name	= name;

			_this._root.add( mesh );

			_this.weapons[ index ] = mesh;
			_this.meshWeapon = mesh;

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
