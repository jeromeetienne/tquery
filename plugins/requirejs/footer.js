(function(){
	// get the script dom element which included the library
	var scripts	= document.getElementsByTagName('script');
	var scriptEl	= scripts[scripts.length-1];
	var src		= scriptEl.src;
	var suffix	= '/build/tquery-bundle-require.js';
	// if the element src DOES NOT endup with suffix, do nothing
	if(src.indexOf(suffix, src.length - suffix.length) !== -1)	return;
	// get the baseURL
	var baseURL	= src.substr(0, src.length - suffix.length)
	// configure require.js using this baseUrl
	requirejs.config({
		paths	: {
			"build"		: baseUrl+'/build',
			"plugins"	: baseUrl+'/plugins',
			"threex"	: baseUrl+'/vendor/threex',
			"three.js"	: baseUrl+'/vendor/three.js',
		},
	});
})();
