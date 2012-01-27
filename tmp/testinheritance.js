var tempFn = function() {};
tempFn.prototype = parentClass.prototype;
subClass.prototype = new tempFn();
subClass.prototype.constructor = subClass;
subClass.parent		= parentClass.prototype;


// inherit from tQuery.Node methods


(function(childClass, parentClass){
	var tempFn		= function() {};
	tempFn.prototype	= parentClass.prototype;
	childClass.prototype	= new tempFn();

	childClass.prototype.parent	= parentClass.prototype;
	childClass.prototype.constructor= childClass;	
})(tQuery.Material, tQuery.Node)

