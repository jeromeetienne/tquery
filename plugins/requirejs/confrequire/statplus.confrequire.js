requirejs.config({
	map	: {
		"*"	: {
			'tquery.statsplus'	: 'plugins/statsplus/tquery.statsplus',
		}
	},
	shim	: {
		'plugins/statsplus/tquery.statsplus'	: [
			'plugins/statsplus/statsdelay',
			'plugins/statsplus/statsmemory',
			'plugins/statsplus/statsthreejswebgl'
		]
	}
});
