requirejs.config({
	map	: {
		"*"	: {
			'tquery.physics'	: 'plugins/physics/tquery.physijs',
		}
	},
	shim	: {
	 	'plugins/physics/tquery.physijs'	: [
 			'plugins/physics/vendor/physijs/physi'
	 	]
	}
});
