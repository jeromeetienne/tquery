requirejs.config({
	map	: {
		"*"	: {
			'tquery.whammy'	: 'plugins/requirejs/confrequire/whammy.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/whammy.initrequire'	: [
			'plugins/whammy/vendor/whammy',
			'plugins/whammy/tquery.whammy',
			'plugins/whammy/tquery.whammy.bindkeyboard',
			'plugins/whammy/tquery.whammyUI',
		],
		'plugins/whammy/tquery.whammy.bindkeyboard'	: [
			'plugins/whammy/tquery.whammy'
		],
	}
});
