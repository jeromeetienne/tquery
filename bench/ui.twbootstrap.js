;(function(global){
	var displaySuite	= function(suite, containerSel){
		// empty the container
		jQuery(containerSel).empty();
	
		// add the header
		var templateStr	= jQuery('#tmplSuiteHead').text().trim();
		var result	= _.template(templateStr, {
			name	: suite.name,
			running	: suite.running
		});
		jQuery(result).appendTo(containerSel);	
	
		// compute hzMax among all bench
		var hzMax	= 0;
		suite.forEach(function(bench, idx){
			hzMax	= Math.max(hzMax, bench.hz)
		});
	
		// for each bench, render the template
		suite.forEach(function(bench, idx){
			var templateStr	= jQuery('#tmplBenchItem').text().trim();
			var result	= _.template(templateStr, {
				name	: bench.name,
				hz	: bench.hz,
				ratio	: (bench.hz > 0 && hzMax > 0) ? bench.hz / hzMax : null
			});
			jQuery(result).appendTo(containerSel);	
		});
	}


	global.suite	= function(name, declarationFn){
		var suite	= new Benchmark.Suite(name)
	
		var global	= window;
		global.before	= function(callback){
			//console.log("inside before", callback);
			suite.on('start', function(){
				console.log("onStart");
				callback();	
			});
		};
		global.after	= function(callback){
			//console.log("inside after", callback);
			suite.on('complete', function(){
				console.log("onComplete");
				callback();	
			});
		};
		global.bench	= function(name, fn){
			//console.log("inside bench", name);
			suite.add(name, fn);
		};
	
		declarationFn();
	
		// delete all global
		['before', 'after', 'bench'].forEach(function(fnName){
			delete global[fnName];	
		});
	
		// bind the events to display
		suite.on('start cycle complete', function(event, bench){
			displaySuite(suite, '#benchOutput');
		});	
	
		suite.run({ 'async': true });
		
		return suite;
	}
})(window);