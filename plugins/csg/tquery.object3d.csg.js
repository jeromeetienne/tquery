tQuery.Object3D.registerInstance('csg', function(operation, tqObject){
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
tQuery.Object3D.registerInstance('union'	, function(tqObject){ return this.csg('union'	 , tqObject);	});
tQuery.Object3D.registerInstance('subtract'	, function(tqObject){ return this.csg('subtract' , tqObject);	});
tQuery.Object3D.registerInstance('intersect'	, function(tqObject){ return this.csg('intersect', tqObject);	});
