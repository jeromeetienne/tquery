function normalizeUrl(url){
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
	//console.log("paths", JSON.stringify(paths))
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
		//console.log(i+"th", paths[i], "paths", JSON.stringify(paths))
		if( i >= 1 && paths[i+1] === '..' ){
			//console.log("BEFORE", i+"th", paths[i], "paths", JSON.stringify(paths))
			paths.splice(i, 2);
			i -= 2;
			//console.log("AFTER", i+"th", paths[i], "paths", JSON.stringify(paths))
		}else if( paths[i] === '..' ){
			//console.log("BEFORE", i+"th", paths[i], "paths", JSON.stringify(paths))
			paths.splice(i, 1);
			i -= 1;
			//console.log("AFTER", i+"th", paths[i], "paths", JSON.stringify(paths))
		}
	}
	//console.log("paths", JSON.stringify(paths))

	// reassemble uri.path
	uri.path	= paths.join('/');

	//console.log("AFTER uri.path", uri.path)
	
	// build the newUrl	
	var newUrl	= uri.protocol+"://"+uri.authority+uri.path
				+ (uri.query	? '?'+uri.query	:'')
				+ (uri.anchor	? '#'+uri.anchor:'');
	// return the newUrl
	return newUrl;
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= normalizeUrl
}