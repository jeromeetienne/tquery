// declare a fake requirejs.config() function to merge all calls in a single options object
var output	= {}
var requirejs	= {};
requirejs.config	= function(opts){
	// merge opts in output with deep copy
	deepExtend(output, opts)	
	
	// from http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
	function deepExtend(dst, src){
		for (var property in src) {
			if (src[property] && src[property].constructor && src[property].constructor === Object) {
				dst[property] = dst[property] || {};
				arguments.callee(dst[property], src[property]);
			} else {
				dst[property] = src[property];
			}
		}
		return dst;
	};
}

// get all filenames in confrequire/*.conrequire.js
var filenames	= require('fs').readdirSync('confrequire').filter(function(filename){
	return filename.match(/\.confrequire\.js$/)
});
// concat head.confrequire.js and all confrequire/*.configrequire.js
var content	= require('fs').readFileSync('head.confrequire.js', 'utf8')
filenames.forEach(function(filename){
	content	+= require('fs').readFileSync('confrequire/'+filename, 'utf8')
})

// eval every *.confrequire.js config
eval(content)
// output the merged options object for requirejs.config()
console.log('requirejs.config('+JSON.stringify(output, null, '\t')+');')
