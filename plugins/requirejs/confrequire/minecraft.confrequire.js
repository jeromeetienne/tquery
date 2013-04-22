requirejs.config({
	map	: {
		"*"	: {
			'tquery.minecraft'	: 'plugins/requirejs/confrequire/minecraft.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/minecraft.initrequire'	: [
			// 'plugins/minecraft/obsolete/tquery.midikeytween',

			// 'plugins/minecraft/obsolete/tquery.camerafpscontrols',
			
			// this is all obsoleted by tquery.minecraftcharcontrols
			// 'plugins/minecraft/obsolete/tquery.minecraftchar.keyboard',
			// 'plugins/minecraft/obsolete/tquery.minecraftchar.keyboard2',
			// 'tquery.keyboard',


			'plugins/minecraft/tquery.minecraftplayer',
			'plugins/minecraft/tquery.minecraftchar',

			'plugins/minecraft/tquery.minecraftcharcontrols',

			'plugins/minecraft/tquery.minecraftcharanimations',
			'plugins/minecraft/tquery.minecraftcharheadanimations',

			'plugins/minecraft/tquery.spritesheet',
		],
		'plugins/minecraft/tquery.minecraftcharanimations'	: [
			'plugins/minecraft/tquery.animations'
		],
		'plugins/minecraft/tquery.minecraftcharheadanimations'	: [
			'plugins/minecraft/tquery.animations'
		],
		'plugins/minecraft/tquery.animations'	: [
			'plugins/minecraft/tquery.animation',
		]
	}
});
