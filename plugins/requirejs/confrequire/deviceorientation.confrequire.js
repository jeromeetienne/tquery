requirejs.config({
	map	: {
		"*"	: {
			'tquery.deviceorientation'	: 'plugins/deviceorientation/tquery.deviceorientation',
		}
	},
	shim	: {
		'plugins/deviceorientation/tquery.deviceorientation'	: [
			'threex/threex.DeviceOrientationState',
		]
	}
});
