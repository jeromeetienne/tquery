requirejs.config({
	map	: {
		"*"	: {
			'tquery.shape'	: 'plugins/shape/tquery.shape',
		}
	},
	shim	: {
		'plugins/shape/tquery.shape'	: [
			'plugins/shape/tquery.shape.create'
		]
	}
});
