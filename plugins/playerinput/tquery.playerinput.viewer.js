//////////////////////////////////////////////////////////////////////////////////
//		Constructor							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('Viewer', function(opts){
	// handle arguments polymorphism
	if( opts instanceof tQuery.PlayerInput )	opts	= { playerInput: opts };
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		querySelector	: '#playerInputViewer'
	});
	// argments sanity check
	console.assert(opts.playerInput instanceof tQuery.PlayerInput)
	// your code goes here
	var input	= opts.playerInput;
	var world	= opts.world;
	// init callback to update input
	var domElement	= document.querySelector(opts.querySelector)
	function onUpdate(){
		domElement.innerText	= JSON.stringify(input, null, '\t')
	}
	// initial update
	onUpdate();
	// hook rendering loop
	var callback	= world.hook(onUpdate);
	this.addEventListener('destroy', function(){ world.unhook(callback)	});
});

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.Viewer.prototype)

/**
 * explicit destructor
 */
tQuery.PlayerInput.Viewer.prototype.destroy	= function(){
	this.dispatchEvent('destroy');
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.PlayerInput.registerStatic('createViewer', function(opts){
	return new tQuery.PlayerInput.Viewer(opts)
});
