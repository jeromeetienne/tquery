#!/usr/bin/env node

var dirName	= "js/tquery.core.create.js";
var cmdline	= "make buildBundle"

// Run the first time
//require('child_process').exec(cmdline)


var onChange	= function (curr, prev){
	console.log("trigger", curr.mtime, prev.mtime)
	if( curr.mtime - prev.mtime === 0 )	return;
	//console.dir(curr.mtime)
	//console.dir(prev.mtime)
	
	console.log("change on "+dirName+".", new Date()," Running '"+ cmdline+"'")
	//require('child_process').exec(cmdline)
}

console.log("Start monitoring", dirName)
require('fs').watchFile(dirName, function (curr, prev){
	console.log("trigger", curr.mtime, prev.mtime)
	if( curr.mtime - prev.mtime === 0 )	return;
	//console.dir(curr.mtime)
	//console.dir(prev.mtime)
	
	console.log("change on "+dirName+".", new Date()," Running '"+ cmdline+"'")
	//require('child_process').exec(cmdline)
});