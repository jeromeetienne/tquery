requirejs.config({
	map	: {
		// NOTE: require(['webgl-inspector', 'domReady!'], function(){})
		// - the 'domReady!' wait for the dom to be ready, it is required by webgl-inspector
		// TODO: is that possible to make 'domReady!' as a kind of dependancy
		// - i tried and failed up to know
		"*"	: {
			'webgl-inspector'	: 'http://benvanik.github.com/WebGL-Inspector/core/embed.js',
			'domReady'		: 'https://raw.github.com/requirejs/domReady/latest/domReady.js',
		}
	},
});
