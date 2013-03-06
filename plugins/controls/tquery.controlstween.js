tQuery.registerStatic('createControlsTween', function(opts){
	return new tQuery.ControlsTween(opts)
})



tQuery.registerStatic('ControlsTween', function(opts){
	// call parent constructor
	tQuery.ControlsTween.parent.constructor.call(this, tQuery.extend(opts, {
		controls	: this
	}));
	// handle parameters default
	opts	= tQuery.extend(opts, {
		positionTween	: function(source, target, deltaSecond){
			var damping	= 1 * deltaSecond;
			return target.clone().sub(source).multiplyScalar(damping)
		},
		rotationTween	: function(source, target, deltaSecond){
			var damping	= 1 * deltaSecond;
			return target.clone().sub(source).multiplyScalar(damping)
		},
	});
	// parameter sanity check
	console.assert( opts.source instanceof tQuery.Object3D )
	console.assert( opts.target instanceof tQuery.Object3D )

	this._source	= opts.source
	this._target	= opts.target
	this._positionTween	= opts.positionTween
	this._rotationTween	= opts.rotationTween
});

// inheritance
tQuery.inherit(tQuery.ControlsTween, tQuery.ControlsWrapper);


tQuery.ControlsTween.prototype.update	= function(delta, now){
	var tSource	= this._source.get(0);
	var tTarget	= this._target.get(0);

	tSource.updateMatrixWorld();
	tTarget.updateMatrixWorld();

	var sourceMat	= tSource.matrixWorld;
	var targetMat	= tTarget.matrixWorld;

	var sourceEuler	= tSource.eulerOrder;
	var targetEuler	= tTarget.eulerOrder;

	var sourcePos	= tQuery.createVector3().getPositionFromMatrix(sourceMat);
	var targetPos	= tQuery.createVector3().getPositionFromMatrix(targetMat);
	var deltaPos	= this._positionTween(sourcePos, targetPos, delta)
	this._source.translate(deltaPos);

	var sourceRot	= tQuery.createVector3().setEulerFromRotationMatrix(sourceMat, sourceEuler)
	var targetRot	= tQuery.createVector3().setEulerFromRotationMatrix(targetMat, targetEuler)
	var deltaRot	= this._rotationTween(sourceRot, targetRot, delta)
	this._source.rotate(deltaRot);
}

/**
 * getter/setter for target
 * @param  {tQuery.Object3D} value	the target object
 * @return {tQuery.ControlsTween}       for chained api
 */
tQuery.ControlsTween.prototype.target = function(value){
	if( value === undefined )	return this._target
	this._target	= value
	return this;
};


