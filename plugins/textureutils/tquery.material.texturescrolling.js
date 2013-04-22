// FIXME this should be attached to texture... not material

tQuery.Material.registerInstance('textureScrolling', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		world		: tQuery.world,
		transform	: function(tTexture){
			tTexture.offset.x	+= 0.003;
			tTexture.offset.y	+= 0.01;;
		}
	});	

	// init the animation
	this.each(function(tMaterial){
		var tTexture	= tMaterial.map;
		if( !tTexture )	return;

		tTexture.wrapT	= THREE.RepeatWrapping;
		tTexture.wrapS	= THREE.RepeatWrapping;
	});

	// do the actual animation
	opts.world.hook(function(delta, now){
		this.each(function(tMaterial){

			var tTexture	= tMaterial.map;
			if( !tTexture )	return;
			// 
			opts.transform(tTexture);
			// normalize the offset
			tTexture.offset.x	%= 1;
			tTexture.offset.y	%= 1;
		});
	}.bind(this));
	
	return this;
});