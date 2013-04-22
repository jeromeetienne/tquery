//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('PlayerInput', function(opts){
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// init callback to update input
	var input	= this;
	var world	= opts.world;
	// initial update
	onUpdate();
	// hook rendering loop
	world.hook(onUpdate);
	this.addEventListener('destroy', function(){ world.unhook(callback)	});
	// onUpdate function
	function onUpdate(){
		// reset each value
		input.right	= false;
		input.left	= false;
		input.up	= false;
		input.down	= false;
		input.deltaX	= 0;		// < 0 for left - > 0 for right 
						// Math.abs(value) === 1 is normal speed
		input.deltaY	= 0;
	}
});

/**
 * explicit destructor
 */
tQuery.PlayerInput.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

tQuery.registerStatic('createPlayerInput', function(opts){
	return new tQuery.PlayerInput(opts)
});

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.prototype)

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.PlayerInput);

/**
 * convert playerInput value into a delta THREE.Vector2
 * @return {THREE.Vector2} vector
 */
tQuery.PlayerInput.prototype.toVector2 = function() {
	var vector	= new THREE.Vector2();
	var input	= this;
	// handle lateral 
	if( input.deltaX ){
		// if deltaX is provided, use it in priority 
		vector.x	= input.deltaX
	}else{
		// if no deltaX is provided, test boolean direction
		if( input.left )	vector.x = -1
		if( input.right )	vector.x =  1
	}
	// Handle horizontal
	if( input.deltaY ){
		// if deltaY is provided, use it in priority 
		vector.y	= input.deltaY
	}else{
		// if no deltaY is provided, test boolean direction
		if( input.up )		vector.y	= -1
		if( input.down )	vector.y	=  1
	}
	// return the just built vector
	return vector
};
