requirejs.config({
	"paths": {
		"build": "../../../build",
		"plugins": "../../../plugins",
		"threex": "../../../vendor/threex",
		"three.js": "../../../vendor/three.js"
	},
	"map": {
		"*": {
			"tquery.keyboard": "plugins/keyboard/tquery.keyboard",
			"tquery.lavamaterial": "plugins/requirejs/confrequire/lavamaterial.initrequire",
			"tquery.materials": "plugins/materials/tquery.meshbasicmaterial",
			"tquery.physics": "plugins/physics/tquery.physijs",
			"tquery.createplanet": "plugins/requirejs/confrequire/planets.initrequire",
			"tquery.pproc": "plugins/pproc/tquery.effectcomposer",
			"tquery.shape": "plugins/shape/tquery.shape"
		}
	},
	"shim": {
		"plugins/keyboard/tquery.keyboard": [
			"threex/THREEx.KeyboardState"
		],
		"plugins/materials/tquery.meshbasicmaterial": [
			"plugins/materials/tquery.meshlambertmaterial",
			"plugins/materials/tquery.meshphongmaterial"
		],
		"plugins/physics/tquery.physijs": [
			"plugins/physics/vendor/physijs/physi"
		],
		"plugins/pproc/tquery.effectcomposer": [
			"three.js/ShaderExtras",
			"three.js/postprocessing/EffectComposer",
			"three.js/postprocessing/BloomPass",
			"three.js/postprocessing/DotScreenPass",
			"three.js/postprocessing/FilmPass",
			"three.js/postprocessing/MaskPass",
			"three.js/postprocessing/RenderPass",
			"three.js/postprocessing/SavePass",
			"three.js/postprocessing/ShaderPass",
			"three.js/postprocessing/TexturePass"
		],
		"plugins/shape/tquery.shape": [
			"plugins/shape/tquery.shape.create"
		]
	}
});
