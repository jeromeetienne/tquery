requirejs.config({
	map	: {
		"*"	: {
			'tquery.keyboard'	: 'plugins/keyboard/tquery.keyboard',
		}
	},
	shim	: {
		'plugins/keyboard/tquery.keyboard'	: [
			//'tquery',
			'threex/THREEx.KeyboardState',
		]
	}
});
