var EzRequire	= {};

EzRequire.urlModifiers	= [];
EzRequire.debug		= true;

EzRequire._depStatuses	= {};
EzRequire._defines	= {};

/**
 * Load a script
 * 
 * @param {script} scriptUrl url of the script to load
 * @param {Function} onLoad function called when the script is loaded
 * @param {Function} onError function called when the script failed to load
*/
EzRequire._loadScript	= function(scriptUrl, onLoad, onError){
	EzRequire.debug	&& console.log("loadScript(", scriptUrl,")")
	var script	= document.createElement('script');
	script.onload	= function(){
		EzRequire.debug	&& console.log("_loadScript(): loaded ", scriptUrl)
		onLoad();
	};
	script.onerror	= onError	|| function(){
		EzRequire.debug	&& console.error("EzRquire Load error!", scriptUrl);
	}
	script.setAttribute('src', scriptUrl);
	document.getElementsByTagName('head')[0].appendChild(script);
	return script;
}

EzRequire._checkAllDefines	= function(){
	EzRequire.debug	&& console.log("*********** checkAllDefines() BEGIN")
	Object.keys(EzRequire._defines).forEach(function(name){
		var define	= EzRequire._defines[name];
		EzRequire.debug	&& console.log("checkAllDefines check define", name, "depUrls", JSON.stringify(define.depUrls))
		// check the status of each depUrl
		for(var i = 0; i < define.deps.length; i++){
			var depUrl	= define.depUrls[i];
			var depStatus	= EzRequire._depStatuses[depUrl];
			EzRequire.debug	&& console.log("checkAllDefines depUrl", depUrl, "depStatus", depStatus)
			if( depStatus !== 'ready' )	return;
		}
		EzRequire.debug	&& console.log("checkAllDefines define depStatus", EzRequire._depStatuses[define.name], define.name)
		EzRequire.debug	&& console.log("checkAllDefines depStatuses", JSON.stringify(EzRequire._depStatuses))

		// call onReady callback 
		define.onReady();

		EzRequire._depStatuses[define.name] = "ready";
		delete EzRequire._defines[name];
		// launch a ._checkAllDefines() 
		setTimeout(EzRequire._checkAllDefines, 0)
	});
	EzRequire.debug	&& console.log("*********** checkAllDefines() END")
};


EzRequire.define = function(name, deps, onReady){
	// handle polymorphism
	if( typeof(name) !== 'string' ){
		onReady	= deps;
		deps	= name;
		
		var scripts	= document.querySelectorAll('head script[data-defineDefaultName]')
		var script	= scripts[0];
		name		= script.getAttribute('data-defineDefaultName');
		script.removeAttribute('data-defineDefaultName'); 
	}
	if( deps instanceof Array === false ){
		onReady	= deps;
		deps	= [];		
	}
	// sanity check - variable types is strict
	console.assert(deps instanceof Array);
	console.assert(typeof(name) === 'string');
	console.assert(typeof(onReady) === 'function');
	
	EzRequire.debug	&& console.log("******** define('"+name+"', "+JSON.stringify(deps)+", function) Begin")
	//console.log("name", name, "deps", deps, "onReady", onReady)

	////////////////////////////////////////////////////////////////////////
	// apply urlModifiers to deps
	for(var i = 0; i < deps.length; i++){
		EzRequire.urlModifiers.forEach(function(urlModifier){
			var result	= urlModifier(deps[i]);
			if( typeof(result) === 'string' )	deps[i]	= result;
			else	console.assert(false);
		})
	}
	
	////////////////////////////////////////////////////////////////////////
	// compute depUrls
	var depUrls	= [];
	var baseUrl	= location.href.replace(/[^/]*$/, '')
	deps.forEach(function(dep){
		var depUrl	= dep + (dep.match(/\.js$/) ? '' : '.js');
		depUrl		= baseUrl + depUrl;
		depUrls.push(depUrl)
	});

	////////////////////////////////////////////////////////////////////////
	// queue the define()
	console.assert(EzRequire._defines[name] === undefined)
	EzRequire._defines[name]	= {
		name	: name,
		deps	: deps,
		depUrls	: depUrls,
		onReady	: onReady
	};
	EzRequire.debug	&& console.log("Queue define", JSON.stringify(EzRequire._defines[name]))

	console.assert( EzRequire._depStatuses[name] === undefined || EzRequire._depStatuses[name] === "loading");
	var isFromRequire	= name.match(/^void:\/\/require-/) ? true : false;
	EzRequire._depStatuses[name]	= isFromRequire ? "loaded" : "loading";

	//////////////////////////////////////////////////////////////////////////
	// 
	deps.forEach(function(dep, depIdx){
		var depUrl	= depUrls[depIdx];
		var hasDefine	= dep.match(/\.js$/) ? false : true;
		if( EzRequire._depStatuses[depUrl] !== undefined )	return;
		EzRequire._depStatuses[depUrl]	= 'loading';
		var script	= EzRequire._loadScript(depUrl, function(){
			EzRequire._depStatuses[depUrl]	= hasDefine ? 'loaded' : 'ready';
			EzRequire._checkAllDefines();
		}, function(){
			EzRequire._depStatuses[depUrl]	= 'error';
			console.warn('cant load '+depUrl)
		})
		// set the 'data-defineDefaultName' attribute in the dom element if needed
		hasDefine	&& script.setAttribute('data-defineDefaultName', depUrl);
	});

	// launch a ._checkAllDefines() 
	setTimeout(EzRequire._checkAllDefines, 0)

	EzRequire.debug	&& console.log("******** define('"+name+"') End ")
}

EzRequire._requireModuleId	= 0;

/**
 * same as define() - the moduleId is automatically generated
*/
EzRequire.require	= function(deps, callback){
	var moduleId	= "void://require-"+(EzRequire._requireModuleId++);
	return EzRequire.define(moduleId, deps, callback)
}

