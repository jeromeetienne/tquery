requirejs.config({
	map	: {
		"*"	: {
			'tquery.modifiers'	: 'plugins/modifiers/tquery.geometry.smooth',
		}
	},
	shim	: {
		'plugins/modifiers/tquery.geometry.smooth'	: [
			'three.js/modifiers/ExplodeModifier',
			'three.js/modifiers/SubdivisionModifier',
			'three.js/modifiers/TessellateModifier',
		]
	}
});
