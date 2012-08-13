// declare a fake requirejs.config() function to merge all calls in a single options object
var output	= {}
var requirejs	= {
	config	: function(opts){
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
}
// read 'all.confrequire.js' to get all calls to requirejs.config()
var filename	= process.argv[2]	|| console.assert(false, 'a filename MUST be provided');
var content	= require('fs').readFileSync(filename, 'utf8');
// eval 'all.confrequire.js' config
eval(content)
// output the merged options object for requirejs.config()
console.log('requirejs.config('+JSON.stringify(output, null, '\t')+');')