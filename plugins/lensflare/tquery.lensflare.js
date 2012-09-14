/**
 * Create a lens flare
*/
tQuery.registerStatic('createLensFlare', function(opts){
	// handle polymorphism
	opts		= opts	|| defaultOpts();
	// create the object
	var lensFlare	= new THREE.LensFlare();
	// add each flare in the lens flare
	opts.flareParams.forEach(function(flareParam){
		lensFlare.add.apply(lensFlare, flareParam)
	});
	// return the tQuery.Object3D
	return tQuery(lensFlare);
	
	/**
	 * the default options if no options are given
	*/
	function defaultOpts(){
		var opts	= {
			flareParams	: []
		};
		var color	= new THREE.Color( 0xffffff );
		THREE.ColorUtils.adjustHSV( color, 0, -0.5, 0.5 );
		
		// init the textures
		var baseUrl	= tQuery.createLensFlare.baseUrl;
		var texture0	= THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare0.png' );
		var texture2	= THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare2.png' );
		var texture3	= THREE.ImageUtils.loadTexture( baseUrl+'images/lensflare3.png' );

		opts.flareParams.push([ texture0, 700, 0.0, THREE.AdditiveBlending, color ]);
		opts.flareParams.push([ texture2, 512, 0.0, THREE.AdditiveBlending ]);
		opts.flareParams.push([ texture3,  60, 0.6, THREE.AdditiveBlending ]);
		opts.flareParams.push([ texture3,  70, 0.7, THREE.AdditiveBlending ]);
		opts.flareParams.push([ texture3, 120, 0.9, THREE.AdditiveBlending ]);
		opts.flareParams.push([ texture3,  70, 1.0, THREE.AdditiveBlending ]);
		return opts;
	}
});

tQuery.createLensFlare.baseUrl	= "../../../plugins/lensflare/";

