//////////////////////////////////////////////////////////////////////////////////
//		Create funciton							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createCarCameraControls', function(opts, world){
	// handle parameters
	world	= world	|| tQuery.world;
	
	var controls	= new tQuery.CarCameraControls(opts);
	world.setCameraControls(controls);
	return controls;
});

//////////////////////////////////////////////////////////////////////////////////
//		Class								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('CarCameraControls', function(opts){
	// handle parameters polymorphism
	if( opts instanceof tQuery.Car ){
		opts	= { car : opts };
	}
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// sanity check
	console.assert(this._opts.car instanceof tQuery.Car);

	this._prevPosition	= null;
	this._curAngle		= 0;
	this._curDistance	= 0;
});

tQuery.CarCameraControls.prototype.update	= function()
{
	// attempts at camera control
	var spdDistance	= 0.95;
	var maxAngle	= Math.PI/5;
	var spdAngle	= 0.85;
	var car		= this._opts.car;
	var tObject3d	= car.model();

	var carAngle	= car._car.carOrientation;
	this._curAngle	= spdAngle*this._curAngle + (1-spdAngle)*carAngle;
	this._curAngle	= Math.max(this._curAngle, carAngle - maxAngle);
	this._curAngle	= Math.min(this._curAngle, carAngle + maxAngle);

	var distance	= -1;
	if( this._prevPosition ){
		var delta	= tObject3d.position.clone().subSelf(this._prevPosition);
		var speed	= delta.length();
		speed		= Math.max(speed, 0);
		speed		= Math.min(speed, 0.15);
		distance	= -1-(speed / 0.15)*4;
		
		this._curDistance	= spdDistance*this._curDistance + (1-spdDistance)*distance;			
	}
	this._prevPosition	= tObject3d.position.clone();

	// set camera position
	var tCamera	= this._opts.world.tCamera();
	var position	= new THREE.Vector3(0, 0.35, -0.4+0.3*this._curDistance);
	var matrix	= new THREE.Matrix4().makeRotationY(this._curAngle);
	matrix.multiplyVector3(position).addSelf(tObject3d.position);
	tCamera.position.copy(position);
	
	// set set camera target
	var tCamera	= this._opts.world.tCamera();
	var target	= new THREE.Vector3(0, 0, -2*this._curDistance);
	var matrix	= new THREE.Matrix4().makeRotationY(this._curAngle);
	matrix.multiplyVector3(target).addSelf(tObject3d.position);
	tCamera.lookAt(target);
}
