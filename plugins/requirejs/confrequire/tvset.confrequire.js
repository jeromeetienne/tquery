requirejs.config({
	map	: {
		"*"	: {
			'tquery.tvset'	: 'plugins/tvset/tquery.tvset',
		}
	},
	shim	: {
		'plugins/tvset/tquery.tvset'	: [
			'three.js/examples/js/loaders/ColladaLoader',
		]
	}
});
