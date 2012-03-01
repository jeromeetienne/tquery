(function(){

/**
 * key: normalized url
 * value: state ('loading' is the url loading, 'loaded' is the url completed loading)
*/
var filesStatus	= {};

/**
 * key: moduleId (must be globally unique)
 * value {
	moduleId: string,
	dependencies: array of normalized url,
	callback: function to call when all dependencies are met,
	state: string ('declared' the module is declared but no loading is started,
	'loadingDeps' some of the dependancies are in 'loading',
	'loadedDeps' all dependencies are in 'loaded')
 }
*/
var modulesCtx	= {};

// http://stackoverflow.com/questions/6725272/crossbrowser-script-load-event
var loadScript	= function(url, callback){
	// handle filesStatus
	console.assert( filesStatus[url] === undefined, "url is already init: "+url);
	filesStatus[url]= 'loading';
	
	var element	= document.createElement('script');
	element.src	= url;
	element.type	= 'text/javascript';
	element.async	= false;
	var done	= false;
	element.addEventListener = element.onload = function(){
		var state	= element.readyState;
		if( !done && (!state || state.match(/loaded|complete/)) ){
			done = true;
			// update fileStatus
			filesStatus[url]= 'loaded';
			// notify the callback
			callback();
		}
	};
	// use body if available. more safe in IE
	(document.body || document.head).appendChild(element);
}

var scriptBaseUrl	= function(basename){
	var element	= document.querySelector('script[src$="'+basename+'"]');
	var url		= element ? element.src : location.href;
	var baseUrl	= url.substr(0, url.lastIndexOf('/')+1);
	return baseUrl;
};

var processModule	= function(ctx){
	console.log("processModule", ctx.moduleId, "depends on", JSON.stringify(ctx.dependencies));
	console.assert( ctx.state === 'declared' );
	ctx.state	= 'loadingDeps';
	ctx.dependencies.forEach(function(url){
		var fileStatus	= filesStatus[url];
		if( fileStatus === undefined ){
			loadScript(url, function(){
				console.log("loaded url", url)
				updateModulesCtxState();
				processModulesIfNeeded();
				//notifyModulesIfPossible();
			});
		}
	});
};

var moduleDepsCountStatus	= function(ctx){
	var counts	= {};
	ctx.dependencies.forEach(function(url){
		var fileStatus		= filesStatus[url];
		counts[fileStatus]	= counts[fileStatus] || 0;
		counts[fileStatus]++;
	});
	return counts;
};

var updateModulesCtxState	= function(){
	Object.keys(modulesCtx).forEach(function(moduleId){
		var ctx			= modulesCtx[moduleId];
		var countStatus		= moduleDepsCountStatus(ctx);
		var allDepsLoaded	= countStatus['loaded'] === ctx.dependencies.length;
		if( ctx.state === 'loadingDeps' && allDepsLoaded ){
			ctx.state	= "allDepsLoaded";
		}
	});
};

var moduleCtxCountState	= function(){
	var counts	= {};
	Object.keys(modulesCtx).forEach(function(moduleId){
		var ctx		= modulesCtx[moduleId];
		var state	= ctx.state;
		counts[state]	= counts[state] || 0;
		counts[state]++;
	});
	return counts;
};

var processModulesIfNeeded	= function(){
	console.log("modulesCtx", JSON.stringify(modulesCtx), 'filesStatus', JSON.stringify(filesStatus))
	Object.keys(modulesCtx).forEach(function(moduleId){
		var ctx	= modulesCtx[moduleId];
		if( ctx.state === 'declared' ){
			processModule(ctx);
		}
	});
};

/**
 * - REQUIRE to work with non module.js
 *   - how to know if a given file.js contains modules, and
 *     if those modules dependencies are satisfied
 *   - current solutions is waiting for ALL modules to be satisfied before notifying
 * - check that all modules are in loadingDeps
 * - check if all files are loaded
 * - notify all modules with {id: moduleId, baseUrl: , url: };
*/


window.module		= function(moduleId, dependencies, callback){
	// sanity check - moduleId MUST be unique
	console.assert( modulesCtx[moduleId] === undefined, "moduleId MUST be unique. module:" + moduleId );

	// normalize the urls
	var baseUrl	= scriptBaseUrl(moduleId + '.js');
	dependencies	= dependencies.map(function(url){
		if( url.match(/^\.\//) || url.match(/^\.\.\//) ){
			url	= baseUrl + url;
		}
		return normalizeUrl(url);
	});
	// create a moduleCtx
	var moduleCtx	= {
		moduleId	: moduleId,
		dependencies	: dependencies,
		callback	: callback,
		baseUrl		: baseUrl,
		state		: 'declared'
	};
	// store the moduleCtx
	modulesCtx[moduleId]	= moduleCtx;
};


window.addEventListener("load", function(){
	console.log("onLoad");
	processModulesIfNeeded();
},false)

})();