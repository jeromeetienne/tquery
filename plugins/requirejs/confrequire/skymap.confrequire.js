requirejs.config({
	map	: {
		"*"	: {
			'tquery.skymap'	: 'plugins/requirejs/confrequire/skymap.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/skymap.initrequire'	: [
			'plugins/skymap/tquery.skymap',
			'plugins/skymap/tquery.cubetexture'
		]
	}
});
