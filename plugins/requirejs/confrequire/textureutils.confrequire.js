requirejs.config({
	map	: {
		"*"	: {
			'tquery.textureutils'	: 'plugins/textureutils/tquery.textureutils',
		}
	},
	shim	: {
		'plugins/textureutils/tquery.textureutils'	: [
			'plugins/textureutils/tquery.material.texturescrolling'
		]
	}
});
