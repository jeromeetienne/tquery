requirejs.config({
	map	: {
		"*"	: {
			'tquery.shadowmap'	: 'plugins/shadowmap/tquery.light.shadowmap',
		}
	},
	shim	: {
		'plugins/shadowmap/tquery.light.shadowmap'	: [
			'plugins/shadowmap/tquery.world.shadowmap',
		]
	}
});
