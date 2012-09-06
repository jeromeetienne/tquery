tQuery.MD2Character.registerStatic('CameraControls', function(opts){
	// handle parameters polymorphism
	if( opts instanceof tQuery.MD2Character ){
		opts	= { character : opts };
	}
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		camera		: tQuery.world.tCamera(),
		deltaPosition	: new THREE.Vector3(5,2,5).normalize().multiplyScalar(3),
		deltaLookAt	: new THREE.Vector3(0,0.3,0)
	});
	// sanity check
	console.assert(this._opts.character instanceof tQuery.MD2Character);
});

tQuery.MD2Character.CameraControls.prototype.update	= function()
{
	var opts	= this._opts;
	var container	= opts.character.container();
	var camera	= opts.camera;
	// if the character isnt yet loaded, do nothing
	if( opts.character.isLoaded() === false )	return;
	// camera position
	camera.position.copy(container.position);
	camera.position.addSelf(opts.deltaPosition);
	// camera lookAt
	camera.lookAt( container.position.clone().addSelf(opts.deltaLookAt) );
}
