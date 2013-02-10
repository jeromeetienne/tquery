tQuery.World.registerInstance('addCannonjs', function(){
	var world	= this;

	// physics world init
	var physicsWorld	= new CANNON.World();
	physicsWorld.broadphase	= new CANNON.NaiveBroadphase();

	// store it in world
	tQuery.data(world.tScene(), 'cannonjsWorld', physicsWorld, true);

	// Step the physics physicsWorld	
	// world.loop().hook(function(delta, now){
	// 	physicsWorld.step(delta);
	// });

	var period	= 1/120;
	setInterval(function(){
        	physicsWorld.step(period);		
	}, period*1000)
	
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

tQuery.World.registerInstance('removeCannonjs', function(){
	console.assert(false, 'not yet implemented')
})
