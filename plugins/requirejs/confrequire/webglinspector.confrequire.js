requirejs.config({
	map	: {
		// NOTE: require(['webgl-inspector', 'domReady!'], function(){})
		// - the 'domReady!' wait for the dom to be ready, it is required by webgl-inspector
		// TODO: is that possible to make 'domReady!' as a kind of dependancy
		// - i tried and failed up to know
		"*"	: {
			'webgl-inspector'	: 'plugins/requirejs/confrequire/webglinspector.initrequire',
		 	'domReady'		: 'plugins/requirejs/vendor/domReady',
		}
	},
});
