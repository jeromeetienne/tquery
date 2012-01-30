describe('tQuery', function(){
	describe('minimal page', function(){

		it('should not crash on creation', function(){
			var container	= document.getElementById('container');
			var scene	= tQuery.createScene().appendTo(container);
			console.assert(scene instanceof tQuery.Scene);
			var mesh	= tQuery.createTorus().addTo(scene);
			var loop	= tQuery.createLoop(scene).start();
		})
	});
});
