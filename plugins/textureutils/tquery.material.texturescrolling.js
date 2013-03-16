tQuery.Material.registerInstance('textureScrolling', function(options){
	// handle parameters
	options	= tQuery.extend(options, {
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
	world.hook(function(delta, now){
		this.each(function(tMaterial){

			var tTexture	= tMaterial.map;
			if( !tTexture )	return;
			// 
			options.transform(tTexture);
			// normalize the offset
			tTexture.offset.x	%= 1;
			tTexture.offset.y	%= 1;
		});
	}.bind(this));
	
	return this;
});