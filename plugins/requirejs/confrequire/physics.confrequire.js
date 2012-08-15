requirejs.config({
	map	: {
		"*"	: {
			'tquery.physics'	: 'plugins/physics/tquery.physijs',
		}
	},
	shim	: {
	 	'plugins/physics/tquery.physijs'	: [
	 		//'threex/THREEx.KeyboardState',
 			'plugins/physics/vendor/physijs/physi'
	 	]
	}
});
