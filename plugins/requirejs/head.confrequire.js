/**
 * @fileoverview this is the initial requirejs.config(). the one which establish the 
 * path of each parts of the project.
 * TODO is it generic enought ? could it be using baseURL ?
*/
requirejs.config({
	paths	: {
		"build"		: "../../../build",
		"plugins"	: "../../../plugins",
		"threex"	: '../../../vendor/threex',
		"three.js"	: '../../../vendor/three.js',
	},
});


