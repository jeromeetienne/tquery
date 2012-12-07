requirejs.config({
	map	: {
		"*"	: {
			'tquery.headtrackr'	: 'plugins/headtrackr/tquery.headtrackr',
		}
	},
	shim	: {
		'plugins/headtrackr/tquery.headtrackr'	: [
			'plugins/headtrackr/vendor/headtrackr'
		]
	}
});
