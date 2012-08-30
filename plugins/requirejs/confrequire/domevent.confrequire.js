requirejs.config({
	map	: {
		"*"	: {
			'tquery.domevent'	: 'plugins/domevent/tquery.domevent',
		}
	},
	shim	: {
		'plugins/domevent/tquery.domevent'	: [
			'plugins/domevent/threex.domevent',
		]
	}
});
