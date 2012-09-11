requirejs.config({
	map	: {
		"*"	: {
			'tquery.gsvpano'	: 'plugins/gsvpano/tquery.gsvpano',
		}
	},
	shim	: {
		'plugins/gsvpano/tquery.gsvpano'	: [
			'http://maps.google.com/maps/api/js?sensor=false',
			'plugins/gsvpano/vendor/GSVPano'
		]
	}
});
