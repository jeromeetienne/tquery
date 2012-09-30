tQuery.registerStatic('MontainArena', {});

tQuery.MontainArena.createBasicArena	= function(){
	var arena	= tQuery.createObject3D();

	tQuery.MontainArena.build({
		radius		: 10/20,
		nClusters	: 30,
		nPerCluster	: 5,
		heightMin	: 2/20,
		heightMax	: 3/20,
		radiusBottomMin	: 1/20,
		radiusBottomMax	: 1/20,
	}).addTo(arena);

	tQuery.MontainArena.build({
		radius		: 9/20,
		nClusters	: 20,
		nPerCluster	: 2,
		heightMin	: 1.0/20,
		heightMax	: 1.5/20,
		radiusBottomMin	: 0.5/20,
		radiusBottomMax	: 1.0/20,
	}).addTo(arena);

	return arena;
}

tQuery.MontainArena.build	= function(opts){
	opts	= tQuery.extend(opts, {
		container	: tQuery.createObject3D(),
		radius		: 10/20,
		nClusters	: 30,
		nPerCluster	: 5,
		heightMin	: 2/20,
		heightMax	: 3/20,
		radiusBottomMin	: 0.8/20,
		radiusBottomMax	: 1.2/20,
	});
	for(var i = 0; i < opts.nClusters; i++ ){
		var angle	= (i / opts.nClusters) * (Math.PI*2);
		for(var j = 0; j < opts.nPerCluster; j++){
			var deltaAngle	= THREE.Math.randFloatSpread(2/opts.nClusters) * (Math.PI*2);
			var height	= THREE.Math.randFloat( opts.heightMin, opts.heightMax );
			var radiusBottom= THREE.Math.randFloat( opts.radiusBottomMin, opts.radiusBottomMax );
			tQuery.createCylinder(0.0, radiusBottom, height).addTo(opts.container)
				.translateY(height/2)
				.positionX(opts.radius * Math.cos(angle + deltaAngle))
				.positionZ(opts.radius * Math.sin(angle + deltaAngle))
				// .setBasicMaterial()
				// 	//.map('../../assets/images/ash_uvgrid01.jpg')
				// 	//.color(0x000000)
				// 	.back();
		}
	}
	return opts.container;
}
