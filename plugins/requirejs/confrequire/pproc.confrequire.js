requirejs.config({
	map	: {
		"*"	: {
			'tquery.pproc'	: 'plugins/pproc/tquery.effectcomposer',
		}
	},
	shim	: {
		'plugins/pproc/tquery.effectcomposer'	: [
			'three.js/shaders/BleachBypassShader'	,
			'three.js/shaders/BlendShader'		,
			'three.js/shaders/CopyShader'		,
			'three.js/shaders/ColorifyShader'	,
			'three.js/shaders/ConvolutionShader'	,
			'three.js/shaders/FilmShader'		,
			'three.js/shaders/FXAAShader'		,
			'three.js/shaders/HorizontalBlurShader'	,
			'three.js/shaders/SepiaShader'		,
			'three.js/shaders/VerticalBlurShader'	,
			'three.js/shaders/VignetteShader'	,

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
