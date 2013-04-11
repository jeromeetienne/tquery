requirejs.config({
	map	: {
		"*"	: {
			'tquery.planets'	: 'plugins/requirejs/confrequire/planets.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/planets.initrequire'	: [
			'plugins/planets/tquery.createplanet',
			'plugins/planets/tquery.createstarfield'
		]
	}
});