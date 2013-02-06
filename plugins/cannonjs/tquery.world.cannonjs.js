tQuery.World.registerInstance('enableCannonjs', function(){
	var world	= this;

	// physics world init
	var physicsWorld	= new CANNON.World();
	physicsWorld.broadphase	= new CANNON.NaiveBroadphase();

	// store it in world
	tQuery.data(world.tScene(), 'cannonjsWorld', physicsWorld, true);

	// Step the physics physicsWorld
	var callback	= world.loop().hook(function(delta, now){
        	physicsWorld.step(delta);
	});
	tQuery.data(world.tScene(), 'cannonjsCb', callback, true);
	
	return this;	// for chained API
})

tQuery.World.registerInstance('cannonjsWorld', function(){
	console.assert( this.hasCannonjs() );
	var world	= this;
	var physicsWorld= tQuery.data(world.tScene(), 'cannonjsWorld');
	return physicsWorld;
});

tQuery.World.registerInstance('hasCannonjs', function(){
	var world	= this;
	return tQuery.hasData(world.tScene(), 'cannonjsWorld');
})

tQuery.World.registerInstance('disableCannonjs', function(){
	var world	= this;
	// unhook callback		
	var callback	= tQuery.data(world.tScene(), 'cannonjsCb');
	world.loop().unhook(callback);
	// clean up data registered in world.tScene()
	tQuery.removeData(world.tScene(), 'cannonjsWorld', true);
	tQuery.removeData(world.tScene(), 'cannonjsCb', true);
	// for chained API
	return this;
})
