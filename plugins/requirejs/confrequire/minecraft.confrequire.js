requirejs.config({
	map	: {
		"*"	: {
			'tquery.minecraft'	: 'plugins/requirejs/confrequire/minecraft.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/minecraft.initrequire'	: [
			'plugins/minecraft/tquery.midikeytween',
			'plugins/minecraft/tquery.minecraftchar',
			'plugins/minecraft/tquery.minecraftchar.keyboard2',
			'plugins/minecraft/tquery.camerafpscontrols',
			'plugins/minecraft/tquery.animation',
			'plugins/minecraft/tquery.animations',
			'plugins/minecraft/tquery.spritesheet',
			'plugins/minecraft/tquery.minecraftcharanimations',
			'plugins/minecraft/tquery.minecraftcharheadanimations',
		]
	}
});
