requirejs.config({
	map	: {
		"*"	: {
			'tquery.createplanet'	: 'plugins/requirejs/confrequire/planets.initrequire',
		}
	},
	// shim	: {
	// 	'plugins/requirejs/confrequire/planets.initrequire'	: ['tquery']
	// }
});