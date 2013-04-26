requirejs.config({
	map	: {
		"*"	: {
			'tquery.htmlmixer'	: 'plugins/htmlmixer/tquery.htmlmixer',
		}
	},
	shim	: {
		'plugins/htmlmixer/tquery.htmlmixer'	: [
			'three.js/examples/js/renderers/CSS3DRenderer'
		]
	}
});
