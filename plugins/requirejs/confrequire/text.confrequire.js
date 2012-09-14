requirejs.config({
	map	: {
		"*"	: {
			'tquery.text'	: 'plugins/text/tquery.text',
		}
	},
	shim	: {
	 	'plugins/text/tquery.text'	: [
	 		// load a font by default
			'plugins/text/fonts/droid/droid_serif_bold.typeface'
	 	]
	}
});

requirejs.config({
	map	: {
		"*"	: {
			'tquery.text.allfonts'	: 'plugins/text/fonts/droid/droid_serif_regular.typeface',
		}
	},
	shim	: {
	 	'plugins/text/fonts/droid/droid_serif_regular.typeface'	: [
			'plugins/text/fonts/gentilis_bold.typeface',
			'plugins/text/fonts/gentilis_regular.typeface',
			'plugins/text/fonts/optimer_bold.typeface',
			'plugins/text/fonts/optimer_regular.typeface',
			'plugins/text/fonts/helvetiker_bold.typeface',
			'plugins/text/fonts/helvetiker_regular.typeface',
			'plugins/text/fonts/droid/droid_sans_regular.typeface',
			'plugins/text/fonts/droid/droid_sans_bold.typeface',
			'plugins/text/fonts/droid/droid_serif_bold.typeface',
	 	]
	}
});
