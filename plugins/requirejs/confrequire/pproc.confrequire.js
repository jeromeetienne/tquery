requirejs.config({
	map	: {
		"*"	: {
			'tquery.pproc'	: 'plugins/pproc/tquery.effectcomposer',
		}
	},
	shim	: {
		'plugins/pproc/tquery.effectcomposer'	: [
			'three.js/ShaderExtras'			,
			'three.js/postprocessing/EffectComposer',
			'three.js/postprocessing/BloomPass'	,
			'three.js/postprocessing/DotScreenPass'	,
			'three.js/postprocessing/FilmPass'	,
			'three.js/postprocessing/MaskPass'	,
			'three.js/postprocessing/RenderPass'	,
			'three.js/postprocessing/SavePass'	,
			'three.js/postprocessing/ShaderPass'	,
			'three.js/postprocessing/TexturePass'
		]
	}
});
