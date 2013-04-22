(function(){

return;	// FIXME this fails on jsfiddle + corsproxy
	// find something compatible


	// get the script dom element which included the library
	var scripts	= document.getElementsByTagName('script');
	var scriptEl	= scripts[scripts.length-1];
	var url		= scriptEl.src;
	var suffix	= '/build/tquery-bundle-require.js';
	// if the element url DOES NOT endup with suffix, do nothing
	if(url.indexOf(suffix, url.length - suffix.length) === -1)	return;
	// get the baseURL
	var baseURL	= url.substr(0, url.length - suffix.length)
	// configure require.js using this baseUrl
	requirejs.config({
		paths	: {
			"build"		: baseURL+'/build',
			"plugins"	: baseURL+'/plugins',
			"threex"	: baseURL+'/vendor/threex',
			"three.js"	: baseURL+'/vendor/three.js',
		},
	});
})();
