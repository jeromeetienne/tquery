/**
 * @fileOverview Plugins for tQuery.Object3D to play with .position/.rotation/.scale
*/

//////////////////////////////////////////////////////////////////////////////////
//		position 							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('position', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.position parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.position.copy(vector3);
	});
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('positionX', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.x = scalar;	});
	return this;
});
tQuery.Object3D.register('positionY', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.y = scalar;	});
	return this;
});
tQuery.Object3D.register('positionZ', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.position.z = scalar;	});
	return this;
});

tQuery.Object3D.register('translate', function(delta){
	// handle parameters
	if( typeof delta === "number" && arguments.length === 3 ){
		delta	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(delta instanceof THREE.Vector3, "Object3D.translate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.position.addSelf(delta);
	});
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Object3D.register('translateX'	, function(delta){ return this.translate(delta, 0, 0);	});
tQuery.Object3D.register('translateY'	, function(delta){ return this.translate(0, delta, 0);	});
tQuery.Object3D.register('translateZ'	, function(delta){ return this.translate(0, 0, delta);	});


//////////////////////////////////////////////////////////////////////////////////
//		rotation							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('rotation', function(vector3){
	// handle parameters polymorphism
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(vector3 instanceof THREE.Vector3, "Object3D.rotation parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.copy(vector3);
	})
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('rotationX', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.x = scalar;	});
	return this;
});
tQuery.Object3D.register('rotationY', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.y = scalar;	});
	return this;
});
tQuery.Object3D.register('rotationZ', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.rotation.z = scalar;	});
	return this;
});

tQuery.Object3D.register('rotate', function(angles){
	// handle parameter polymorphism
	if( typeof angles === "number" && arguments.length === 3 ){
		angles	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(angles instanceof THREE.Vector3, "Object3D.rotate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.rotation.addSelf(angles);
	})
	// return this, to get chained API	
	return this;
});


// some shortcuts
tQuery.Object3D.register('rotateX'	, function(angle){ return this.rotate(angle, 0, 0);	});
tQuery.Object3D.register('rotateY'	, function(angle){ return this.rotate(0, angle, 0);	});
tQuery.Object3D.register('rotateZ'	, function(angle){ return this.rotate(0, 0, angle);	});

//////////////////////////////////////////////////////////////////////////////////
//		scale								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Object3D.register('scale', function(scale){
	// handle parameters
	if( typeof scale === "number" && arguments.length === 1 ){
		scale	= new THREE.Vector3(scale, scale, scale);
	}else if( typeof scale === "number" && arguments.length === 3 ){
		scale	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(scale instanceof THREE.Vector3, "Object3D.scale parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.copy(scale);
	});
	// return this, to get chained API	
	return this;
});

tQuery.Object3D.register('scaleX', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.x = scalar;	});
	return this;
});
tQuery.Object3D.register('scaleY', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.y = scalar;	});
	return this;
});
tQuery.Object3D.register('scaleZ', function(scalar){
	console.assert(typeof scalar === "number" && arguments.length === 1);
	this.each(function(object3d){ object3d.scale.z = scalar;	});
	return this;
});

tQuery.Object3D.register('scaleBy', function(ratio){
	// handle parameters
	if( typeof ratio === "number" && arguments.length === 1 ){
		ratio	= new THREE.Vector3(ratio, ratio, ratio);
	}else if( typeof ratio === "number" && arguments.length === 3 ){
		ratio	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	// sanity check
	console.assert(ratio instanceof THREE.Vector3, "Object3D.rotate parameter error");
	// do the operation on each node
	this.each(function(object3d){
		object3d.scale.multiplySelf(ratio);
	})
	// return this, to get chained API	
	return this;
});

// some shortcuts
tQuery.Object3D.register('scaleXBy'	, function(ratio){ return this.scaleBy(ratio, 1, 1);	});
tQuery.Object3D.register('scaleYBy'	, function(ratio){ return this.scaleBy(1, ratio, 1);	});
tQuery.Object3D.register('scaleZBy'	, function(ratio){ return this.scaleBy(1, 1, ratio);	});
