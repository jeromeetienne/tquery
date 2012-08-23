requirejs.config({
	map	: {
		"*"	: {
			'tquery.minecraft'	: 'plugins/requirejs/confrequire/minecraft.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/minecraft.initrequire'	: [
			'plugins/minecraft/tquery.minecraftchar',
		]
	}

});
