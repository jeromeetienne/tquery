tQuery.registerStatic('createControlsTween', function(opts){
	return new tQuery.ControlsTween(opts)
})


tQuery.registerStatic('ControlsTween', function(opts){
		// handle parameters default
	opts	= tQuery.extend(opts, {
		positionTween	: function(source, target){
			var delta	= target.clone().sub(source)
			delta.multiplyScalar(0.01)
			// var maxDelta	= 0.01;
			// if( deltaPos.length() > maxDelta )	deltaPos.setLength(maxDelta);
			return delta;
		},
		rotationTween	: function(source, target){
			var delta	= target.clone().sub(source)
			delta.multiplyScalar(0.01)
			// var maxDelta	= 0.01;
			// if( deltaRot.length() > maxDelta )	deltaRot.setLength(maxDelta);
			// if( deltaRot.x > maxDelta )	deltaRot.x	= maxDelta;
			// if( deltaRot.y > maxDelta )	deltaRot.y	= maxDelta;
			// if( deltaRot.z > maxDelta )	deltaRot.z	= maxDelta;
			return delta
		}
	});
	// parameter sanity check
	console.assert( opts.source instanceof tQuery.Object3D )
	console.assert( opts.target instanceof tQuery.Object3D )

	this._source	= opts.source
	this._target	= opts.target
	this._positionTween	= opts.positionTween
	this._rotationTween	= opts.rotationTween
});

tQuery.ControlsTween.prototype.update	= function(delta){
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
	var deltaPos	= this._positionTween(sourcePos, targetPos)
	this._source.translate(deltaPos);

	var sourceRot	= tQuery.createVector3().setEulerFromRotationMatrix(sourceMat, sourceEuler)
	var targetRot	= tQuery.createVector3().setEulerFromRotationMatrix(targetMat, targetEuler)
	var deltaRot	= this._rotationTween(sourceRot, targetRot)
	this._source.rotate(deltaRot);
}

