requirejs.config({
	map	: {
		"*"	: {
			'tquery.loaders'	: 'plugins/loaders/tquery.loaders',
		}
	},
	shim	: {
		'plugins/loaders/tquery.loaders'	: [
			'three.js/loaders/BinaryLoader',
			'three.js/loaders/MTLLoader',
			'three.js/loaders/OBJMTLLoader',
			'three.js/loaders/STLLoader',
			'three.js/loaders/VTKLoader',
			'three.js/loaders/ColladaLoader',
			'three.js/loaders/OBJLoader',
			'three.js/loaders/PDBLoader',
			'three.js/loaders/UTF8Loader'
		]
	}
});
