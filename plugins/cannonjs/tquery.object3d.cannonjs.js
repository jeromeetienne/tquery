tQuery.Object3D.registerInstance('setCannonjs', function(opts){
	var object3D	= this;
	var ctx		= new tQuery.Object3D.CannonjsCtx(object3D, opts)
	ctx.back(object3D)
	tQuery.data(object3D, 'cannonjsCtx', ctx, true);
	return ctx;
	
});

tQuery.Object3D.registerInstance('cannonjs', function(){
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
	object3D.enableCannonjs(opts);
});

tQuery.Object3D.CannonjsCtx.prototype.destroy = function(){
};

/**
 * getter/setter for .back()
 */
tQuery.Object3D.CannonjsCtx.prototype.back = function(value) {
	if( value === undefined )	return this._back;
	this._back	= value;
	return this;
};

tQuery.Object3D.CannonjsCtx.prototype.body = function(){
	var body	= this._object3D.cannonjsBody();
	return body;
}

tQuery.Object3D.CannonjsCtx.prototype.addTo = function(physicsWorld){
	var body	= this._object3D.cannonjsBody();
	physicsWorld.add(body);
	return this;
}

tQuery.Object3D.CannonjsCtx.prototype.position = function(x,y,z){
	var body	= this._object3D.cannonjsBody();
	body.position.set(x,y,z)
	return this;
};


//////////////////////////////////////////////////////////////////////////////////
//	obsolet api ... put that in CannonjsCtx					//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.registerInstance('enableCannonjs', function(opts){
	var object3D	= this;
	var tObject3D	= object3D.get(0);
	// handle default values
	opts	= tQuery.extend(opts, {
		world	: tQuery.world,
		mass	: 1,
	});
	var world	= opts.world;
	
	
	tObject3D.useQuaternion	= true;

	if( tObject3D.geometry instanceof THREE.SphereGeometry ){
		var bboxSize	= object3D.geometry().computeAll().size();
		var radius	= bboxSize.x/2;
		var shape	= new CANNON.Sphere(radius);
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

	world.loop().hook(function(delta, now){
        	// update 3d object with physics data
		body.position.copy(tObject3D.position);
        	body.quaternion.copy(tObject3D.quaternion);
	});
	
	return this;	// for chained API
});

tQuery.Object3D.registerInstance('cannonjsBody', function(){
	var object3D	= this;
	var body	= tQuery.data(object3D, 'cannonjsBody');
	return body;
});

tQuery.Object3D.registerInstance('hasCannonjs', function(){
	var object3D	= this;
	var body	= tQuery.data(object3D, 'cannonjsBody');
	return body ? true : false;
});

tQuery.Object3D.registerInstance('disableCannonjs', function(){
	console.assert(false, 'not yet implemented')
	return this;	// for chained API
});



