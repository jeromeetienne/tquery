requirejs.config({
	map	: {
		"*"	: {
			'tquery.pproc'	: 'plugins/pproc/tquery.effectcomposer',
		}
	},
	shim	: {
		'plugins/pproc/tquery.effectcomposer'	: [
			'three.js/examples/js/shaders/BleachBypassShader'	,
			'three.js/examples/js/shaders/BlendShader'		,
			'three.js/examples/js/shaders/CopyShader'		,
			'three.js/examples/js/shaders/ColorifyShader'	,
			'three.js/examples/js/shaders/ConvolutionShader'	,
			'three.js/examples/js/shaders/FilmShader'		,
			'three.js/examples/js/shaders/FXAAShader'		,
			'three.js/examples/js/shaders/HorizontalBlurShader'	,
			'three.js/examples/js/shaders/SepiaShader'		,
			'three.js/examples/js/shaders/VerticalBlurShader'	,
			'three.js/examples/js/shaders/VignetteShader'	,

			'three.js/examples/js/postprocessing/EffectComposer'	,
			'three.js/examples/js/postprocessing/BloomPass'		,
			'three.js/examples/js/postprocessing/DotScreenPass'	,
			'three.js/examples/js/postprocessing/FilmPass'		,
			'three.js/examples/js/postprocessing/MaskPass'		,
			'three.js/examples/js/postprocessing/RenderPass'	,
			'three.js/examples/js/postprocessing/SavePass'		,
			'three.js/examples/js/postprocessing/ShaderPass'	,
			'three.js/examples/js/postprocessing/TexturePass'
		]
	}
});
