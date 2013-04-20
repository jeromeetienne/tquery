requirejs.config({
	map	: {
		"*"	: {
			'tquery.leap'	: 'plugins/requirejs/confrequire/leap.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/leap.initrequire'	: [
			'plugins/leap/vendor/leap',
			'plugins/leap/tquery.leapcontroller',

			'plugins/leap/tquery.leapjoystickhandposition',

			'plugins/leap/tquery.leapviewercircle',
			'plugins/leap/tquery.leapviewerhandpalm',
			'plugins/leap/tquery.leapviewerhandsphere',
			'plugins/leap/tquery.leapviewerpointable',
			'plugins/leap/tquery.leapviewerswipe',
			'plugins/leap/tquery.leapviewertap',
		]
	}
});
