requirejs.config({
	map	: {
		"*"	: {
			'tquery.keyboard'	: 'plugins/keyboard/tquery.keyboard',
		}
	},
	shim	: {
		'plugins/keyboard/tquery.keyboard'	: [
			'threex/THREEx.KeyboardState',
		]
	}
});
