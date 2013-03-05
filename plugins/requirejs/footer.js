(function(){
	var scripts	= document.getElementsByTagName('script');
	var element	= scripts[scripts.length-1];
	var baseUrl	= element.getAttribute('data-baseURL');
	console.log('baseUrl', baseUrl, element);
	if( baseUrl === null )	return;
	requirejs.config({
		paths	: {
			"build"		: baseUrl+'/build',
			"plugins"	: baseUrl+'/plugins',
			"threex"	: baseUrl+'/vendor/threex',
			"three.js"	: baseUrl+'/vendor/three.js',
		},
	});
})()
