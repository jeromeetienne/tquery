requirejs.config({
	map	: {
		"*"	: {
			'tquery.skymap'	: 'plugins/skymap/tquery.skymap',
		}
	},
	shim	: {
		'plugins/skymap/tquery.skymap'	: [
			'plugins/skymap/tquery.cubetexture'
		]
	}
});
