requirejs.config({
	map	: {
		"*"	: {
			'tquery.gsvpano'	: 'plugins/gsvpano/tquery.gsvpano',
		}
	},
	shim	: {
		'plugins/gsvpano/tquery.gsvpano'	: [
			// MUST be included manually 'http://maps.google.com/maps/api/js?sensor=false',
			'plugins/gsvpano/vendor/GSVPano'
		]
	}
});
