requirejs.config({
	map	: {
		"*"	: {
			'tquery.linkify'	: 'plugins/linkify/tquery.mesh.linkify',
		}
	},
	shim	: {
		'plugins/linkify/tquery.mesh.linkify'	: [
			'tquery.domevent',
		]
	}
});
