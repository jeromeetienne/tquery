tQuery.Mesh.registerInstance('csg', function(operation, tqObject){
	var objects3d	= [];
	this.each(function(object3d){
		var tqGeometry	= tQuery(object3d).geometry().csg(operation, tqObject.geometry());
		var geometry	= tqGeometry.get(0);

		var material	= new THREE.MeshNormalMaterial();
		var mesh	= new THREE.Mesh(geometry, material);
		objects3d.push(mesh);
	});
	return new tQuery.Mesh(objects3d).back(this);
});

// some shortcut
tQuery.Mesh.registerInstance('union'	, function(tqObject){ return this.csg('union'	 , tqObject);	});
tQuery.Mesh.registerInstance('subtract'	, function(tqObject){ return this.csg('subtract' , tqObject);	});
tQuery.Mesh.registerInstance('intersect', function(tqObject){ return this.csg('intersect', tqObject);	});
