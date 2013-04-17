requirejs.config({
	map	: {
		"*"	: {
			'tquery.tween'	: 'plugins/tween/tquery.tween',
		}
	},
	shim	: {
		'plugins/tween/tquery.tween'	: [
			'plugins/tween/vendor/Tween'
		]
	}
});
