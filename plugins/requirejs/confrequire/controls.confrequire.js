requirejs.config({
	map	: {
		"*"	: {
			'tquery.controls'	: 'plugins/controls/tquery.controlstween',
		}
	},
	shim	: {
		'plugins/controls/tquery.controlstween'	: [
			'plugins/controls/tquery.controlswrapper',
			'three.js/examples/js/controls/FirstPersonControls',
			'three.js/examples/js/controls/OrbitControls',
			'three.js/examples/js/controls/PointerLockControls',
			'three.js/examples/js/controls/TrackballControls',
			'three.js/examples/js/controls/FlyControls',
			'three.js/examples/js/controls/PathControls',
			'three.js/examples/js/controls/RollControls',
		]
	}
});
