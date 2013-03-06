requirejs.config({
	map	: {
		"*"	: {
			'tquery.cannonjs'	: 'plugins/cannonjs/tquery.object3d.cannonjs',
		}
	},
	shim	: {
		'plugins/cannonjs/tquery.object3d.cannonjs'	: [
			'plugins/cannonjs/tquery.world.cannonjs',
			'plugins/cannonjs/vendor/cannon.js/build/cannon'
		]
	}
});
