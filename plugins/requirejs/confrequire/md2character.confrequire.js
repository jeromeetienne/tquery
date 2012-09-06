requirejs.config({
	map	: {
		"*"	: {
			'tquery.md2character'	: 'plugins/requirejs/confrequire/md2character.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/md2character.initrequire'	: [
			'plugins/md2character/tquery.md2character',
			'plugins/md2character/tquery.md2character.cameracontrols',
			'plugins/md2character/tquery.md2character.ratamahatta',
			'plugins/md2character/tquery.md2character.ratamahatta.keyboard',
		],
		'plugins/md2character/tquery.md2character.cameracontrols'	: [
			'plugins/md2character/tquery.md2character'
		],
		'plugins/md2character/tquery.md2character.ratamahatta'	: [
			'plugins/md2character/tquery.md2character'
		],
		'plugins/md2character/tquery.md2character.ratamahatta.keyboard'	: [
			'plugins/md2character/tquery.md2character.ratamahatta'
		],
	}
});
