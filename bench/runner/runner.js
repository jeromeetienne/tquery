/********************************************************************************/
/*										*/
/********************************************************************************/

var Runner	= function(){
	this._suites	= [];
	this._curSuite	= null;
	this._runningAll= false;
};

Runner.prototype.destroy	= function(){
	this.abort();
}

/********************************************************************************/
/*										*/
/********************************************************************************/

Runner.prototype._function2Str	= function(fn){
	var str		= fn.toString();
	var lines	= str.split('\n');
	lines.shift();
	lines.pop();
	
	// TODO count the indent
	var identLen	= 2;
	// remove the ident
	lines		= lines.map(function(line){ return line.substr(identLen); });

	return lines.join('\n');
}


Runner.prototype._displaySuite	= function(suite, containerSel){
	var _this	= this;
	// display to debug
	console.log("displaySuite"); console.dir(suite)

	// compute hzMax among all bench
	var hzMax	= 0;
	suite.forEach(function(bench){
		hzMax	= Math.max(hzMax, bench.hz)
	});

	// compute hzMax among all bench
	var nBenchDone	= 0;
	if( suite.running === false ){
		suite.forEach(function(bench){
			if( bench.hz > 0 )	nBenchDone++;
		});
	}	

	// empty the container
	jQuery(containerSel).empty();

	// add the header
	var templateStr	= jQuery('#tmplSuiteHead').text().trim();
	var result	= _.template(templateStr, {
		suite	: suite,
		state	: suite.running ? 'running' : (nBenchDone === suite.length ? 'done' : 'init')
	});
	jQuery(result).appendTo(containerSel);	

	// for each bench, render the template
	suite.forEach(function(bench, idx){
		var templateStr	= jQuery('#tmplBenchItem').text().trim();
		var result	= _.template(templateStr, {
			bench	: bench,
			ratio	: bench.hz > 0 ? bench.hz / hzMax : null,
			fnStr	: _this._function2Str(bench.fn),
			state	: bench.running ? 'running' : (bench.hz > 0 ? 'done' : 'init')
		});
		jQuery(result).appendTo(containerSel);	
	});
};

Runner.prototype.addSuite	= function(name, declarationFn){
	var _this	= this;
	// allocate the suite
	var suite	= new Benchmark.Suite(name)

	// define the global functions
	var global	= window;
	global.before	= function(callback){
		//console.log("inside before", callback);
		suite.on('start', callback);
	};
	global.after	= function(callback){
		//console.log("inside after", callback);
		suite.on('complete', callback);
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
		_this._displaySuite(suite, suite._runnerSelector);
	});

	suite.on('complete', function(event, bench){
		if( _this._runningAll === false )	return;
		_this._runNext();
	});
	
	// queue this suite
	this._suites.push(suite);

	// create the container	
	jQuery('<div class="suite">').appendTo('#runner .suites');
	// set the container selector
	suite._suiteIdx		= jQuery('#runner .suites .suite').length-1;
	suite._runnerSelector	= "#runner .suites .suite:nth-child("+(suite._suiteIdx+1)+")";
	jQuery(suite._runnerSelector).data('suiteIdx', suite._suiteIdx);
	// first display
	this._displaySuite(suite, suite._runnerSelector);		
};

/********************************************************************************/
/*										*/
/********************************************************************************/

Runner.prototype.run	= function(idx){
	console.assert( idx < this._suites.length )
	var suite	= this._suites[idx];
	this._curSuite	= suite;
	suite.run({
		async	: true
	});
};

Runner.prototype.abort	= function(){
	var suite	= this._curSuite;
	this._runningAll	= false;
	if( !this._curSuite )	return;

	this._curSuite.abort();
	this._curSuite	= null;
	this._displaySuite(suite, suite._runnerSelector);		
};

Runner.prototype.runAll	= function(){
	this.abort();
	console.assert( this._runningAll === false )
	if( this._suites.length === 0 )	return;
	this._runningAll	= true;
	this.run(0);
};

Runner.prototype._runNext	= function(){
	console.assert( this._runningAll === true );
	// get the next suiteIdx
	var suiteIdx	= this._curSuite._suiteIdx + 1;
	// if runAll is over, return now
	if( suiteIdx === this._suites.length ){
		this._runningAll	= false;
		return;
	}
	// run this suite
	this.run(suiteIdx);
};


/********************************************************************************/
/*										*/
/********************************************************************************/

// export it in the global space
;(function(){
	// instanciate a runner
	var runner	= new Runner();
	// declare in the global space
	window.runner	= runner;
	window.benchsuite	= runner.addSuite.bind(runner);

	// bind 'click' on .head
	jQuery('#runner .suite .head').live('click', function(event){
		var suiteIdx	= jQuery(event.target).parents('.suite').data('suiteIdx');
		runner.run(suiteIdx);
	});

	// bind 'click' on 'runall'
	jQuery('#runner .stats .runall').live('click', function(event){
		runner.runAll();
	});
	
	// initial display of '#runner .stats'
	jQuery(function(){
		var nSuites	= runner._suites.length;
		var nBenchmarks	= 0;
		runner._suites.forEach(function(suite){
			nBenchmarks	+= suite.length;
		});
		jQuery('#runner .stats .nSuites').text(nSuites);
		jQuery('#runner .stats .nBenchmarks').text(nBenchmarks);
	});

	jQuery(function(){
		if( location.hash === '#runall' ){
			runner.runAll();
		}
	});

})();

