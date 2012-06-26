tQuery.define([
	"vendor/three.js/ShaderExtras.js",
	"vendor/three.js/postprocessing/EffectComposer.js",
	
	"vendor/three.js/postprocessing/BloomPass.js",
	"vendor/three.js/postprocessing/DotScreenPass.js",
	"vendor/three.js/postprocessing/FilmPass.js",
	"vendor/three.js/postprocessing/MaskPass.js",
	"vendor/three.js/postprocessing/RenderPass.js",
	"vendor/three.js/postprocessing/SavePass.js",
	"vendor/three.js/postprocessing/ShaderPass.js",
	"vendor/three.js/postprocessing/TexturePass.js",
	
	"plugins/pproc/tquery.effectcomposer.js"
], function(){
	console.log("pproc loaded")
	//alert("all loaded")
	//debugger;
})