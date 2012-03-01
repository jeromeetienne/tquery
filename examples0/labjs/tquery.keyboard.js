$LAB
.script("../../build/tquery-bundle.js")
.script("../../vendor/threex/THREEx.KeyboardState.js")
.wait(function(){
	console.log("in tquery.keyboard")
	var instance	= null;
	tQuery.register('keyboard', function(){
		if( !instance )	instance = new THREEx.KeyboardState();
		return instance;
	});	
});
