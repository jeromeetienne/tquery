requirejs.config({
	map	: {
		"*"	: {
			'tquery.webaudio'	: 'plugins/requirejs/confrequire/webaudio.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/webaudio.initrequire'	: [
			'plugins/webaudio/vendor/webaudio-bundle',
			'plugins/webaudio/vendor/webaudio.sound.jsfx',
			'plugins/webaudio/vendor/jsfx/jsfx',
			'plugins/webaudio/vendor/jsfx/jsfxlib'
		],
		'plugins/webaudio/vendor/webaudio.sound.jsfx'	: [
			'plugins/webaudio/vendor/webaudio-bundle'
		],
		'plugins/webaudio/vendor/jsfx/jsfx'	: [
			'plugins/webaudio/vendor/jsfx/audio'
		],
		'plugins/webaudio/vendor/jsfx/jsfxlib'	: [
			'plugins/webaudio/vendor/jsfx/jsfx'
		],
	}
});
