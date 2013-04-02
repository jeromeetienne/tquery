tQuery.registerStatic('SimpleTree', function(opts){
	// call parent ctor
	tQuery.SimpleTree.parent.constructor.call(this)
	// handle arguments default value
	opts	= tQuery.extend(opts, {
		trunkWidth	: 0.1,
		trunkHeight	: 0.5,
		trunkSegments	: 4,
		trunkColor	: 'saddlebrown',
		leavesWidth	: 0.3,
		leavesHeight	: 0.5,
		leavesSegments	: 4,
		leavesColor	: 'forestgreen',
	});

	// init the container
	var container	= new THREE.Object3D()
	this.add(container)
	// create trunk
	tQuery.createCylinder(opts.trunkWidth, opts.trunkWidth, opts.trunkHeight, opts.trunkSegments, 1, false)
		.addTo(container)
		.addClass('trunk')
		.positionY(opts.trunkHeight/2)
		.setLambertMaterial()
			.color( opts.trunkColor )
			.back()
	// create leaves
	var leaves	= tQuery.createCylinder(0, opts.leavesWidth, opts.leavesHeight, opts.leavesSegments, 1, false)
	//var leaves	= tQuery.createSphere(opts.leavesWidth, opts.leavesHeight)
	leaves.addTo(container)
		.addClass('leaves')
		.positionY(opts.trunkHeight + opts.leavesHeight/2)
		.setLambertMaterial()
			.color( opts.leavesColor )
			.back()
});

// inherit from tQuery.Object3D
tQuery.inherit(tQuery.SimpleTree, tQuery.Object3D);

tQuery.registerStatic('createSimpleTree', function(opts){
	return new tQuery.SimpleTree(opts)
});

