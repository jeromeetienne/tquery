define(['examples/csg/tquery.geometry.csg'], function(){
	tQuery.Object3D.register('csg', function(operation, tqObject){
		var objects3d	= [];
		this.each(function(object3d){
			var tqGeometry	= tQuery(object3d).geometry().csg(operation, tqObject.geometry());
			var geometry	= tqGeometry.get(0);
	
			var material	= new THREE.MeshNormalMaterial();
			var mesh	= new THREE.Mesh(geometry, material);
			objects3d.push(mesh);
		});
		return new tQuery.Object3D(objects3d).back(this);
	});
	
	// some shortcut
	tQuery.Object3D.register('union'	, function(tqObject){ return this.csg('union'	 , tqObject);	});
	tQuery.Object3D.register('subtract'	, function(tqObject){ return this.csg('subtract' , tqObject);	});
	tQuery.Object3D.register('intersect'	, function(tqObject){ return this.csg('intersect', tqObject);	});
});