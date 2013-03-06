
//////////////////////////////////////////////////////////////////////////////////
//		Implement queuable getter setter				//
//////////////////////////////////////////////////////////////////////////////////

/**
 * by default __defineGetter__ support only one function. Same for __defineSetter
 * This is a annoying limitation. This little library declares 2 functions
 * Object.__defineQGetter__ and Object.__defineQGetter__.
 * They behave the same as their native sibling but support multiple functions.
 * Those functions are called in the same order they got registered.
 * 
 * (I have no idea of the reasoning behind this limitation to one function. It seems
 *  useless to me. This remind me of onclick of the DOM instead of a proper .addEventListener) 
*/


/**
 * Class to implement queueable getter/setter
 * @param  {Object} baseObject The base object on which we operate
 * @param  {String} property   The string of property
 */
var QGetterSetter	= {};

/**
 * Define a getter/setter for a property
 * @param {Object} baseObject the base object which is used
 * @param {String} property   the name of the property
 */


QGetterSetter.Property	= function(baseObject, property){
	// sanity check 
	console.assert( typeof(baseObject) === 'object' );
	console.assert( typeof(property) === 'string' );
	// backup the initial value
	var originValue	= baseObject[property];
	// init some local variables
	var _this	= this;
	this._getters	= [];
	this._setters	= [];
	// define the root getter
	baseObject.__defineGetter__(property, function getterHandler(){
		var value	= baseObject['__'+property];
		for(var i = 0; i < _this._getters.length; i++){
			// TODO why those extra param are needed
			// - needed for privateforjs to identify the origin
			// - is that the proper format ?
			// - is that important for setter
			value	= _this._getters[i](value, getterHandler.caller, property)
		}
		return value;
	});
	// define the root setter		
	baseObject.__defineSetter__(property, function(value){
		for(var i = 0; i < _this._setters.length; i++){
			value	= _this._setters[i](value)
		}
		baseObject['__'+property] = value;
	});
	// set the originValue
	baseObject['__'+property]	= originValue;
};

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= QGetterSetter;

/**
 * define a getter 
 * 
 * @param  {Obejct} baseObject the object containing the property
 * @param  {string} property   the property name which gonna get the getter
 * @param  {Function} getterFn   function which handle the getter
 */
QGetterSetter.defineGetter	= function(baseObject, property, getterFn){
	var name	= "__dbgGetSet_" + property;
	// init QGetterSetter for this property if needed
	baseObject[name]= baseObject[name] || new QGetterSetter.Property(baseObject, property);
	// setup the new getter
	baseObject[name]._getters.push(getterFn)
}

/**
 * define a setter 
 * 
 * @param  {Object} baseObject the object containing the property
 * @param  {string} property   the property name which gonna get the setter
 * @param  {Function} setterFn   function which handle the setter
 */
QGetterSetter.defineSetter	= function(baseObject, property, setterFn){
	var name	= "__dbgGetSet_" + property;
	// init QGetterSetter for this property if needed
	baseObject[name]= baseObject[name] || new QGetterSetter.Property(baseObject, property);
	// setup the new setter
	baseObject[name]._setters.push(setterFn)
}

//////////////////////////////////////////////////////////////////////////////////
//		.overloadObjectPrototype()					//
//////////////////////////////////////////////////////////////////////////////////

/**
 * overload the Object.prototype with .__defineQGetter__ and .__defineQSetter__
 * 
 * TODO put that in example/js ?
 */
QGetterSetter.overloadObjectPrototype	= function(){	
	Object.prototype.__defineQGetter__	= function(property, getterFn){
		QGetterSetter.defineGetter(this, property, getterFn);
	};
	Object.prototype.__defineQSetter__	= function(property, setterFn){
		QGetterSetter.defineSetter(this, property, setterFn);
	};
}
/**
 * @namespace
 */
var Stacktrace	= {};

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= Stacktrace;

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//										//
//		Stacktrace.parse()						//
//										//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


/**
 * parse the stacktrace of an Error.
 * 
 * @param  {Error|undefined} error optional error to parse. if not provided, generate one.
 * @return {Array.<Object>}	parsed stacktrace
 */
Stacktrace.parse	= function(nShift, error){
	// handle polymorphism
	nShift	= nShift !== undefined ? nShift	: 0;
	error	= error	|| new Error();
	// sanity check
	console.assert(error instanceof Error);
	// call the proper parser depending on the usage 
	if( typeof(window) === 'undefined' ){
		var stacktrace	= _parserV8(error)
	}else if( navigator.userAgent.match('Chrome/') ){
		var stacktrace	= _parserV8(error)		
	}else if( navigator.userAgent.match('Firefox/') ){
		var stacktrace	= _parserFirefox(error)				
	}else{
		console.assert(false, 'Stacktrace.parse() not yet implemented for', navigator.userAgent)
		return [];
	}
	// add one to remove the parser*() function
	nShift	+= 1;
	console.assert(stacktrace.length >= nShift, 'stacktrace length not large enougth to shift '+nShift)
	return stacktrace.slice(nShift);

	//////////////////////////////////////////////////////////////////////////
	//									//
	//////////////////////////////////////////////////////////////////////////

	/**
	 * parse stacktrace for v8 - works in node.js and chrome
	 */
	function _parserV8(error){
		// start parse the error stack string
		var lines	= error.stack.split("\n").slice(1);
		var stacktrace	= [];
		lines.forEach(function(line){
			if( line.match(/\(native\)$/) ){
				var matches	= line.match(/^\s*at (.+) \(native\)/);
				stacktrace.push(new Stacktrace.Frame({
					fct	: matches[1],
					url	: 'native',
					line	: 1,
					column	: 1
				}));
			}else if( line.match(/\)$/) ){
				var matches	= line.match(/^\s*at (.+) \((.+):(\d+):(\d+)\)/);
				stacktrace.push(new Stacktrace.Frame({
					fct	: matches[1],
					url	: matches[2],
					line	: parseInt(matches[3], 10),
					column	: parseInt(matches[4], 10)
				}));
			}else{
				var matches	= line.match(/^\s*at (.+):(\d+):(\d+)/);
				stacktrace.push(new Stacktrace.Frame({
					url	: matches[1],
					fct	: '<anonymous>',
					line	: parseInt(matches[2], 10),
					column	: parseInt(matches[3], 10)
				}));
			}
		});
		return stacktrace;
	};

	/**
	 * parse the stacktrace from firefox
	 */
	function _parserFirefox(error){
		// start parse the error stack string
		var lines	= error.stack.split("\n").slice(0, -1);
		var stacktrace	= [];
		lines.forEach(function(line){
			var matches	= line.match(/^(.*)@(.+):(\d+)$/);
			stacktrace.push(new Stacktrace.Frame({
				fct	: matches[1] === '' ? '<anonymous>' : matches[1],
				url	: matches[2],
				line	: parseInt(matches[3], 10),
				column	: 1
			}));
		});
		return stacktrace;
	};
}

//////////////////////////////////////////////////////////////////////////////////
//		Stacktrace.Frame						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * handle stack frame
 * 
 * TODO do a .fromOriginId()
 */
Stacktrace.Frame	= function(opts){
	this.url	= opts.url;
	this.fct	= opts.fct;
	this.line	= opts.line;
	this.column	= opts.column;
};

/**
 * return the origin String
 * @return {String} the origin of the stackframe
 */
Stacktrace.Frame.prototype.originId	= function(){
	var str	= this.fct + '@' + this.url + ':' + this.line + ':' + this.column;
	return str;
};

/**
 * get the basename of the url
 * @return {string}
 */
Stacktrace.Frame.prototype.basename	= function(){
	return this.url.match(/([^/]*)$/)[1]	|| ".";
};

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//										//
//		Stacktrace.Track						//
//										//
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * Tracker of stacktrace
 */
Stacktrace.Tracker	= function(){
	this._klasses	= {};
}

/**
 * record an allocation of a class
 * @param  {String} className The class name under which this record is made
 */
Stacktrace.Tracker.prototype.record	= function(className, stackLevel){
	stackLevel		= stackLevel !== undefined ? stackLevel : 0;
	// init variable
	var at			= Stacktrace.Track;
	var stackFrame		= Stacktrace.parse()[stackLevel+2];
	// init Stacktrace.Track._klasses entry if needed
	this._klasses[className]= this._klasses[className]	|| {
		counter		: 0,
		perOrigins	: {}
	}
	// increase the counter
	var klass		= this._klasses[className];
	klass.counter		+= 1;
	// build the originId from stackFrame
	var originId		= stackFrame.fct + '@' + stackFrame.url + ':' + stackFrame.line;
	// update counters for this originId
	var perOrigins		= klass.perOrigins;
	perOrigins[originId]	= perOrigins[originId] !== undefined ? perOrigins[originId]  : 0;
	perOrigins[originId]	+= 1;		
}

/**
 * reset all counters kepts by Stacktrace.Track
 */
Stacktrace.Tracker.prototype.reset	= function(){
	this._klasses	= {};
}

/**
 * getter for the results
 */
Stacktrace.Tracker.prototype.klasses	= function(){
	return this._klasses;
}
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Dump current state of the tracker in console.log(). 
 * 
 * @see Stacktrace.Tracker.reportString()
 */
Stacktrace.Tracker.prototype.dump	= function(){
	var report	= this.reportString.apply(this, arguments)
	console.log(report);
}

/**
 * Reporter in a String
 * 
 * @param  {RegExp} classNameRegExp regexp of the classname to keep
 * @param  {Number} maxNOrigin      nb origin to display per class
 */
Stacktrace.Tracker.prototype.reportString	= function(classNameRegExp, maxNOrigin){
	// handle polymorphism
	classNameRegExp	= classNameRegExp	|| /./;
	maxNOrigin	= maxNOrigin !== undefined ? maxNOrigin	: 3;
	// define local variable
	var output	= [];
	var classNames	= Object.keys(this._klasses);
	// sort classes by descending .counter
	classNames.sort(function(a, b){
		return this._klasses[b].counter - this._klasses[a].counter;
	}.bind(this));
	// filter by classname
	classNames	= classNames.filter(function(className){
		return className.match(classNameRegExp) ? true : false
	});
	// display the rest
	classNames.forEach(function(className){
		var klass	= this._klasses[className];
		output.push(className+': total '+klass.counter+' times');
		
		var perOrigins	= klass.perOrigins;

		var ranks	= Object.keys(perOrigins);
		ranks.sort(function(a, b){
			return perOrigins[b] - perOrigins[a];
		});

		//console.dir(aClass._newCounters)
		//console.log('ranks', ranks)

		ranks.slice(0, maxNOrigin).forEach(function(originId){
			var perOrigin	= perOrigins[originId];
			output.push('\t'+originId+' - '+perOrigin+' times')
			//console.log(counters[origin], "new aClass at ", origin);
		});
	}.bind(this));
	return output.join('\n');
};




/**
 * assert which actually try to stop the excecution
 * if debug.assert.useDebugger is falsy, throw an exception. else trigger the
 * debugger. It default to false. unclear how usefull it is for node.js
 * to overload console.assert just do ```console.assert	= assertWhichStop;```.
 * Based on https://gist.github.com/2651899 done with jensarps.
 *
 * @param {Boolean} condition the condition which is asserted
 * @param {String} message the message which is display is condition is falsy
 * @param {Boolean} [useDebugger] if true, a failled assert will trigger js debugger
*/
var assertWhichStop	= function(condition, message, useDebugger){
	if( condition )	return;
	if( assertWhichStop.useDebugger || useDebugger )	debugger;
	throw new Error(message	|| "Assert Failed");
}

/**
 * if true, a fail assert will trigger js debugger
 * 
 * @type {Boolean}
 */
assertWhichStop.useDebugger	= false;

// export the class in node.js - if running in node.js - unclear how usefull it is in node.js
if( typeof(window) === 'undefined' )	module.exports	= assertWhichStop;

/**
 * Little helper to overload console.assert
 * @api public
 * @todo a .offConsoleAPI() or noConflict() which restore it
 */
assertWhichStop.overloadConsole	= function(){
	console.assert	= assertWhichStop;
}
 /**
 * @fileOverview implementation of a log layer on top of console.*
*/

var Stacktrace	= Stacktrace	|| require('./stacktrace.js');

/**
 * @namespace logger compatible with console.* calls
 */
var ConsoleLogger	= {};

/**
 * the previous instance of console object
*/
ConsoleLogger._origConsole	= {
	console	: console,
	log	: console.log,
	warn	: console.warn,
	error	: console.error
};


// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= ConsoleLogger;

/**
 * Des ription of the various level of severity
 * @type {Object}
 */
ConsoleLogger.Severity	= {
	'all'		: 0,
	'log'		: 1,
	'warn'		: 2,
	'error'		: 3,
	'nothing'	: 99
};

/**
 * default level of severity when no filter matches
 * 
 * @type {Number}
 */
ConsoleLogger.Severity.dfl	= ConsoleLogger.Severity.all;

//////////////////////////////////////////////////////////////////////////////////
//		handle formatters							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * formater which doesnt change anything
 * 
 * @param  {Array} args	the ```arguments``` of the logger funciton
 * @param  {Stacktrace.Frame}	stackFrame the stackframe of the origin 
 * @param  {string} severity	severity of the message
 * @return {Array}		the formated args
 */
ConsoleLogger.formatterIdentity	= function(args, stackFrame, severity){
	return args;
}

/**
 * formater which add a timestamp as prefix to the message - with color if in node
 * 
 * @param  {Array} args	the ```arguments``` of the logger funciton
 * @param  {Stacktrace.Frame}	stackFrame the stackframe of the origin 
 * @param  {string} severity	severity of the message
 * @return {Array}		the formated args
 */
ConsoleLogger.formatterTimeStamp	= function(args, stackFrame, severity){
	// build prefix with time
	var present	= new Date();
	var prefixColor	= ConsoleLogger._formatterSeverityColor(severity);
	var prefix	= prefixColor + pad(present.getHours(),2)
				+ ':'
				+ pad(present.getMinutes(),2)
				+ ':'
				+ pad(present.getSeconds(),2)
				+ ConsoleLogger._formatterColor.reset;
	// convert arguments into actual Array
	args	= Array.prototype.slice.call(args, 0);
	// prepend the prefix
	args.unshift(prefix);
	// return the result
	return args;

	function pad(val, len) {
		val = String(val);
		while(val.length < len) val = "0" + val;
		return val;
	};
};

/**
 * formater which add the origin as prefix to the message - with color if in node
 * 
 * @param  {Array} args	the ```arguments``` of the logger funciton
 * @param  {Stacktrace.Frame}	stackFrame the stackframe of the origin 
 * @param  {string} severity	severity of the message
 * @return {Array}		the formated args
 */
ConsoleLogger.formatterOrigin	= function(args, stackFrame, severity)
{
	// compute prefix
	var prefixColor	= ConsoleLogger._formatterSeverityColor(severity);
	var prefix	= prefixColor + stackFrame.originId() + ConsoleLogger._formatterColor.reset;
	// convert arguments into actual Array
	args		= Array.prototype.slice.call(args, 0);
	// prepend the prefix
	args.unshift(prefix);
	// return the result
	return args;
}

/**
 * flag to know if it is running in node.js or browser
 * @type {Boolean}
 */
ConsoleLogger._inNode	= typeof(window) === 'undefined' ? true : false;
/**
 * Color code for ansi tty
 * @type {String}
 */
ConsoleLogger._formatterColor	= {
	black	: ConsoleLogger._inNode === false ? '' : '\033[30m',
	red	: ConsoleLogger._inNode === false ? '' : '\033[31m',
	green	: ConsoleLogger._inNode === false ? '' : '\033[32m',
	yellow	: ConsoleLogger._inNode === false ? '' : '\033[33m',
	blue	: ConsoleLogger._inNode === false ? '' : '\033[34m',
	purple	: ConsoleLogger._inNode === false ? '' : '\033[35m',
	cyan	: ConsoleLogger._inNode === false ? '' : '\033[36m',
	white	: ConsoleLogger._inNode === false ? '' : '\033[37m',
	reset	: ConsoleLogger._inNode === false ? '' : '\033[0m'
};

/**
 * return ainsi color per intensity
 * @param  {String} severity the severity of the message
 * @return {String} ansi color string
 */
ConsoleLogger._formatterSeverityColor	= function(severity){
	var color	= ConsoleLogger._formatterColor;
	if( severity === 'log' )	return color.red;
	if( severity === 'warn' )	return color.purple;
	return color.green;
}

/**
 * Current message formatter
 */
ConsoleLogger.formatter	= ConsoleLogger.formatterIdentity;

//////////////////////////////////////////////////////////////////////////////////
//		handle filters							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Store all the filters
 * @type {Array}
 */
ConsoleLogger._filters	= [];

/**
 * push a new filter - stackFrame 
 * 
 * @param  {Function(stackFrame)} validFor function which determine which stackFrame is valid 
 * @param  {[type]} severity [description]
 * @return {[type]}          [description]
 */
ConsoleLogger.pushFilter	= function(validFor, severity){
	// handle polymorphism
	if( typeof(validFor) === 'string' ){
		var path	= validFor;
		return ConsoleLogger.pushFilter(function(stackFrame, severity){
			return stackFrame.url.lastIndexOf(path) === stackFrame.url.length - path.length ? true : false;
		}, severity);
	}else if( validFor instanceof RegExp ){
		var regexp	= validFor;
		return ConsoleLogger.pushFilter(function(stackFrame, severity){
			return stackFrame.url.match(regexp)	? true : false
		}, severity);		
	}
	// sanity check - sanity level MUST be defined
	console.assert(Object.keys(ConsoleLogger.Severity).indexOf(severity) !== -1, 'unknown severity level');
	console.assert(validFor instanceof Function);
	// push new level
	ConsoleLogger._filters.push({
		validFor	: validFor,
		severity	: ConsoleLogger.Severity[severity]
	});
};

/**
 * test if a given instance of severity and stackframe is valid for ConsoleLogger
 * @param  {string} severity   Severity to test
 * @param  {Object} stackFrame stackframe to test (in stacktrace.js format)
 * @return {Boolean}           true if the filter is valid, false otherwise
 */
ConsoleLogger.filter	= function(severity, stackFrame){
	stackFrame	= stackFrame	|| Stacktrace.parse()[2];
	// sanity check - sanity level MUST be defined
	console.assert(Object.keys(ConsoleLogger.Severity).indexOf(severity) !== -1, 'unknown severity level');
	// go thru all the filters
	var filters	= ConsoleLogger._filters;
	for(var i = 0; i < filters.length; i++){
		var filter	= filters[i];
		if( filter.validFor(stackFrame) === false )	continue;
		return ConsoleLogger.Severity[severity] >= filter.severity ? true : false;
	}
	// if this point is reach, check with Severity.dfl
	return ConsoleLogger.Severity[severity] >= ConsoleLogger.Severity.dfl ? true : false;
}

//////////////////////////////////////////////////////////////////////////////////
//		handle log functions						//
//////////////////////////////////////////////////////////////////////////////////

ConsoleLogger._print	= function(severity, args){
	var stackFrame	= Stacktrace.parse()[2];

	if( ConsoleLogger.filter(severity, stackFrame) === false )	return;

	var args	= ConsoleLogger.formatter(args, stackFrame, severity);
	var _console	= ConsoleLogger._origConsole;
	if( severity === 'log' ){
		_console.log.apply(_console.console, args);	
	}else if( severity === 'warn' ){
		_console.warn.apply(_console.console, args);			
	}else if( severity === 'error' ){
		_console.error.apply(_console.console, args);			
	}else console.assert(false, 'invalid severity: '+severity)
};

/**
 * log with a severity of 'log'
 */
ConsoleLogger.log	= function(/* ... */){
	ConsoleLogger._print('log', arguments);
}

/**
 * log with a severity of 'warn'
 */
ConsoleLogger.warn	= function(/* ... */){
	ConsoleLogger._print('warn', arguments);
}

/**
 * log with a severity of 'error'
 */
ConsoleLogger.error	= function(/* ... */){
	ConsoleLogger._print('error', arguments);
}

//////////////////////////////////////////////////////////////////////////////////
//		Helpers								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Overload console.log/warn/error function
 * 
 * @todo provide a noConflict  
 */
ConsoleLogger.overloadConsole	= function(){
	console.log	= ConsoleLogger.log;
	console.warn	= ConsoleLogger.warn;
	console.error	= ConsoleLogger.error;
}
/**
 * detect gabarge collector occurance. Require v8 for now, so chrome or node.js.
 * typical usage: <code>new GcMonitor().start();</code>
 * 
 * @class monitor gabage collector activities
 * 
 * see details in http://buildnewgames.com/garbage-collector-friendly-code/
 */
var GcMonitor	= function(){
	// init a timer
	var _this	= this;
	var timerid	= null;
	// define function to return used heap size
	var inNode	= typeof(window) === 'undefined' ? true : false;
	var usedHeapSize= inNode ? function(){
		return process.memoryUsage().heapUsed;	
	} : function(){
		if( !window.performance || !window.performance.memory )	return 0;
		return window.performance.memory.usedJSHeapSize;	
	};

	// sanity check - if not available, output a warning
	if( GcMonitor.isAvailable() === false ){
		// open -a "/Applications/Google Chrome.app" --args --enable-memory-info
		console.warn('memory info are unavailable... for chrome, use --enable-memory-info. Other browsers dont have this feature.')
	}

	/**
	 * Start monitoring periodically
	 * 
	 * @param {Function|undefined} onChange optional function to notify when gc occurs
	 * @param {Number|undefined} period period of the check. default to 50ms
	 */
	this.start	= function(onChange, period){
		period	= period	|| 1000/60;
		onChange= onChange	|| function(delta){
			function bytesToSize(bytes, nFractDigit) {
				var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
				if (bytes == 0) return '0';
				nFractDigit	= nFractDigit !== undefined ? nFractDigit : 2;
				var precision	= Math.pow(10, nFractDigit);
				var i 		= Math.floor(Math.log(bytes) / Math.log(1024));
				return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
			};
			console.warn(new Date + " -- GC occured! saved", bytesToSize(delta), 'consuming at', bytesToSize(burnRate), 'per second')
		}
		timerid	= setInterval(function(){
			_this.check(onChange);
		}, period);
		return this;	// for chained api
	};
	/**
	 * Stop monitoring periodically
	 */
	this.stop	= function(){
		cancelInterval(timerid);	
	};
	
	var lastUsedHeap	= null;
	var lastTimestamp	= null;
	var burnRate		= null;	
	/**
	 * Check if currently used memory is less than previous check. If so it 
	 * is assume a GC occured
	 * 
	 * @param  {Function|undefined} onChange callback notified synchronously if gc occured
	 */
	this.check	= function(onChange){
		// parameter polymorphism
		onChange	= onChange || function(property){}

		var present	= Date.now();//console.log('present', (present - lastTimestamp)/1000)
		var currUsedSize= usedHeapSize();

		if( lastUsedHeap === null ){
			lastUsedHeap	= currUsedSize;
			lastTimestamp	= present;
			return;
		}

		// check if the heap size in this cycle is LESS than what we had last
		// cycle; if so, then the garbage collector has kicked in
		var deltaMem	= currUsedSize - lastUsedHeap;
		if( deltaMem < 0 ){
			onChange(-deltaMem, burnRate);		
		}else{
			var deltaTime	= present - lastTimestamp
			var newBurnrate	= deltaMem / (deltaTime/1000);
			if( burnRate === null )	burnRate	= newBurnrate;
			var friction	= 0.99;
			burnRate	= burnRate * friction + newBurnrate * (1-friction);
		}

		lastUsedHeap	= currUsedSize;
		lastTimestamp	= present;
	}
	
	/**
	 * getter for the burnRate
	 * @type {Number}
	 */
	this.burnRate	= function(){
		if( burnRate === null )	return 0;
		return burnRate;
	}
	
	/**
	 * getter for the usedHeapSize
	 * @return {Number} used heap size in byte
	 */
	this.usedHeapSize	= function(){
		return usedHeapSize();
	}
}

/**
 * check if it is available on the plateform it runs on 
 * 
 * @return {Boolean} true if it is available, false otherwise
 */
GcMonitor.isAvailable	= function(){
	var inNode	= typeof(window) === 'undefined' ? true : false;
	if( inNode )	return true;
	if( !window.performance	)	return false;
	if( !window.performance.memory)	return false;
	return true;	
}


// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= GcMonitor;
/**
 * Used to detect globals. works in node.js and browser
 * 
 * from http://stackoverflow.com/questions/5088203/how-to-detect-creation-of-new-global-variables
 * 
 * @class detect globals
 */
var GlobalDetector	= function(){
	// take the namespace for global
	var inBrowser 	= typeof(window) !== 'undefined'	? true : false
	var _global	= inBrowser ?  window :  global;
	// sanity check - a global namespace MUST be found
	console.assert( _global, 'failed to find a global namespace! bailing out!' );
	// init initialGlobals
	var initialGlobals	= {};
	// loop on _global _global object
	for(var propname in _global){
		initialGlobals[propname] = true;
	}
	// init foundGlobals
	var foundGlobals= {};
	
	// init a timer
	var _this	= this;
	var timerid	= null;
	
	/**
	 * Start periodically monitoring
	 * @param  {Function+}	onChange optional callback called when a new global is found
	 * @param  {Number+}	period   period at which it is checked
	 */
	this.start	= function(onChange, period){
		period	= period	|| 1000;
		onChange= onChange	|| function(newProperty){
			var str	= new Date + " -- Warning Global Detected!!! "
			str	+= (inBrowser ? 'window': 'global');
			str	+= "['"+newProperty+"'] === " + _global[newProperty];
			console.warn(str)
		};
		timerid	= setInterval(function(){
			_this.check(onChange);
		}, period);
		return this;	// for chained API
	};
	/**
	 * Stop periodically monitoring
	 */
	this.stop	= function(){
		cancelInterval(_timerid);	
	};
	/**
	 * Check if any new global has been declared
	 * @param  {Function+} onChange optional callback called synchronously if a new global is found
	 * @return {Boolean} true if some new globals have been detected, false otherwise
	 */
	this.check	= function(onChange){
		var newGlobal	= false;
		// parameter polymorphism
		onChange	= onChange || function(property){}
		// new loop on _global object
	        for(var property in _global){
	        	// if it is in the initialGlobals, goto the next
			if( initialGlobals[property] )	continue;
			// if this is already in the ignoreList, goto the next
			if( GlobalDetector.ignoreList.indexOf(property) !== -1 )	continue;
	        	// if it already found, goto the next
			if( foundGlobals[property] )	continue;
			// mark this property as init
			foundGlobals[property]	= true;
			// mark newGlobal
			newGlobal	= true;
			// notify callback
			onChange(property);
	        }
	        return newGlobal;
	};
	/**
	 * getter for the foundGlobals up to now
	 * @return {Object} object with keys as property names
	 */
	this.foundGlobals	= function(){
		return foundGlobals;
	};
};

/**
 * list of variables name to ignore. populated at constructor() time
 * @type {String[]}
 */
GlobalDetector.ignoreList	= [];


// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= GlobalDetector;
/**
 * ensure private property/method stays private
 *
 * @namespace Strong typing for javascript
 */
var PrivateForJS	= {};

// include dependancies
var Stacktrace		= Stacktrace	|| require('./stacktrace.js');
var QGetterSetter	= QGetterSetter	|| require('./qgettersetter.js')


// export the namespace in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= PrivateForJS;

//////////////////////////////////////////////////////////////////////////////////
//		Handle PrivateOKFn						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * determine which function is considered private for klass 
 * @param  {function} klass  the constructor of the class
 * @param  {object|function|function[]} [source] private functions - if Function, use it directly.
 *                           if Array.<function>, then each item is a private function
 *                           if object, then each of its property which is a function is private
 *                           if undefined, use klass.prototype which trigger the Object case
 */
PrivateForJS.pushPrivateOkFn	= function(klass, source){
	// if source isnt provided, use klass.prototype
	if( source === undefined )	source	= klass.prototype;
	// init ._privateOkFn if needed
	klass._privateOkFn	= klass._privateOkFn	|| [];
	// handle various case of source
	if( typeof(source) === 'function' ){
		klass._privateOkFn.push(source)
	}else if( typeof(source) === 'object' ){
		Object.keys(source).forEach(function(key){
			var val	= source[key];
			if( typeof(val) !== 'function' )	return;
			klass._privateOkFn.push(val);			
		});
	}else if( source instanceof Array ){
		source.forEach(function(fn){
			console.assert( typeof(val) !== 'function' );
			klass._privateOkFn.push(fn);			
		});
	}else	console.assert(false);
}

/**
 * return the functions allowed to access private values
 * @param  {Function} klass the class to query
 * @return {Array.<function>} return the function
 */
PrivateForJS.getPrivateOkFn	= function(klass){
	// init ._privateOkFn if needed
	klass._privateOkFn	= klass._privateOkFn	|| [];
	// return current ones
	return klass._privateOkFn;
}

//////////////////////////////////////////////////////////////////////////////////
//		core								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * define a private property on a given instance of a object class
 * @param  {Function} klass	the class of the intenciated object
 * @param  {Object} baseObject	the object instance
 * @param  {String} property	the property name
 * @return {undefined}		nothing
 */
PrivateForJS.privateProperty	= function(klass, baseObject, property){
// @TODO should i put a setter too ?
	QGetterSetter.defineGetter(baseObject, property, function aFunction(value, caller, property){
		// generate privateOkFns if needed - functions which can access private properties
		klass._privateOkFn	= klass._privateOkFn || PrivateForJS.pushPrivateOkFn(klass);
		// if caller not privateOK, notify the caller
		var privateOkFns= klass._privateOkFn;
		if( privateOkFns.indexOf(caller) === -1 ){
			// get stackFrame for the originId of the user
			var stackFrame	= Stacktrace.parse()[2];
			// log the event
			console.assert(false, 'access to private property', "'"+property+"'", 'from', stackFrame.orginId());			
		}
		// actually return the value
		return value;
	});
};

/**
 * define a private function
 * @param  {Function} klass the class of the intenciated object
 * @param  {Function} fn    the function to overload
 * @return {Function}       the overloaded function
 */
PrivateForJS.privateFunction	= function(klass, fn){
	// MUST NOT use .bind(this) as it change the .caller value
	var _this	= this;
	return function _checkPrivateFunction(){
		// get caller
		var caller	= _checkPrivateFunction.caller;
		// generate privateOkFns if needed - functions which can access private properties
		klass._privateOkFn	= klass._privateOkFn || PrivateForJS.pushPrivateOkFn(klass);
		// if caller not privateOK, notify the caller
		var privateOkFns= klass._privateOkFn;
		if( privateOkFns.indexOf(caller) === -1 ){
			// get stackFrame for the originId of the user
			var stackFrame	= Stacktrace.parse()[1];
			// log the event
			console.assert(false, 'access to private property', "'"+property+"'", 'from', stackFrame.orginId());			
		}
		// forward the call to the original function
		return fn.apply(_this, arguments);
	};
};

/**
 * @fileOverview contains TypeCheck class
 * 
 * if input of type in text see 
 * * https://developers.google.com/closure/compiler/docs/js-for-compiler
 * * use same format
 * * autogenerate function parameter check
 */

/**
 * @namespace Strong typing for javascript
 */
var TypeCheck	= {};

// dependancy
var QGetterSetter	= QGetterSetter	|| require('../src/qgettersetter.js')

// export the namespace in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= TypeCheck;



/**
 * Check type with a object setter
 * 
 * @param  {Object} baseObject the base object which contains the property
 * @param  {String} property   the string of the property name
 * @param  {Array}  types      the allows tipe
 */
TypeCheck.setter	= function(baseObject, property, types){
	// check initial value
	var value	= baseObject[property];
	var isValid	= TypeCheck.value(value, types)
	console.assert(isValid, 'initial value got invalid type');
	// setup the setter
	QGetterSetter.defineSetter|(baseObject, property, function(value){
		// check the value type
		var isValid	= TypeCheck.value(value, types);			
		console.assert(isValid, 'invalid type');
		// return the value
		return value;
	});
};

/**
 * function wrapper to check the type of function parameters and return value
 * @param  {Function} originalFn  the function to wrap
 * @param  {Array}    paramsTypes allowed types for the paramter. array with each item is the allowed types for this parameter.
 * @param  {Array}    returnTypes allowed types for the return value
 * @return {boolean}  return isValid, so true if types matche, false otherwise
 */
TypeCheck.fn	= function(originalFn, paramsTypes, returnTypes){
	return function(){
		// check parameters type
		console.assert(arguments.length <= paramsTypes.length, 'funciton received '+arguments.length+' parameters but recevied only '+returnTypes.length+'!');
		for(var i = 0; i < paramsTypes.length; i++){
			var isValid	= TypeCheck.value(arguments[i], paramsTypes[i]);			
			console.assert(isValid, 'argument['+i+'] type is invalid. MUST be of type', paramsTypes[i], 'It is ===', arguments[i])
		}
		// forward the call to the original function
		var result	= originalFn.apply(this, arguments);
		// check the result type
		var isValid	= TypeCheck.value(result, returnTypes);			
		console.assert(isValid, 'invalid type for returned value. MUST be of type', returnTypes, 'It is ===', result);
		// return the result
		return result;
	}
}

/**
 * Check the type of a value
 * @param  {*} value the value to check
 * @param  {Array.<function>} types the types allowed for this variable
 * @return {boolean} return isValid, so true if types matche, false otherwise
 */
TypeCheck.value	= function(value, types){
	// handle parameter polymorphism
	if( types instanceof Array === false )	types	= [types];
	// if types array is empty, default to ['always'], return true as in valid
	if( types.length === 0 )	return true;
	// go thru each type
	var result	= false;
	for(var i = 0; i < types.length; i++){
		var type	= types[i];
		if( type === Number ){
			var valid	= typeof(value) === 'number';
		}else if( type === String ){
			var valid	= typeof(value) === 'string';
		}else if( typeof(type) === 'string' && type.toLowerCase() === 'always' ){
			var valid	= true;
		}else if( typeof(type) === 'string' && type.toLowerCase() === 'never' ){
			// return immediatly as a failed validator
			return false;
		}else if( typeof(type) === 'string' && type.toLowerCase() === 'nonan' ){
			var valid	= value === value;
			if( valid === false )	return false;
			continue;	// continue as it is a validator
		}else if( type instanceof TypeCheck._ValidatorClass ){
			var valid	= type.fn(value);
			if( valid === false )	return false;
			continue;	// continue as it is a validator
		}else {
			var valid	= value instanceof type;
		}
		result	= result || valid;
	}
	// return the just computed result
	return result;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Validator creator. a Validator is a function which is used to validate .value().
 * All the validators MUST be true for the checked value to be valid. 
 * 
 * @param {Function(value)} fn function which return true if value is valid, false otherwise
 */
TypeCheck.Validator	= function(fn){
	return new TypeCheck._ValidatorClass(fn)
}

/**
 * Internal class to be recognisable by TypeCheck.value()
 * 
 * @param  {Function} fn function which return true if value is valid, false otherwise
 */
TypeCheck._ValidatorClass= function(fn){
	console.assert(fn instanceof Function);
	this.fn	= fn;
}
//////////////////////////////////////////////////////////////////////////////////
//		Modification							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * change global object function bar(){}.setAttr('bar').done();
 * 
 * @param {string} fnName the name of the function 
 */
Function.prototype.setAttr	= function(fnName){
	return FunctionAttr.define(this, fnName)
}

//////////////////////////////////////////////////////////////////////////////////
//		Function Attribute						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * @namespace
 */
var FunctionAttr	= {};

/**
 * Function attribute creator
 * 
 * @return {FunctionAttr.Builder} a FunctionAttr.Builder builder
*/
FunctionAttr.define	= function(originalFn, fnName){
	return new FunctionAttr.Builder(originalFn, fnName)
}

/**
 * Wrap a function between 2 functions
 * 
 * @param {Function} originalFn the original function
 * @param {Function} beforeFn the function to call *before* the original function
 * @param {Function} afterFn the function to call *after* the original function
 * @return {Function} The modified function
*/
FunctionAttr.wrapCall	= function(originalFn, beforeFn, afterFn){
	return function(){
		var stopNow	= false;
		// call beforeFn if needed
		if( beforeFn )	stopNow = beforeFn(originalFn, arguments);
		// forward the call to the original function
		var result	= originalFn.apply(this, arguments);
		// call afterFn if needed
		if( afterFn )	afterFn(originalFn, arguments, result);
		// return the result
		return result;
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Internal class to build the attributes on the funciton
 * 
 * @constructor
 * 
 * @param {Function} originalFn the function on which the attributes are set
 * @param {String}   fnName     optional name of the function - default to 'aFunction'
 */
FunctionAttr.Builder	= function(originalFn, fnName){
	this._currentFn	= originalFn;
	this._fnName	= fnName	|| 'aFunction';
}

/**
 * mark the end of the attributes declaration
 * 
 * @return {Function} The actual function with the attributes
*/
FunctionAttr.Builder.prototype.done	= function(){
	return this._currentFn;
}

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= FunctionAttr;


//////////////////////////////////////////////////////////////////////////////////
//		generic								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * display a message with a timestamp every time the function is used
 * @return {string} message optional message to display
 */
FunctionAttr.Builder.prototype.timestamp	= function(message){
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		console.log(''+ new Date + ': '+this._fnName+' being called');
	}.bind(this));
	return this;	// for chained API
};

/**
 * log a message when the function is call
 * @param  {string} message the message to display
 */
FunctionAttr.Builder.prototype.log		= function(message){
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		console.log(message);
	});
	return this;	// for chained API
};


//////////////////////////////////////////////////////////////////////////////////
//		support state							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * mark the function as deprecated - aka you can use it but it will disapears soon
 * @param  {string} message the optional message to provide
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.deprecated	= function(message){
	var used	= false;
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		if( used )	return;
		used	= true;
		console.warn(message || "Deprecated function "+this._fnName+" called. Please update your code.");
	}.bind(this));
	return this;	// for chained API
}

/**
 * mark the function as obsolete
 * @param  {string} message obsolete message to display
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.obsolete	= function(message){
	var used	= false;
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		if( used )	return;
		used	= true;
		console.assert(false, message || "Obsoleted function "+this._fnName+" called. Please update your code.");
	}.bind(this));
	return this;	// for chained API
}

//////////////////////////////////////////////////////////////////////////////////
//		General hooks								//
//////////////////////////////////////////////////////////////////////////////////

/**
 * hook a function be be caller before the actual function
 * @param  {Function} beforeFn the function to call
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.before	= function(beforeFn){
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, beforeFn, null);
	return this;	// for chained API
};

/**
 * hook a function to be called after the actual function
 * @param  {Function} afterFn the function to be called after
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.after	= function(afterFn){
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, null, afterFn);
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//		Benchmarking							//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Warp the function call in a console.time()
 * 
 * @param  {String} label the label to use for console.time(label)
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.time	= function(label){
	label	= label !== undefined ? label : this._fnName+".time()-"+Math.floor(Math.random()*9999).toString(36);
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		console.time(label)
	}, function(){
		console.timeEnd(label)
	});
	return this;	// for chained API
};

/**
 * Warp the funciton call in console.profile()/.profileEnd()
 * 
 * @param  {String} label label to use for console.profile()
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.profile	= function(label){
	label	= label !== undefined ? label : this._fnName+".profile-"+Math.floor(Math.random()*9999).toString(36);
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		console.profile(label)
	}, function(){
		console.profileEnd(label)
	});
	return this;	// for chained API
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Trigger the debugger when the function is called
 *
 * @param {Function} originalFn the original function
 * @param {Function} [conditionFn] this function should return true, when the breakpoint should be triggered. default to function(){ return true; }
 * @return {FunctionAttr.Builder} for chained API
*/
FunctionAttr.Builder.prototype.breakpoint	= function(fn, conditionFn){
	conditionFn	= conditionFn	|| function(){ return true; };
	this._currentFn	= function(){
		var stopNow	= conditionFn();
		// if stopNow, trigger debugger
		if( stopNow === true )	debugger;
		// forward the call to the original function
		return this._currentFn.apply(this, arguments);
	}.bind(this);
	return this;
}

/**
 * check function type as in ```TypeCheck.fn``` from typecheck.js
 * @param  {Array}    paramsTypes allowed types for the paramter. array with each item is the allowed types for this parameter.
 * @param  {Array}    returnTypes allowed types for the return value
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.typeCheck	= function(paramsTypes, returnTypes){
	this._currentFn	= TypeCheck.fn(this._currentFn, paramsTypes, returnTypes);
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//		.trackUsage()							//
//////////////////////////////////////////////////////////////////////////////////

var Stacktrace	= Stacktrace	|| require('../src/stacktrace.js');

// create the tracker for .trackUsage
FunctionAttr.usageTracker	= new Stacktrace.Tracker();

/**
 * track where this property is used (getter and setter)
 * 
 * @param {String|undefined} trackName	optional name for Stacktrace.Tracker. default to originId
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.trackUsage	= function(trackName){
	var tracker	= FunctionAttr.usageTracker;
	// handle polymorphism
	trackName	= trackName	|| 'FunctionAttr.trackUsage:'+Stacktrace.parse()[1].originId();
	// actually record the usage
	this._currentFn	= FunctionAttr.wrapCall(this._currentFn, function(){
		tracker.record(trackName, 1);
	});
	// for chained API
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//		.private()							//
//////////////////////////////////////////////////////////////////////////////////

var PrivateForJS	= PrivateForJS	|| require('../src/privateforjs.js');

/**
 * Mark this function as private
 * @param  {Function} klass the constructor of the function
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.private	= function(klass){
	// sanity check
	console.assert(klass !== undefined)
	// overload currenFn
	this._currentFn	= PrivateForJS.privateFunction(klass, this_currentFn);
	// for chained API
	return this;
}

/**
 * handle attributes for properties
 * 
 * @namespace
 */
var PropertyAttr	= {};

/**
 * Define a property attribute
 * 
 * @param {Object} baseObject the base object to which the property belong
 * @param {String} property   the name of the property
 * @return {PropertyAttr}	builder for property attributes
 */
PropertyAttr.define	= function(baseObject, property){
	return new PropertyAttr.Builder(baseObject, property);
};

/**
 * Constructor
 * 
 * @param {Object} baseObject the base object to which the property belong
 * @param {String} property   the name of the property
 */
 PropertyAttr.Builder	= function(baseObject, property){
	// sanity check
	console.assert(typeof(baseObject) === 'object');
	console.assert(typeof(property) === 'string');
	// set local values
	this._baseObject= baseObject;
	this._property	= property; 
}

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= PropertyAttr;

//////////////////////////////////////////////////////////////////////////////////
//		.typeCheck()							//
//////////////////////////////////////////////////////////////////////////////////

var TypeCheck	= TypeCheck	|| require('../src/typecheck.js')

/**
 * check if this property is of validTypes
 * @param  {[type]} types valid types in typecheck.js format
 * @return {PropertyAttr.Builder} for chained API
 */
PropertyAttr.Builder.prototype.typeCheck	= function(types){
	TypeCheck.setter(this._baseObject, this._property, types);
	return this;	// for chained API;
}


//////////////////////////////////////////////////////////////////////////////////
//		.trackUsage()							//
//////////////////////////////////////////////////////////////////////////////////

var QGetterSetter	= QGetterSetter	|| require('../src/qgettersetter.js');
var Stacktrace		= Stacktrace	|| require('../src/stacktrace.js');

// create the tracker for .trackUsage
PropertyAttr.usageTracker	= new Stacktrace.Tracker();

/**
 * track where this property is used (getter and setter)
 * @param {String|undefined} trackName	optional name for Stacktrace.Tracker. default to originId
 * @return {PropertyAttr.Builder} for chained API
 */
PropertyAttr.Builder.prototype.trackUsage	= function(trackName){
	var tracker	= PropertyAttr.usageTracker;
	// handle polymorphism
	trackName	= trackName	|| 'PropertyAttr.trackUsage:'+Stacktrace.parse()[1].originId();
	// define getter
	QGetterSetter.defineGetter(this._baseObject, this._property, function(value){
		tracker.record(trackName, 1);
		return value;	// return value unchanged	
	});
	// define setter
	QGetterSetter.defineSetter(this._baseObject, this._property, function(value){
		tracker.record(trackName, 1);
		return value;	// return value unchanged	
	});
	return this;	// for chained API
}

//////////////////////////////////////////////////////////////////////////////////
//		.privateOf()							//
//////////////////////////////////////////////////////////////////////////////////

var PrivateForJS	= PrivateForJS	|| require('../src/privateforjs.js');

/**
 * Mark this property as private
 * @param  {Function} klass the class to which it is private
 * @return {PropertyAttr.Builder} for chained API
 */
PropertyAttr.Builder.prototype.private	= function(klass){
	PrivateForJS.privateProperty(klass, this._baseObject, this._property);
	return this;	// for chained API
};
// allocationtracker-monitor.js in examples/js


/**
 * monitor for allocation tracker. It open another window and display 
 * the AllocationTracker.reportString() in it
 * 
 * typical usage: new AllocationTrackerMonitor().start(); 
 * 
 */
var AllocationTrackerMonitor	= function(){
	this._timerId	= null;	
}

/**
 * destroy the object
 */
AllocationTrackerMonitor.prototype.destroy	= function(){
	this.stop();	
}


/**
 * start monitoring
 */
AllocationTrackerMonitor.prototype.start	= function(){
	// content of the other frame
	var content	= [
		"<!doctype html>",
		"<h1>AllocationTracker.js Reports</h1>",
		"Date: <span id='reportTime'></span>",
		"<pre id='report'></pre>",
		"<script>",
		"	window.addEventListener('message', function(event){",
		"		document.getElementById('reportTime').innerText	= new Date().toString();",
		"		document.getElementById('report').innerText	= event.data;",
		"	},false);",
		"<\/script> "
	].join('\n');
	// build the url for the other frame
	var url = "data:text/html;base64,"+window.btoa(content);

	// open a window and report current allocation
	var myPopup = window.open(url,'newtab');
	setInterval(function(){
		var reportString	= AllocationTracker.reportString();

		myPopup.postMessage(reportString,'*'); //send the message and target URI

		// reset counters every time
		AllocationTracker.reset();
	}, 1000);

}

/**
 * stop monitoring
 */
AllocationTrackerMonitor.prototype.stop		= function(){
	this._timerId	&& clearInterval(this._timerId);
}//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Display current memory usage + garbage collection occurence
 * 
 * heavily based on @mrdoob stats.js
 */
var GcMonitorStatsCollection = function (){
	var container	= document.createElement( 'div' );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var divEl	= document.createElement( 'div' );
	divEl.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
	container.appendChild( divEl );

	var testEl	= document.createElement( 'div' );
	testEl.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	testEl.innerHTML= 'Mem';
	divEl.appendChild( testEl );

	var graphEl	= document.createElement( 'div' );
	graphEl.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	divEl.appendChild( graphEl );

	var currentValues	= [];
	var maxViewableValue	= 2*1024*1024;
	for(var i = 0; i < 74; i++){
		currentValues[i]	= 0;
		var barEl	= document.createElement( 'span' );
		barEl.style.cssText	= 'width:1px;height:30px;float:left;background-color:#131';
		graphEl.appendChild( barEl );
	}

	// get max of currentValues - used for autoscaling
	var cpuMaxCurrentValues	= function(){
		var max	= -Infinity;
		for(var i = 0; i < currentValues.length; i++){
			max	= Math.max(max, currentValues[i]);
		}
		return max;
	};
	// update the graph
	var updateGraph	= function(value, color){
		// update currentValues
		currentValues.shift();
		currentValues.push(value);
		// handle autoscaling
		var max	= cpuMaxCurrentValues();
		if( max > maxViewableValue ){
			maxViewableValue	= max * 1.2;
			reflowGraph();
		}else if( max < 0.5 * maxViewableValue ){
			maxViewableValue	= max * 1.2;
			reflowGraph();			
		}
		// compute the height
		var normValue	= value / maxViewableValue;
		var height	= Math.min(30, 30 - normValue * 30);		
		// display the height
		var childEl	= graphEl.appendChild( graphEl.firstChild );
		childEl.style.height	= height + 'px';
		// change color if needed
		if( color ) childEl.style.backgroundColor	= color;
	};
	// reflow the graph - used for autoscaling
	var reflowGraph	= function(){
		for(var i = 0; i < currentValues.length; i++){
			var value	= currentValues[i];
			// compute the height
			var normValue	= value / maxViewableValue;
			var height	= Math.min(30, 30 - normValue * 30);		
			// display the height
			var childEl	= graphEl.children[i];
			childEl.style.height	= height + 'px';
		}
	};

	var gcMonitor	= new GcMonitor();
	var lastTime	= 0;

	return {
		domElement	: container,
		update		: function(){
			// refresh only 30time per second
			if( Date.now() - lastTime < 1000/60 )	return;
			lastTime	= Date.now()
			// get value and color
			var color	= '#131';
			gcMonitor.check(function(delta, burnRate){
				color	= '#830';
			});	
			var value	= gcMonitor.usedHeapSize();
			// update graph
			updateGraph(value, color);
			// display label
			testEl.textContent = "Mem: " + bytesToSize(value, 2);			
			function bytesToSize( bytes, nFractDigit ){
				var sizes = ['B ', 'KB', 'MB', 'GB', 'TB'];
				if (bytes == 0) return 'n/a';
				nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
				var precision	= Math.pow(10, nFractDigit);
				var i 		= Math.floor(Math.log(bytes) / Math.log(1024));
				return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
			};
		}
	}
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * display how heavily memory is allocated 
 * 
 * heavily based on @mrdoob stats.js
 */
var GcMonitorStatsBurnRate = function (){

	var container	= document.createElement( 'div' );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var divEl	= document.createElement( 'div' );
	divEl.style.cssText	= 'padding:0 0 3px 3px;text-align:left;background-color:#020;';
	container.appendChild( divEl );

	var textEl	= document.createElement( 'div' );
	textEl.innerHTML= 'rate: ';
	textEl.style.cssText	= 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;line-height:15px';
	divEl.appendChild( textEl );

	var graphEl	= document.createElement( 'div' );
	graphEl.style.cssText	= 'position:relative;width:74px;height:30px;background-color:#0f0';
	divEl.appendChild( graphEl );

	var currentValues	= [];
	var maxViewableValue	= 2*1024*1024;
	for(var i = 0; i < 74; i++){
		currentValues[i]	= 0;
		var barEl	= document.createElement( 'span' );
		barEl.style.cssText	= 'width:1px;height:30px;float:left;background-color:#131';
		graphEl.appendChild( barEl );
	}

	// get max of currentValues - used for autoscaling
	var cpuMaxCurrentValues	= function(){
		var max	= -Infinity;
		for(var i = 0; i < currentValues.length; i++){
			max	= Math.max(max, currentValues[i]);
		}
		return max;
	};
	// update the graph
	var updateGraph	= function(value){
		// update currentValues
		currentValues.shift();
		currentValues.push(value);
		// handle autoscaling
		var max	= cpuMaxCurrentValues();
		if( max > maxViewableValue ){
			maxViewableValue	= max * 1.2;
			reflowGraph();
		}else if( max < 0.5*maxViewableValue ){
			maxViewableValue	= max * 1.2;
			reflowGraph();			
		}
		// compute the height
		var normValue	= value / maxViewableValue;
		var height	= Math.min(30, 30 - normValue * 30);		
		// display the height
		var childEl	= graphEl.appendChild( graphEl.firstChild );
		childEl.style.height	= height + 'px';
	};
	// reflow the graph - used for autoscaling
	var reflowGraph	= function(){
		for(var i = 0; i < currentValues.length; i++){
			var value	= currentValues[i];
			// compute the height
			var normValue	= value / maxViewableValue;
			var height	= Math.min(30, 30 - normValue * 30);		
			// display the height
			var childEl	= graphEl.children[i];
			childEl.style.height	= height + 'px';
		}
	};

	var gcMonitor	= new GcMonitor().start(function(){}, 1000/60);
	var lastTime	= 0;
	return {
		domElement	: container,
		update		: function(){
			// refresh only 5time per second
			if( Date.now() - lastTime < 1000/5 )	return;
			lastTime	= Date.now()
 			// get current value
			var value	= gcMonitor.burnRate();
			// update graph
			updateGraph(value);
			// display label
			textEl.textContent = "rate: " + bytesToSize(value, 2);			
			function bytesToSize( bytes, nFractDigit ){
				var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
				if (bytes == 0) return 'n/a';
				nFractDigit	= nFractDigit !== undefined ? nFractDigit : 0;
				var precision	= Math.pow(10, nFractDigit);
				var i 		= Math.floor(Math.log(bytes) / Math.log(1024));
				return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i];
			};
		}
	}
};


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * vuemeter on gc activity - stats.js like 
 * - union of GcMonitorStatsCollection/GcMonitorStatsBurnRate
 */
var GcMonitorStats	= function (){
	// build domElement container
	var container	= document.createElement('div');
	// instanciate GcMonitorStatsBurnRate
	var statsBurnRate	= new GcMonitorStatsBurnRate();
	container.appendChild(statsBurnRate.domElement);
	// instanciate GcMonitorStatsCollection
	var statsCollection	= new GcMonitorStatsCollection();
	container.appendChild(statsCollection.domElement);
	// return domElement and update()
	return {
		domElement	: container,
		update		: function(){
			statsCollection.update();
			statsBurnRate.update();
		}
	};
}

/**
 * dump trackUsage() from globaldetector.js.
 */
GlobalDetector.prototype.usageTrackerCode	= function(){
	// for each foundGlobals
	var foundGlobals	= this.foundGlobals();
	// build the output
	var output	 = '/* Include PropertyAttr.js before. */\n';
	output		+= '/* globalDetector.usageTrackerDump() to dump usage records of all tracked properties */\n';
	// add tracking code for each foundGlobals
	Object.keys(foundGlobals).forEach(function(globalName){
		// take the namespace for global
		var inBrowser 	= typeof(window) !== 'undefined' ? true : false
		var _global	= inBrowser ?  window :  global;
		var globalStr	= inBrowser ? 'window': 'global';		
		// use functionattr.js if it is a function, propertyattr.js otherwise
		var cmd	 = "PropertyAttr.define("+globalStr+", '"+globalName
				+"').trackUsage('"+globalStr+"."+globalName+"');";		
		output	+= cmd+'\n';
	})
	// return the output
	return output;
};

/**
 * display .usageTrackerCode() in a new popup window
 */
GlobalDetector.prototype.usageTrackerCodeWindow	= function(){
	var codeStr	= this.usageTrackerCode();
	var url		= 'data:text/plain,' + codeStr;
	window.open(url);
};

/**
 * display .usageTrackerCode() in the javascript console
 */
GlobalDetector.prototype.usageTrackerCodeConsole	= function(){
	var codeStr	= this.usageTrackerCode();
	console.log(codeStr)
};

/**
 * dump the usage
 * 
 * @see Stacktrace.Tracker.reportString
 */
GlobalDetector.prototype.usageTrackerDump	= function(){
	// forward to PropertyAttr.usageTracker.dump
	return PropertyAttr.usageTracker.dump.apply(PropertyAttr.usageTracker, arguments)
}/**
 * Implement a Object Pool
 * 
 * - only track the free objects
 * - TODO implement one which track used object too
 *   - which allocation is never released, from where
 * 
 * @class
 * @param {Function} klass the constructor of the class used in the pool
 */
var ObjectPool = function(klass){
	var _pool	= new Array();
	return {
		reset	: function()	{ _pool = [];		},
		put	: function(obj)	{ _pool.push(obj);	},
		get	: function(){			
			if( _pool.length === 0 )	this.grow();
			return _pool.pop();
		},
		grow	: function(){
			_pool.push(new klass());
		}
	};
};

/**
 * mixin an ObjectPool into a class
 * @param  {Function} klass constructor function of the class
 */
ObjectPool.mixin	= function(klass){
	var pool	= new ObjectPool(klass)
	// ### possible API
	// .create/.destroy
	// .acquire/.release
	// .create/.release
	// 
	// ### events ? onAcquire/onRelease
	// * with microevent.js
	// * where did you get it ?
	// * where have i seen this ?
	// * https://github.com/playcraft/gamecore.js/blob/master/src/pooled.js#L483

	klass.create	= function(){
		var obj	= pool.get();
		klass.prototype.constructor.apply(obj, arguments)
		return obj;
	}
	klass.prototype.release	= function(){
		pool.put(this);
	}
};

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= ObjectPool;
var PrivateForJS	= PrivateForJS	|| require('../../src/privateforjs.js');

/**
 * Privatize all property/function which start with a _
 * 
 * @param  {Function} klass    constructor for the class
 * @param  {object} baseObject the instance of the object
 */
PrivateForJS.privatize	= function(klass, baseObject){
	console.assert( baseObject.constructor == klass );
	console.assert( baseObject instanceof klass );

// TODO what about the .prototype

	for(var property in baseObject){
		var value	= baseObject[property]
		if( property[0] !== '_' )		continue;
		if(!baseObject.hasOwnProperty(property))continue;		
		PrivateForJS.privateProperty(klass, baseObject, property);
	}
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var FunctionAttr	= FunctionAttr	|| require('../../src/functionattr.js');

/**
 * plugin for functionattr.js
 * 
 * @param  {Function} klass    constructor for the class
 * @return {FunctionAttr.Builder} for chained API
 */
FunctionAttr.Builder.prototype.privatize	= function(klass){
	var _this	= this;
	this._currentFn	= function(){
		// call the function
		var value	= _this._currentFn.apply(this, arguments);
		// privatize
		PrivateForJS.privatize(klass, this);
		// actually return the value
		return value; 
	};	
	return this;	// for chained API	
};
var Stacktrace		= Stacktrace	|| require('../../src/stacktrace.js');
var QGetterSetter	= QGetterSetter	|| require('../../src/qgettersetter.js');

(function(){
	var _global	= typeof(window) === 'undefined' ? global : window;
	
	/**
	 * Same as __LINE__ in C
	*/
	QGetterSetter.defineGetter(_global, '__LINE__', function(){
		var stacktrace	= Stacktrace.parse();
		var stackFrame	= stacktrace[2];
		return stackFrame.line
	});

	/**
	 * Same as __LINE__ in C
	*/
	QGetterSetter.defineGetter(_global, '__FILE__', function(){
		var stacktrace	= Stacktrace.parse();
		var stackFrame	= stacktrace[2];
		return stackFrame.basename();
	});

	/**
	 * Same as __FUNCTION__ in C
	*/
	QGetterSetter.defineGetter(_global, '__FUNCTION__', function(){
		var stacktrace	= Stacktrace.parse();
		var stackFrame	= stacktrace[2];
		return stackFrame.fct;
	});
})();
