//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('PlayerInput', function(){
	// this is left intentionnaly empty
	// - up to the drivers to handle it
});

tQuery.registerStatic('createPlayerInput', function(opts){
	return new tQuery.PlayerInput(opts)
});

// make it eventable
tQuery.MicroeventMixin(tQuery.PlayerInput.prototype)

// make it pluginable as static
tQuery.pluginsStaticOn(tQuery.PlayerInput);


