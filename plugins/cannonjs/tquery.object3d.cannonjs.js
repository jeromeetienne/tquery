//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('addCannonjs', function(opts){
	console.assert( this.hasCannonjs() === false );
	var object3D	= this;
	var ctx		= new tQuery.Object3D.CannonjsCtx(object3D, opts)
	ctx.back(object3D)
	tQuery.data(object3D, 'cannonjsCtx', ctx, true);
	return ctx;
	
});

tQuery.Object3D.registerInstance('removeCannonjs', function(opts){
	console.assert(false, 'not yet implemented')
});

tQuery.Object3D.registerInstance('hasCannonjs', function(){
	var object3D	= this;
	var ctx		= tQuery.data(object3D, 'cannonjsCtx');
	return ctx ? true : false;
});

tQuery.Object3D.registerInstance('cannonjs', function(){
	console.assert( this.hasCannonjs() === true );
	var object3D	= this;
	var ctx	= tQuery.data(object3D, 'cannonjsCtx');
	return ctx;
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerStatic('CannonjsCtx', function(object3D, opts){
	this._back	= null;	
	this._object3D	= object3D;

	var tObject3D	= this._object3D.get(0);
	// handle default values
	opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		mass	: 1,
		shape	: null
	});
	var world	= opts.world;
	
	
	tObject3D.useQuaternion	= true;

	if( opts.shape !== null ){
		var shape	= opts.shape;
	}else if( tObject3D.geometry instanceof THREE.SphereGeometry ){
		var bboxSize	= object3D.geometry().computeAll().size();
		var radius	= bboxSize.x/2;
		var shape	= new CANNON.Sphere(radius);
	}else if( tObject3D.geometry instanceof THREE.CylinderGeometry ){
		var bboxSize	= object3D.geometry().computeAll().size();
		var radius	= bboxSize.x/2;
		var height	= bboxSize.y;
		var shape	= new CANNON.Cylinder(radius, radius, height, 16);
	}else{
		var bboxSize	= object3D.geometry().computeAll().size();
		var shapeSize	= new CANNON.Vec3(bboxSize.x/2, bboxSize.y/2, bboxSize.z/2)
		var shape	= new CANNON.Box(shapeSize);
	}
	
	var body	= new CANNON.RigidBody(opts.mass,shape);	

	// copy position
	body.position.x	= object3D.positionX();
	body.position.y	= object3D.positionY();
	body.position.z	= object3D.positionZ();

	// store it in world.tQuery.
	tQuery.data(object3D, 'cannonjsBody', body, true);

	this._callback	= world.hook(function(delta, now){
		this.update();
	}.bind(this));	
});

tQuery.Object3D.CannonjsCtx.prototype.destroy = function(){
	world.unhook(this._callback);
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.CannonjsCtx.prototype.update = function(){
       	// update 3d object with physics data
	var body	= this.body();
	var tObject3D	= this._object3D.get(0);
	body.position.copy(tObject3D.position);
	body.quaternion.copy(tObject3D.quaternion);
	return this;
}

/**
 * getter/setter for .back()
 */
tQuery.Object3D.CannonjsCtx.prototype.back = function(value) {
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
};

/**
 * getter for body
 */
tQuery.Object3D.CannonjsCtx.prototype.body = function(){
	var body	= tQuery.data(this._object3D, 'cannonjsBody');
	return body;
}

/**
 * to add this object to the physics world
 */
tQuery.Object3D.CannonjsCtx.prototype.addTo = function(physicsWorld){
	var body	= this.body();
	physicsWorld.add(body);
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.CannonjsCtx.prototype.position = function(x,y,z){
	var body	= this.body();
	body.position.set(x,y,z)
	return this;
};

tQuery.Object3D.CannonjsCtx.prototype.positionX = function(value){
	var body	= this.body();
	if( value === undefined )	return body.position.x;
	body.position.x	= value;
	return this;
};

tQuery.Object3D.CannonjsCtx.prototype.positionY = function(value){
	var body	= this.body();
	if( value === undefined )	return body.position.y;
	body.position.y	= value;
	return this;
};

tQuery.Object3D.CannonjsCtx.prototype.positionZ = function(value){
	var body	= this.body();
	if( value === undefined )	return body.position.z;
	body.position.z	= value;
	return this;
};
