requirejs.config({
	map	: {
		"*"	: {
			'tquery.car'	: 'plugins/requirejs/confrequire/car.initrequire',
		}
	},
	shim	: {
		'plugins/requirejs/confrequire/car.initrequire'	: [
			'plugins/car/tquery.car',
			'plugins/car/Car',
			'plugins/car/tquery.car.keyboard',
			'plugins/car/tquery.car.cameracontrols',
			'plugins/car/tquery.car.deviceorientation',
		],
		'plugins/car/tquery.car.deviceorientation'	: [
			'plugins/car/tquery.car'
		],
		'plugins/car/tquery.car.cameracontrols'	: [
			'plugins/car/tquery.car'
		],
		'plugins/car/tquery.car.keyboard'	: [
			'plugins/car/tquery.car'
		],
	}
});
