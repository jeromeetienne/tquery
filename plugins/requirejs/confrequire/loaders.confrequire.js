requirejs.config({
	map	: {
		"*"	: {
			'tquery.loaders'	: 'plugins/loaders/tquery.loaders',
		}
	},
	shim	: {
		'plugins/loaders/tquery.loaders'	: [
			'three.js/examples/js/loaders/BinaryLoader',
			'three.js/examples/js/loaders/MTLLoader',
			'three.js/examples/js/loaders/OBJMTLLoader',
			'three.js/examples/js/loaders/STLLoader',
			'three.js/examples/js/loaders/VTKLoader',
			'three.js/examples/js/loaders/ColladaLoader',
			'three.js/examples/js/loaders/OBJLoader',
			'three.js/examples/js/loaders/PDBLoader',
			'three.js/examples/js/loaders/UTF8Loader'
		]
	}
});
