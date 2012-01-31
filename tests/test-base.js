describe('tQuery', function(){
	describe('minimal page', function(){

		it('should support webgl', function(){
			var scene	= tQuery.createScene();
			console.assert(scene._hasWebGL === true);
			scene.destroy();
		});

		it('should not crash on creation', function(done){
			var container	= document.getElementById('container');
			var scene	= tQuery.createScene().appendTo(container);
			var mesh	= tQuery.createTorus().addTo(scene);
			var loop	= tQuery.createLoop(scene).start();
			setTimeout(function(){
				scene.destroy();
				loop.destroy();
				done();
			}, 1000);
		});

	});
});
