requirejs.config({
	"paths": {
		"build": "../../../build",
		"plugins": "../..",
		"threex": "../../../vendor/threex"
	},
	"map": {
		"*": {
			"tquery.keyboard": "plugins/keyboard/tquery.keyboard",
			"tquery.createplanet": "plugins/requirejs/confrequire/planets.initrequire"
		}
	},
	"shim": {
		"plugins/keyboard/tquery.keyboard": [
			"threex/THREEx.KeyboardState"
		]
	}
});
