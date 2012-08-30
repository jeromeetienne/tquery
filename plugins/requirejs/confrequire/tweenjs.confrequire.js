requirejs.config({
	map	: {
		"*"	: {
			'tquery.tweenjs'	: 'plugins/tweenjs/tquery.tween',
		}
	},
	shim	: {
		'plugins/tweenjs/tquery.tween'	: [
			'plugins/tweenjs/vendor/Tween'
		]
	}
});
