#!/usr/bin/env node

var getDeps	= function(filedata){

	var re		= /\.(define|require)\(([^]*\])/m;
	var matches	= filedata.match(re)
	if( !matches )		return [];
	if( !matches[2] )	return [];

	// convert the dep
	var depsString	= matches[2];
	var deps	= eval(depsString);
	return deps;
}

var allDeps	= [];
var processFile	= function(dep){
	var filename	= "../../../"+dep;
	if( !dep.match(/\.js$/) && !dep.match(/\.html$/) )	filename	+= ".js";
	console.log("processFile", filename, dep)
	var filedata	= require('fs').readFileSync(filename, 'utf8')
	//console.log("data", filedata);
	var deps	= getDeps(filedata);
console.log(deps)
	if( deps.length === 0 )	return;
	deps.forEach(function(dep){
		allDeps.push(dep);
		processFile(dep)
	});
}

processFile('plugins/ezrequire/examples/index.html');

