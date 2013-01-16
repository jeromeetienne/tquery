/**
 * Create a texture cube. Suitable for skymap or envmap
 * 
 * @returns {THREE.Texture} the just-built texture 
*/
tQuery.registerStatic('createCubeTexture', function(opts){
	// handle parameters polymorphisms
	if( arguments.length === 2  ){
		var path	= arguments[0];
		var format	= arguments[1];
		var urls	= [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
	}else if( typeof(opts) === 'string' ){
		console.assert( tQuery.TextureCube.WellKnownUrls[opts], "no tQuery.TextureCube.WellKnownUrls for "+opts);
		var urls	= tQuery.TextureCube.WellKnownUrls[opts];
	}else if( opts instanceof THREE.Texture ){
		var textureCube	= opts;
		return textureCube;
	}else if( opts instanceof Array ){
		var urls	= opts;
	}else if( opts instanceof Object ){
		console.assert(opts.path	, "opts.path must be defined");
		console.assert(opts.format	, "opts.format must be defined");
		var urls	= [
			opts.path + 'px' + opts.format, opts.path + 'nx' + opts.format,
			opts.path + 'py' + opts.format, opts.path + 'ny' + opts.format,
			opts.path + 'pz' + opts.format, opts.path + 'nz' + opts.format
		];
	}else	console.assert(false, "opts invalid type "+opts);
	// sanity check
	console.assert(urls.length === 6)
	// create the textureCube
	var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
	// return it
	return textureCube;
});

/** @namespace */
tQuery.registerStatic('TextureCube', {});

/**
 * To create urls compatible with THREE.ImageUtils.loadTextureCube
*/
tQuery.TextureCube.createUrls	= function(basename, format, rootUrl, posPrefix, negPrefix){
	posPrefix	= posPrefix || "p";
	negPrefix	= negPrefix || "n";
	var path	= rootUrl + "/" + basename + "/";
	var urls	= [
		path + posPrefix + 'x' + format, path + negPrefix + 'x' + format,
		path + posPrefix + 'y' + format, path + negPrefix + 'y' + format,
		path + posPrefix + 'z' + format, path + negPrefix + 'z' + format
	];
	return urls;
}

/**
 * predefined urls compatible with THREE.ImageUtils.loadTextureCube.
 * They points toward the cube maps in plugins/assets
*/
tQuery.TextureCube.WellKnownUrls	= {
	bridge2			: tQuery.TextureCube.createUrls('Bridge2'		, '.jpg', '../../../plugins/assets/images/textures/cube', 'pos', 'neg'),
	escher			: tQuery.TextureCube.createUrls('Escher'		, '.jpg', '../../../plugins/assets/images/textures/cube'),
	park2			: tQuery.TextureCube.createUrls('Park2'			, '.jpg', '../../../plugins/assets/images/textures/cube', 'pos', 'neg'),
	park3Med		: tQuery.TextureCube.createUrls('Park3Med'		, '.jpg', '../../../plugins/assets/images/textures/cube'),
	pisa			: tQuery.TextureCube.createUrls('pisa'			, '.png', '../../../plugins/assets/images/textures/cube'),
	skybox			: tQuery.TextureCube.createUrls('skybox'		, '.jpg', '../../../plugins/assets/images/textures/cube'),
	swedishRoyalCastle	: tQuery.TextureCube.createUrls('SwedishRoyalCastle'	, '.jpg', '../../../plugins/assets/images/textures/cube'),

	mars			: tQuery.TextureCube.createUrls('mars'			, '.jpg', '../../../plugins/assets/images/textures/cube')
};
