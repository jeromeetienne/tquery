requirejs.config({
	"paths": {
		"build": "../../../build",
		"plugins": "../../../plugins",
		"threex": "../../../vendor/threex",
		"three.js": "../../../vendor/three.js"
	},
	"map": {
		"*": {
			"tquery.cannonjs": "plugins/cannonjs/tquery.object3d.cannonjs",
			"tquery.car": "plugins/requirejs/confrequire/car.initrequire",
			"tquery.checkerboard": "plugins/checkerboard/tquery.checkerboard",
			"tquery.colornames": "plugins/colornames/tquery.colornames",
			"tquery.controls": "plugins/controls/tquery.controlstween",
			"tquery.csg": "plugins/csg/tquery.geometry.csg",
			"tquery.datguituner": "plugins/datguituner/tquery.datguituner",
			"tquery.deviceorientation": "plugins/deviceorientation/tquery.deviceorientation",
			"tquery.domevent": "plugins/domevent/tquery.domevent",
			"tquery.fireball": "plugins/fireball/tquery.fireballmaterial",
			"tquery.fog": "plugins/fog/tquery.world.createfog",
			"tquery.grassground": "plugins/requirejs/confrequire/grassground.initrequire",
			"tquery.gsvpano": "plugins/gsvpano/tquery.gsvpano",
			"tquery.headtrackr": "plugins/headtrackr/tquery.headtrackr",
			"tquery.keyboard": "plugins/keyboard/tquery.keyboard",
			"tquery.lavamaterial": "plugins/requirejs/confrequire/lavamaterial.initrequire",
			"tquery.lensflare": "plugins/requirejs/confrequire/lensflare.initrequire",
			"tquery.shadowmap": "plugins/shadowmap/tquery.light.shadowmap",
			"tquery.lightingexamples": "plugins/lightingexamples/tquery.lightingexamples",
			"tquery.lightsaber": "plugins/lightsaber/tquery.lightsaber",
			"tquery.linkify": "plugins/linkify/tquery.mesh.linkify",
			"tquery.loaders": "three.js/examples/js/loaders/BinaryLoader",
			"tquery.md2character": "plugins/requirejs/confrequire/md2character.initrequire",
			"tquery.minecraft": "plugins/requirejs/confrequire/minecraft.initrequire",
			"tquery.mirror": "plugins/mirror/tquery.mirrorplane",
			"tquery.modifiers": "plugins/modifiers/tquery.geometry.smooth",
			"tquery.montainarena": "plugins/montainarena/tquery.montainarena",
			"tquery.objectcoord": "plugins/objectcoord/tquery.object3d.coordinate",
			"tquery.physics": "plugins/physics/tquery.physijs",
			"tquery.planets": "plugins/requirejs/confrequire/planets.initrequire",
			"tquery.playerinput": "plugins/playerinput/tquery.playerinput.keyboard",
			"tquery.poolball": "plugins/poolball/tquery.poolball",
			"tquery.pproc": "plugins/pproc/tquery.effectcomposer",
			"tquery.renderers": "three.js/examples/js/renderers/CSS3DRenderer",
			"tquery.shape": "plugins/shape/tquery.shape",
			"tquery.simplemaze": "plugins/simplemaze/tquery.simplemaze",
			"tquery.simpletree": "plugins/simpletree/tquery.simpletree",
			"tquery.skymap": "plugins/skymap/tquery.skymap",
			"tquery.statsplus": "plugins/statsplus/tquery.statsplus",
			"tquery.text": "plugins/text/tquery.text",
			"tquery.text.allfonts": "plugins/text/fonts/droid/droid_serif_regular.typeface",
			"tquery.textureutils": "plugins/textureutils/tquery.textureutils",
			"tquery.tvset": "plugins/tvset/tquery.tvset",
			"tquery.tweenjs": "plugins/tweenjs/tquery.tween",
			"tquery.vertexanimation": "plugins/vertexanimation/tquery.geometry.vertexanimation",
			"tquery.videos": "plugins/videos/tquery.createvideotexture",
			"tquery.virtualjoystick": "plugins/virtualjoystick/vendor/virtualjoystick",
			"tquery.webaudio": "plugins/requirejs/confrequire/webaudio.initrequire",
			"webgl-inspector": "plugins/requirejs/confrequire/webglinspector.initrequire",
			"domReady": "plugins/requirejs/vendor/domReady",
			"tquery.webrtcio": "plugins/webrtcio/vendor/webrtc.io-client/webrtc.io",
			"tquery.whammy": "plugins/requirejs/confrequire/whammy.initrequire"
		}
	},
	"shim": {
		"plugins/cannonjs/tquery.object3d.cannonjs": [
			"plugins/cannonjs/tquery.world.cannonjs",
			"plugins/cannonjs/vendor/cannon.js/build/cannon"
		],
		"plugins/requirejs/confrequire/car.initrequire": [
			"plugins/car/tquery.car",
			"plugins/car/Car",
			"plugins/car/tquery.car.keyboard",
			"plugins/car/tquery.car.cameracontrols",
			"plugins/car/tquery.car.deviceorientation"
		],
		"plugins/car/tquery.car.deviceorientation": [
			"plugins/car/tquery.car"
		],
		"plugins/car/tquery.car.cameracontrols": [
			"plugins/car/tquery.car"
		],
		"plugins/car/tquery.car.keyboard": [
			"plugins/car/tquery.car"
		],
		"plugins/controls/tquery.controlstween": [
			"plugins/controls/tquery.controlswrapper",
			"three.js/examples/js/controls/FirstPersonControls",
			"three.js/examples/js/controls/OrbitControls",
			"three.js/examples/js/controls/PointerLockControls",
			"three.js/examples/js/controls/TrackballControls",
			"three.js/examples/js/controls/FlyControls",
			"three.js/examples/js/controls/PathControls",
			"three.js/examples/js/controls/RollControls"
		],
		"plugins/csg/tquery.geometry.csg": [
			"plugins/csg/csg",
			"plugins/csg/ThreeCSG",
			"plugins/csg/tquery.object3d.csg"
		],
		"plugins/datguituner/tquery.datguituner": [
			"plugins/assets/vendor/dat.gui/dat.gui",
			"plugins/assets/vendor/dat.gui/dat.color"
		],
		"plugins/deviceorientation/tquery.deviceorientation": [
			"threex/THREEx.DeviceOrientationState"
		],
		"plugins/domevent/tquery.domevent": [
			"plugins/domevent/threex.domevent"
		],
		"plugins/gsvpano/tquery.gsvpano": [
			"plugins/gsvpano/vendor/GSVPano"
		],
		"plugins/headtrackr/tquery.headtrackr": [
			"plugins/headtrackr/vendor/headtrackr"
		],
		"plugins/keyboard/tquery.keyboard": [
			"threex/THREEx.KeyboardState"
		],
		"plugins/linkify/tquery.mesh.linkify": [
			"tquery.domevent"
		],
		"three.js/examples/js/loaders/BinaryLoader": [
			"three.js/examples/js/loaders/MTLLoader",
			"three.js/examples/js/loaders/OBJMTLLoader",
			"three.js/examples/js/loaders/STLLoader",
			"three.js/examples/js/loaders/VTKLoader",
			"three.js/examples/js/loaders/ColladaLoader",
			"three.js/examples/js/loaders/OBJLoader",
			"three.js/examples/js/loaders/PDBLoader",
			"three.js/examples/js/loaders/UTF8Loader"
		],
		"plugins/requirejs/confrequire/md2character.initrequire": [
			"plugins/md2character/tquery.md2character",
			"plugins/md2character/tquery.md2character.cameracontrols",
			"plugins/md2character/tquery.md2character.ratamahatta",
			"plugins/md2character/tquery.md2character.ratamahatta.keyboard"
		],
		"plugins/md2character/tquery.md2character.cameracontrols": [
			"plugins/md2character/tquery.md2character"
		],
		"plugins/md2character/tquery.md2character.ratamahatta": [
			"plugins/md2character/tquery.md2character"
		],
		"plugins/md2character/tquery.md2character.ratamahatta.keyboard": [
			"plugins/md2character/tquery.md2character.ratamahatta"
		],
		"plugins/requirejs/confrequire/minecraft.initrequire": [
			"plugins/minecraft/tquery.minecraftplayer",
			"plugins/minecraft/tquery.minecraftchar",
			"plugins/minecraft/tquery.minecraftcharcontrols",
			"plugins/minecraft/tquery.minecraftcharanimations",
			"plugins/minecraft/tquery.minecraftcharheadanimations",
			"plugins/minecraft/tquery.spritesheet"
		],
		"plugins/minecraft/tquery.minecraftcharanimations": [
			"plugins/minecraft/tquery.animations"
		],
		"plugins/minecraft/tquery.minecraftcharheadanimations": [
			"plugins/minecraft/tquery.animations"
		],
		"plugins/minecraft/tquery.animations": [
			"plugins/minecraft/tquery.animation"
		],
		"plugins/mirror/tquery.mirrorplane": [
			"tquery.objectcoord",
			"plugins/mirror/tquery.mirrorball"
		],
		"plugins/modifiers/tquery.geometry.smooth": [
			"three.js/examples/js/modifiers/ExplodeModifier",
			"three.js/examples/js/modifiers/SubdivisionModifier",
			"three.js/examples/js/modifiers/TessellateModifier"
		],
		"plugins/physics/tquery.physijs": [
			"plugins/physics/vendor/physijs/physi"
		],
		"plugins/requirejs/confrequire/planets.initrequire": [
			"plugins/planets/tquery.createplanet",
			"plugins/planets/tquery.createstarfield"
		],
		"plugins/playerinput/tquery.playerinput.keyboard": [
			"tquery.keyboard",
			"plugins/playerinput/tquery.playerinput",
			"plugins/playerinput/tquery.playerinput.virtualjoystick"
		],
		"plugins/playerinput/tquery.playerinput.virtualjoystick": [
			"tquery.virtualjoystick",
			"plugins/playerinput/tquery.playerinput"
		],
		"plugins/pproc/tquery.effectcomposer": [
			"three.js/examples/js/shaders/BleachBypassShader",
			"three.js/examples/js/shaders/BlendShader",
			"three.js/examples/js/shaders/CopyShader",
			"three.js/examples/js/shaders/ColorifyShader",
			"three.js/examples/js/shaders/ConvolutionShader",
			"three.js/examples/js/shaders/FilmShader",
			"three.js/examples/js/shaders/FXAAShader",
			"three.js/examples/js/shaders/HorizontalBlurShader",
			"three.js/examples/js/shaders/SepiaShader",
			"three.js/examples/js/shaders/VerticalBlurShader",
			"three.js/examples/js/shaders/VignetteShader",
			"three.js/examples/js/postprocessing/EffectComposer",
			"three.js/examples/js/postprocessing/BloomPass",
			"three.js/examples/js/postprocessing/DotScreenPass",
			"three.js/examples/js/postprocessing/FilmPass",
			"three.js/examples/js/postprocessing/MaskPass",
			"three.js/examples/js/postprocessing/RenderPass",
			"three.js/examples/js/postprocessing/SavePass",
			"three.js/examples/js/postprocessing/ShaderPass",
			"three.js/examples/js/postprocessing/TexturePass"
		],
		"three.js/examples/js/renderers/CSS3DRenderer": [
			"three.js/examples/js/renderers/SoftwareRenderer",
			"three.js/examples/js/renderers/SVGRenderer",
			"three.js/examples/js/renderers/WebGLDeferredRenderer"
		],
		"plugins/shadowmap/tquery.light.shadowmap": [
			"plugins/shadowmap/tquery.world.shadowmap"
		],
		"plugins/shape/tquery.shape": [
			"plugins/shape/tquery.shape.create"
		],
		"plugins/simplemaze/tquery.simplemaze": [
			"plugins/simplemaze/tquery.simplemaze.pathfinding",
			"plugins/simplemaze/vendor/pathfinding-browser"
		],
		"plugins/skymap/tquery.skymap": [
			"plugins/skymap/tquery.cubetexture"
		],
		"plugins/statsplus/tquery.statsplus": [
			"plugins/statsplus/statsdelay",
			"plugins/statsplus/statsmemory",
			"plugins/statsplus/statsthreejswebgl"
		],
		"plugins/text/tquery.text": [
			"plugins/text/fonts/droid/droid_serif_bold.typeface"
		],
		"plugins/text/fonts/droid/droid_serif_regular.typeface": [
			"plugins/text/fonts/gentilis_bold.typeface",
			"plugins/text/fonts/gentilis_regular.typeface",
			"plugins/text/fonts/optimer_bold.typeface",
			"plugins/text/fonts/optimer_regular.typeface",
			"plugins/text/fonts/helvetiker_bold.typeface",
			"plugins/text/fonts/helvetiker_regular.typeface",
			"plugins/text/fonts/droid/droid_sans_regular.typeface",
			"plugins/text/fonts/droid/droid_sans_bold.typeface",
			"plugins/text/fonts/droid/droid_serif_bold.typeface"
		],
		"plugins/textureutils/tquery.textureutils": [
			"plugins/textureutils/tquery.material.texturescrolling"
		],
		"plugins/tvset/tquery.tvset": [
			"three.js/examples/js/loaders/ColladaLoader"
		],
		"plugins/tweenjs/tquery.tween": [
			"plugins/tweenjs/vendor/Tween"
		],
		"plugins/videos/tquery.createvideotexture": [
			"plugins/videos/tquery.audiovideotexture",
			"plugins/videos/tquery.createwebcamtexture",
			"plugins/videos/tquery.createtvsnowtexture"
		],
		"plugins/requirejs/confrequire/webaudio.initrequire": [
			"plugins/webaudio/vendor/webaudio-bundle",
			"plugins/webaudio/vendor/webaudio.sound.jsfx",
			"plugins/webaudio/vendor/jsfx/jsfx",
			"plugins/webaudio/vendor/jsfx/jsfxlib"
		],
		"plugins/webaudio/vendor/webaudio.sound.jsfx": [
			"plugins/webaudio/vendor/webaudio-bundle"
		],
		"plugins/webaudio/vendor/jsfx/jsfx": [
			"plugins/webaudio/vendor/jsfx/audio"
		],
		"plugins/webaudio/vendor/jsfx/jsfxlib": [
			"plugins/webaudio/vendor/jsfx/jsfx"
		],
		"plugins/requirejs/confrequire/whammy.initrequire": [
			"plugins/whammy/vendor/whammy",
			"plugins/whammy/tquery.whammy",
			"plugins/whammy/tquery.whammy.bindkeyboard",
			"plugins/whammy/tquery.whammyUI"
		],
		"plugins/whammy/tquery.whammy.bindkeyboard": [
			"plugins/whammy/tquery.whammy"
		]
	}
});
