requirejs.config({
	map	: {
		"*"	: {
			'tquery.minecraft'	: 'plugins/requirejs/confrequire/minecraft.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/minecraft.initrequire'	: [
			'plugins/minecraft/tquery.minecraftchar',
			'plugins/minecraft/tquery.animation',
			'plugins/minecraft/tquery.animations',
			'plugins/minecraft/tquery.minecraftcharanimations',
			'plugins/minecraft/tquery.minecraftcharheadanimations',
		]
	}
});
