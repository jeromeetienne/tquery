requirejs.config({
	map	: {
		"*"	: {
			'tquery.renderers'	: 'three.js/examples/js/renderers/CSS3DRenderer',
		}
	},
	shim	: {
		'three.js/examples/js/renderers/CSS3DRenderer'	: [
			'three.js/examples/js/renderers/SoftwareRenderer',
			'three.js/examples/js/renderers/SVGRenderer',
			'three.js/examples/js/renderers/WebGLDeferredRenderer'
		]
	}
});
