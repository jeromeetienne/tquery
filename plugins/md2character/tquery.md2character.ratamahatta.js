/**
 * implement Ratamahatta character.
 * TODO seems to have issue with multilple characters. it may be about material 
 * caching. seems typically a microcache issue.
 *
 * @name	tQuery.RatamahattaMD2Character
 * @augments	tQuery.MD2Character
 * @constructor
*/
tQuery.registerStatic('RatamahattaMD2Character', function(opts){
	// call parent ctor
	var parent	= tQuery.RatamahattaMD2Character.parent;
	parent.constructor.call(this)
	// handle parameters
	opts	= tQuery.extend(opts, {
		baseUrl		: tQuery.RatamahattaMD2Character.baseUrl+'/models/ratamahatta/'
	});

	// handle the attachedWorld
	this._attachedWorld	= null;
	this._$loopCb		= this._loopCb.bind(this);

	// change the scale
	this.scale(0.03);

	// load the data
	this.load({
		baseUrl	: opts.baseUrl,
		body	: "ratamahatta.js",
		//skins	: [ "ratamahatta.png"],
		skins	: [ "ratamahatta.png", "ctf_b.png", "ctf_r.png", "dead.png", "gearwhore.png" ],
		weapons	: [
			[ "weapon.js", "weapon.png" ],
			[ "w_bfg.js", "w_bfg.png" ],
			[ "w_blaster.js", "w_blaster.png" ],
			[ "w_chaingun.js", "w_chaingun.png" ],
			[ "w_glauncher.js", "w_glauncher.png" ],
			[ "w_hyperblaster.js", "w_hyperblaster.png" ],
			[ "w_machinegun.js", "w_machinegun.png" ],
			[ "w_railgun.js", "w_railgun.png" ],
			[ "w_rlauncher.js", "w_rlauncher.png" ],
			[ "w_shotgun.js", "w_shotgun.png" ],
			[ "w_sshotgun.js", "w_sshotgun.png" ]
		]
	});
});

tQuery.RatamahattaMD2Character.baseUrl	= "../../../plugins/md2character/";

/**
 * inherit from tQuery.MD2Character
*/
tQuery.inherit(tQuery.RatamahattaMD2Character, tQuery.MD2Character);

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.RatamahattaMD2Character);

tQuery.RatamahattaMD2Character.prototype.destroy	= function(){
	// call parent ctor
	var parent	= tQuery.RatamahattaMD2Character.parent;
	parent.destroy.call(this)
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.RatamahattaMD2Character.prototype.attach	= function(world){
	if( this._attachedWorld )	this.detacheFrom(this.attachedWorld);
	world	= world	|| tQuery.world;
	this._attachedWorld	= world;
	world.add( this.container() )
	world.loop().hook(this._$loopCb);	
	return this;	// for chained API
};

tQuery.RatamahattaMD2Character.prototype.detach	= function(){
	world	= world || this._attachedWorld;
	world.remove(this.container())
	world.loop().unhook(this._$loopCb);
	this._attachedWorld	= null;
	return this;	// for chained API
};

tQuery.RatamahattaMD2Character.prototype._loopCb	= function(delta, now){
	this.update( delta, now);
}

//////////////////////////////////////////////////////////////////////////////////
//		.turn()								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Turn left
 * @param {Number} angle angle to turn to in radian 
*/
tQuery.RatamahattaMD2Character.prototype.turnLeft	= function(angle){
	if( angle === undefined )	angle = 0.1;
	return this.turn(+angle)
};

/**
 * Turn right
 * @param {Number} angle angle to turn to in radian 
*/
tQuery.RatamahattaMD2Character.prototype.turnRight	= function(angle){
	if( angle === undefined )	angle = 0.1;
	return this.turn(-angle)
};

/**
 * Turn to an angle
 * 
 * @param {Number} angle angle to turn to in radian 
*/
tQuery.RatamahattaMD2Character.prototype.turn	= function(angle){
	var character	= this;
	if( angle === undefined, "angle MUST be defined" );
	if( this.isLoaded() === false )	return this;
	var container	= character.container();
	container.rotation.y	+= angle;
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		.go()								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * go forward to a distance
 * 
 * @param {Number} angle angle to turn to in radian 
*/
tQuery.RatamahattaMD2Character.prototype.goForward	= function(distance){
	if( this.isLoaded() === false )	return this;
	distance	= distance !== undefined ? distance : 0.05;
	var container	= this.container();
	var angle	= container.rotation.y;
	
	var speed	= new THREE.Vector3(0, 0, distance);
	var matrix	= new THREE.Matrix4().makeRotationY(angle);
	matrix.multiplyVector3(speed);
	container.position.addSelf(speed);
	return this;	// for chained API
};
