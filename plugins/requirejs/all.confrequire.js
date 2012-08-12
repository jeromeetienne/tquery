requirejs.config({
	paths	: {
		"build"		: "../../../build",
		"plugins"	: "../..",
		'threex'	: '../../../vendor/threex',
	},
	// map	: {
	// 	"*"	: {
	// 		'tquery'	: 'build/tquery-bundle',
	// 	}
	// }
});
requirejs.config({
	map	: {
		"*"	: {
			'tquery.keyboard'	: 'plugins/keyboard/tquery.keyboard',
		}
	},
	shim	: {
		'plugins/keyboard/tquery.keyboard'	: [
			//'tquery',
			'threex/THREEx.KeyboardState',
		]
	}
});
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