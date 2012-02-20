(function(){
	
var loadStates	= {};
var modules	= [];

// http://stackoverflow.com/questions/6725272/crossbrowser-script-load-event
var loadScript	= function(url, callback){
	var element	= document.createElement('script');
	element.src	= url;
	element.type	= 'text/javascript';
	element.async	= false;
	var done	= false;
	element.addEventListener = element.onload = function(){
		var state	= element.readyState;
		if( !done && (!state || state.match(/loaded|complete/)) ){
			done = true;
			callback();
		}
	};
	// use body if available. more safe in IE
	(document.body || document.head).appendChild(element);
}

var scriptBaseUrl	= function(moduleId){
	var filename	= moduleId+".js";
	var element	= document.querySelector('script[src$="'+filename+'"]');
	var url		= element ? element.src : location.href;
	var baseUrl	= url.substr(0, url.lastIndexOf('/')+1);
	return baseUrl;
};

var moduleHandle	= function(moduleid, dependancies, callback){
	var baseUrl	= scriptBaseUrl(moduleid);
	var loadeds	= 0;
	dependancies.forEach(function(url){
		loadScript(url, function(){
			loadeds++;
			if( dependancies.length < loadeds )	return;
			console.log("moduleid", moduleid, "url loaded", url)
			callback(baseUrl);
		});
	});
};


window.module		= moduleHandle;

function onLoad(){
	console.log("onLoad")
};

window.addEventListener("load", onLoad,false)

})();