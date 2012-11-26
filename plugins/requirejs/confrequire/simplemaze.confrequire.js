requirejs.config({
	map	: {
		"*"	: {
			'tquery.simplemaze'	: 'plugins/simplemaze/tquery.simplemaze',
		}
	},
	shim	: {
		'plugins/simplemaze/tquery.simplemaze'	: [
			'plugins/simplemaze/tquery.simplemaze.pathfinding',
			'plugins/simplemaze/vendor/pathfinding-browser',
		]
	}
});
