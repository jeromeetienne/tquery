tQuery.World.registerInstance('shadowMapEnabled', function(value){
	this.tRenderer().shadowMapEnabled	= value;
	return this;
});

tQuery.World.registerInstance('shadowMapSoft', function(value){
	this.tRenderer().shadowMapSoft	= value;
	return this;
});

tQuery.World.registerInstance('shadowMapDebug', function(value){
	this.tRenderer().shadowMapSoft	= value;
	return this;
});

tQuery.World.registerInstance('shadowMapCascade', function(value){
	this.tRenderer().shadowMapCascade	= value;
	return this;
});