requirejs.config({
	map	: {
		"*"	: {
			'tquery.controls'	: 'plugins/controls/tquery.controlstween',
		}
	},
	shim	: {
		'plugins/controls/tquery.controlstween'	: [
			'plugins/controls/tquery.controlswrapper',
			'three.js/controls/FirstPersonControls',
			'three.js/controls/OrbitControls',
			'three.js/controls/PointerLockControls',
			'three.js/controls/TrackballControls',
			'three.js/controls/FlyControls',
			'three.js/controls/PathControls',
			'three.js/controls/RollControls',
		]
	}
});
