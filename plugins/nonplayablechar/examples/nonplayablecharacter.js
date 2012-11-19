
/**
 * Non playable character
 */
var NonPlayableChar	= function(){
	// get minecraft character
	this._character	= tQuery.createMinecraftChar();
	// init bodyAnims
	this._bodyAnims	= new tQuery.MinecraftCharAnimations(this._character);




	// make instance of Machine and get the root nodes for the actor
	var treeJson	= NonPlayableChar.treeJson;
	this._states	= NonPlayableChar.states;
	var machine	= new Machine();
	this._state	= machine.generateTree(treeJson, this, this._states);


	this._target	= tQuery.createVector3();
	this._state	= this._state.tick();
	console.log('identifier', this._state.identifier);	
};

NonPlayableChar.prototype.character = function(){
	return this._character;
};

NonPlayableChar.prototype.update = function(delta, now){
	this._gotoTarget(this._target);
	
	if( this._reachedTarget(this._target) ){
		this._state	= this._state.tick();
		console.log('identifier', this._state.identifier);	
	}
};

/**
 * goto a target
 * @param  {THREE.Vector3} target the target to reach
 * @param  {Numer} speed  the speed at which it is going
 */
NonPlayableChar.prototype._gotoTarget = function(target, speed){
	// handle polymorphism
	speed		= speed !== undefined ? speed : 0.01;
	// compute distance with the target
	var object3D	= this._character.object3D()
	var delta	= target.clone()
				.subSelf(object3D.position());
	// if the target is so close than the speed would make it go beyond target, limit speed
	var distance	= delta.length();
	if( distance < speed )	speed	= distance;
	// compute velocity from distance
	var velocity	= delta.setLength(speed);
	// actually move the object
	object3D.translate(velocity)
}

/**
 * test if the character has reached a target
 * @param  {THREE.Vector3} target the target to reach
 * @param  {Number} minRange  the minimal range to the target
 * @return {boolean}        true if the target is reached, false otherwise
 */
NonPlayableChar.prototype._reachedTarget = function(target, minRange){
	// handle polymorphism
	minRange	= minRange !== undefined ? minRange : 0.0;
	// compute distance with the target
	var object3D	= this._character.object3D();
	var delta	= target.clone()
				.subSelf(object3D.position());
	var distance	= delta.length();
	// if distance < minRange then target is considered reached
	var reached	= distance <= minRange ? true : false;
	// return the result
	return reached;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

// the json that defines the trees that control the actors
NonPlayableChar.treeJson	= {
	identifier	: "idle",
	strategy	: "sequential",
	children	: [
		{ identifier	: "gotoPointA"	},
		{ identifier	: "gotoPointB"	},
		{ identifier	: "gotoPointC"	},
		{ identifier	: "gotoPointD"	},
	]
};


var pointA	= tQuery.createVector3(+1, 0, 0);
var pointB	= tQuery.createVector3( 0, 0,-1);
var pointC	= tQuery.createVector3(-1, 0, 0);
var pointD	= tQuery.createVector3( 0, 0,+1);

// machine.js -
NonPlayableChar.states	= {
	gotoPointA	: function(){
		this._target.copy(pointA);
	},
	canGotoPointA	: function(){
		if( this._reachedTarget(pointA) )	return false;
		return true;
	},

	gotoPointB	: function(){
		this._target.copy(pointB);
	},
	canGotoPointB	: function(){
		if( this._reachedTarget(pointB) )	return false;
		return true;
	},

	gotoPointC	: function(){
		this._target.copy(pointC);
	},
	canGotoPointC	: function(){
		if( this._reachedTarget(pointC) )	return false;
		return true;
	},

	gotoPointD	: function(){
		this._target.copy(pointD);
	},
	canGotoPointD	: function(){
		if( this._reachedTarget(pointD) )	return false;
		return true;
	},
};

