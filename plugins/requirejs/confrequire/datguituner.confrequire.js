requirejs.config({
	map	: {
		"*"	: {
			'tquery.datguituner'	: 'plugins/datguituner/tquery.datguituner',
		}
	},
	shim	: {
		'plugins/datguituner/tquery.datguituner'	: [
			'plugins/assets/vendor/dat.gui/dat.gui',
			'plugins/assets/vendor/dat.gui/dat.color'
		]
	}
});
