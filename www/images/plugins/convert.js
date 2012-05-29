#!/usr/bin/env node

var dirname	= ".";
var filenames	= require('fs').readdirSync(dirname);
filenames	= filenames.filter(function(filename){
	return filename.match(/\-original\.png$/);
});

filenames.forEach(function(filename){
	var newname	= filename.replace(/-original\./, '.');
	var cmdline	= "convert '"+filename+"' -resize 260x180 '"+newname+"'"
	console.log("running $ "+cmdline)
	require('child_process').exec(cmdline);
});
