/**
 * widely inspired from MD2Character.js from alteredq / http://alteredqualia.com/
*/
THREE.MD2Character = function()
{
	this.scale		= 1;
	this.animationFPS	= 6;

	this.root		= new THREE.Object3D();
	this.meshBody		= null;
	this.meshWeapon		= null;

	this.skinsBody		= [];
	this.skinsWeapon	= [];

	this.weapons		= [];

	this.activeAnimation	= null;
	this.onLoadComplete	= function () {};
	this._loadCounter	= 0;
};


THREE.MD2Character.prototype.setWireframe = function ( wireframeEnabled )
{
	if( wireframeEnabled ){
		if ( this.meshBody ) this.meshBody.material = this.meshBody.materialWireframe;
		if ( this.meshWeapon ) this.meshWeapon.material = this.meshWeapon.materialWireframe;
	} else {
		if ( this.meshBody ) this.meshBody.material = this.meshBody.materialTexture;
		if ( this.meshWeapon ) this.meshWeapon.material = this.meshWeapon.materialTexture;
	}
};

THREE.MD2Character.prototype.setWeapon = function ( index )
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
};

THREE.MD2Character.prototype.setAnimation = function( animationName )
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
};

THREE.MD2Character.prototype.setPlaybackRate	= function( rate )
{
	if ( this.meshBody ){
		this.meshBody.duration = this.meshBody.baseDuration / rate;
	}
	if ( this.meshWeapon ){
		this.meshWeapon.duration = this.meshWeapon.baseDuration / rate;
	}
};

THREE.MD2Character.prototype.setSkin	= function( index )
{
	if ( this.meshBody && this.meshBody.material.wireframe === false ) {
		this.meshBody.material.map	= this.skinsBody[ index ];
	}
};

THREE.MD2Character.prototype.update	= function( delta )
{
	if ( this.meshBody ) {
		this.meshBody.updateAnimation( 1000 * delta );
	}
	if ( this.meshWeapon ) {
		this.meshWeapon.updateAnimation( 1000 * delta );
	}
};


THREE.MD2Character.prototype.loadParts		= function ( config )
{
	var scope		= this;
	this._loadCounter	= config.weapons.length * 2 + config.skins.length + 1;

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
		scope.root.position.y	= - scope.scale * geometry.boundingBox.min.y;

		var mesh	= createPart( geometry, scope.skinsBody[ 0 ] );
		mesh.scale.set( scope.scale, scope.scale, scope.scale );

		scope.root.add( mesh );

		scope.meshBody		= mesh;
		scope.activeAnimation	= geometry.firstAnimation;

		scope._checkLoadingComplete();
	} );

	// WEAPONS

	var generateCallback = function ( index, name ) {

		return function( geometry ) {

			var mesh	= createPart( geometry, scope.skinsWeapon[ index ] );
			mesh.scale.set( scope.scale, scope.scale, scope.scale );
			mesh.visible	= false;

			mesh.name	= name;

			scope.root.add( mesh );

			scope.weapons[ index ] = mesh;
			scope.meshWeapon = mesh;

			scope._checkLoadingComplete();
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

		mesh.playAnimation( geometry.firstAnimation, scope.animationFPS );
		mesh.baseDuration	= mesh.duration;

		return mesh;
	};
};

THREE.MD2Character.prototype._checkLoadingComplete	= function()
{
	this._loadCounter--;
	if( this._loadCounter === 0 ){
		this.onLoadComplete();
	}
}

/**
 * Load a texture and return it
*/
THREE.MD2Character.prototype._loadTextures	= function( baseUrl, textureUrls )
{
	var mapping	= new THREE.UVMapping();
	var textures	= [];
	var callback	= function(){
		this._checkLoadingComplete()
	}.bind(this);
	// load all textureUrls
	for ( var i = 0; i < textureUrls.length; i ++ ) {
		var url			= baseUrl + textureUrls[ i ];
		var texture		= THREE.ImageUtils.loadTexture( url, mapping, callback);
		textures[ i ]		= texture;
		textures[ i ].name	= textureUrls[ i ];
	}
	// return them
	return textures;
};
