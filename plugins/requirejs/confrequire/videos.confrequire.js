requirejs.config({
	map	: {
		"*"	: {
			'tquery.videos'	: 'plugins/videos/tquery.createvideotexture',
		}
	},
	shim	: {
		'plugins/videos/tquery.createvideotexture'	: [
			'plugins/videos/tquery.audiovideotexture',
			'plugins/videos/tquery.createwebcamtexture',
			'plugins/videos/tquery.createtvsnowtexture'
		]
	}
});
