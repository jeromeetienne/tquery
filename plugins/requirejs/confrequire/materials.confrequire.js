requirejs.config({
	map	: {
		"*"	: {
			'tquery.materials'	: 'plugins/materials/tquery.meshbasicmaterial',
		}
	},
	shim	: {
		// fake dependancy here
		'plugins/materials/tquery.meshbasicmaterial'	: [
			'plugins/materials/tquery.meshlambertmaterial',
			'plugins/materials/tquery.meshphongmaterial'
		]
	}
});
