tQuery.registerStatic('Cat', function(opts){
	// handle arguments polymorphism
	
	// handle arguments default value
	opts	= tQuery.extend(opts, {
	});
	// handle arguments sanity check
	console.assert( opts.url, "url MUST be specified" )

	// your code goes here
});

/**
 * explicit destructor
 */
tQuery.Cat.prototype.destroy	= function(){
	
};

tQuery.registerStatic('createCat', function(opts){
	return new tQuery.Cat(opts)
});

/**
 * inherit from tQuery.Animal
*/
tQuery.inherit(tQuery.Cat, tQuery.Animal);



































