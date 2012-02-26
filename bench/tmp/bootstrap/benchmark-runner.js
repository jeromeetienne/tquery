// TODO make that a class
// and instanciate it

var runner	= {};

runner.displaySuite	= function(suite, containerSel){
	// empty the container
	jQuery(containerSel).empty();

	// add the header
	var templateStr	= jQuery('#tmplSuiteHead').text().trim();
	var result	= _.template(templateStr, {
		suite0	: suite
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
			bench	: bench,
			ratio	: (bench.hz > 0 && hzMax > 0) ? bench.hz / hzMax : null
		});
		jQuery(result).appendTo(containerSel);	
	});
}

runner.suites	= [];

runner.benchsuite	= function(name, declarationFn){
	// allocate the suite
	var suite	= new Benchmark.Suite(name)

	// define the global functions
	var global	= window;
	global.before	= function(callback){
		//console.log("inside before", callback);
		suite.on('start', function(){
			callback();	
		});
	};
	global.after	= function(callback){
		//console.log("inside after", callback);
		suite.on('complete', function(){
			callback();	
		});
	};
	global.bench	= function(name, fn){
		//console.log("inside bench", name);
		suite.add(name, fn);
	};

	// call the declarationFn
	declarationFn();

	// delete all global
	['before', 'after', 'bench'].forEach(function(fnName){
		delete global[fnName];	
	});

	// bind the events to display
	suite.on('start cycle complete', function(event, bench){
		runner.displaySuite(suite, '#benchOutput');
	});
	
	// queue
	runner.suites.push(suite);
}

runner.run	= function(){
	var suite	= runner.suites[0];
	suite.run({
		async	: true
	});
}

window.benchsuite	= runner.benchsuite;

