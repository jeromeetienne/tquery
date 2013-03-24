requirejs.config({
	map	: {
		"*"	: {
			'tquery.mirror'	: 'plugins/mirror/tquery.mirrorplane',
		}
	},
	shim	: {
		'plugins/mirror/tquery.mirrorplane'	: [
			'tquery.objectcoord',
			
			// fake dependancy for package
			'plugins/mirror/tquery.mirrorball'
		]
	}
});
