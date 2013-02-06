tQuery.Object3D.registerInstance('enableCannonjs', function(opts){
	var object3D	= this;
	var tObject3D	= object3D.get(0);
	// handle default values
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	var world	= opts.world;
	
	
	tObject3D.useQuaternion	= true;

	var bboxSize	= object3D.geometry().computeAll().size();

	var shapeSize	= new CANNON.Vec3(bboxSize.x, bboxSize.y, bboxSize.z)
	var shape	= new CANNON.Box(shapeSize);
	var mass	= 1;
	
	var body	= new CANNON.RigidBody(mass,shape);	
	
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
