requirejs.config({
	map	: {
		"*"	: {
			'tquery.csg'	: 'plugins/csg/tquery.geometry.csg',
		}
	},
	shim	: {
		// fake dependancy here
		'plugins/csg/tquery.geometry.csg'	: [
			'plugins/csg/csg',
			'plugins/csg/ThreeCSG',
			'plugins/csg/tquery.object3d.csg',
		]
	}
});
