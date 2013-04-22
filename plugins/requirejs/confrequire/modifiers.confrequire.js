requirejs.config({
	map	: {
		"*"	: {
			'tquery.modifiers'	: 'plugins/modifiers/tquery.geometry.smooth',
		}
	},
	shim	: {
		'plugins/modifiers/tquery.geometry.smooth'	: [
			'three.js/examples/js/modifiers/ExplodeModifier',
			'three.js/examples/js/modifiers/SubdivisionModifier',
			'three.js/examples/js/modifiers/TessellateModifier',
		]
	}
});
