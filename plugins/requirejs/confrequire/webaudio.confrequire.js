requirejs.config({
	map	: {
		"*"	: {
			'tquery.webaudio'	: 'plugins/requirejs/confrequire/webaudio.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/webaudio.initrequire'	: [
			'plugins/webaudio/vendor/webaudio-bundle'
		]
	}
});
