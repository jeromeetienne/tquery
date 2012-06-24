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
		EzRequire.debug && console.log("_loadScript(): loaded ", scriptUrl)
		onLoad();
	};
	script.onerror	= onError	|| function(){
		EzRequire.debug && console.error("EzRquire Load error!", scriptUrl);
	}
	script.setAttribute('src', scriptUrl);
	document.getElementsByTagName('head')[0].appendChild(script);
	return script;
}

EzRequire._checkAllDefines	= function(){
	EzRequire.debug	&& console.log("*********** checkAllDefines() BEGIN")
	Object.keys(EzRequire._defines).forEach(function(name){
		var define	= EzRequire._defines[name];
		EzRequire.debug && console.log("checkAllDefines check define", name, "depUrls", JSON.stringify(define.depUrls))
		// check the status of each depUrl
		for(var i = 0; i < define.deps.length; i++){
			var depUrl	= define.depUrls[i];
			var depStatus	= EzRequire._depStatuses[depUrl];
			EzRequire.debug && console.log("checkAllDefines depUrl", depUrl, "depStatus", depStatus)
			if( depStatus !== 'ready' )	return;
		}
		EzRequire.debug && console.log("checkAllDefines define depStatus", EzRequire._depStatuses[define.name], define.name)
		EzRequire.debug && console.log("checkAllDefines depStatuses", JSON.stringify(EzRequire._depStatuses))

		// call onReady callback 
		define.onReady();

		EzRequire.debug && console.log("checkAllDefines notified", define.name)

		EzRequire._depStatuses[define.name] = "ready";
		delete EzRequire._defines[name];
		// launch a ._checkAllDefines() 
		setTimeout(EzRequire._checkAllDefines, 0)
	});
	EzRequire.debug && console.log("*********** checkAllDefines() END")
};

/**
 * directly from https://github.com/jeromeetienne/normalizeUrl.js
 *
 * TODO not sure it is needed to be fullfledged. maybe a simpler/shorter one would do
*/
EzRequire._normalizeUrl	= function(url){
	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	function parseUri (str) {
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	};
	parseUri.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	// parse the url
	var uri	= parseUri(url);
	//console.log("BEFORE uri.path", uri.path)
	var paths	= uri.path.split('/');
	// remove empty path '//' or null path '/./'
	paths	= paths.filter(function(str, idx){
		if( idx === 0 )		return true;
		if( str === '' )	return false;
		if( str === '.' )	return false;
		return true;
	});
	//console.log("paths", JSON.stringify(paths))

	// handle the parent path '..'
	for(var i = 0; i < paths.length; i++ ){
		if( i >= 1 && paths[i+1] === '..' ){
			paths.splice(i, 2);
			i -= 2;
		}else if( paths[i] === '..' ){
			paths.splice(i, 1);
			i -= 1;
		}
	}
	// reassemble uri.path
	uri.path	= paths.join('/');

	// build the newUrl	
	var newUrl	= uri.protocol+"://"+uri.authority+uri.path
				+ (uri.query	? '?'+uri.query	:'')
				+ (uri.anchor	? '#'+uri.anchor:'');
	// return the newUrl
	return newUrl;
}

EzRequire.define = function(name, deps, onReady){
	// handle polymorphism
	if( typeof(name) !== 'string' ){
		onReady	= deps;
		deps	= name;
		
		var scripts	= document.querySelectorAll('head script')
		var script	= scripts[scripts.length-1];
		name		= script.src;
	}
	if( deps instanceof Array === false ){
		onReady	= deps;
		deps	= [];		
	}
	// sanity check - variable types is strict
	console.assert(deps instanceof Array);
	console.assert(typeof(name) === 'string');
	console.assert(typeof(onReady) === 'function');
	
	EzRequire.debug && console.log("******** define('"+name+"', "+JSON.stringify(deps)+", function) Begin")
	//console.log("name", name, "deps", deps, "onReady", onReady)

	////////////////////////////////////////////////////////////////////////
	// apply urlModifiers to deps
	for(var i = 0; i < deps.length; i++){
		for(var j = 0; j < EzRequire.urlModifiers.length; j++){
			var urlModifier	= EzRequire.urlModifiers[j];
			deps[i]		= urlModifier(deps[i]);
		}
	}
	
	////////////////////////////////////////////////////////////////////////
	// compute depUrls
	var depUrls	= [];
	var baseUrl	= location.href.replace(/[^/]*$/, '')
	deps.forEach(function(dep){
		var depUrl	= dep + (dep.match(/\.js$/) ? '' : '.js');
		depUrl		= baseUrl + depUrl;
		depUrl		= EzRequire._normalizeUrl(depUrl)
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
	EzRequire.debug && console.log("Queue define", JSON.stringify(EzRequire._defines[name]))

	console.assert( EzRequire._depStatuses[name] === undefined || EzRequire._depStatuses[name] === "loading");
	var isFromRequire	= name.match(/^void:\/\/require-/) ? true : false;
	EzRequire._depStatuses[name]	= isFromRequire ? "loaded" : "loading";

	//////////////////////////////////////////////////////////////////////////
	// 
	deps.forEach(function(dep, depIdx){
		var depUrl	= depUrls[depIdx];
		if( EzRequire._depStatuses[depUrl] !== undefined )	return;
		EzRequire._depStatuses[depUrl]	= 'loading';
		EzRequire._loadScript(depUrl, function(){
			EzRequire._depStatuses[depUrl]	= dep.match(/\.js$/) ? 'ready' : 'loaded';
			EzRequire._checkAllDefines();
		}, function(){
			EzRequire._depStatuses[depUrl]	= 'error';
			console.warn('cant load '+depUrl)
		})
	});

	// launch a ._checkAllDefines() 
	setTimeout(EzRequire._checkAllDefines, 0)

	EzRequire.debug && console.log("******** define('"+name+"') End ")
}

EzRequire._requireModuleId	= 0;

/**
 * same as define() - the moduleId is automatically generated
*/
EzRequire.require	= function(deps, callback){
	var moduleId	= "void://require-"+(EzRequire._requireModuleId++);
	return EzRequire.define(moduleId, deps, callback)
}




