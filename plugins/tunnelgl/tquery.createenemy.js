tQuery.registerStatic('createEnemy', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {		
		id		: undefined,
		loop		: tQuery.world.loop(),
		getSpeedZ	: function(){
			return Math.random()*0.005+0.1
		}
	});
	console.assert(opts.id, "invalid parameter");

	var radius	= 0.45;
	var speedZ	= opts.getSpeedZ();
	
	var material	= new THREE.MeshNormalMaterial();
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0x88AAFF,
		map	: waterTexture
	});
	var geometry	= new THREE.SphereGeometry(0.5, 32, 16)
	var object	= tQuery(new THREE.Mesh(geometry, material));
	object.id(opts.id).addTo(tQuery.world);
	
	
	var angle	= Math.random() * Math.PI * 2;

	object.geometry()
		.zoom(0.2)
		.rotateZ(angle + Math.PI/2);

	var positionX	= Math.cos(angle) * radius;
	var positionY	= Math.sin(angle) * radius;
	var positionZ	= -(Math.random()*6+0.02);
	object.position(positionX, positionY, positionZ)

	opts.loop.hook(function(deltaTime, present){
		var tMesh	= object.get(0)

		tMesh.position.z	+= speedZ;		
		if( tMesh.position.z > 11 )	onDeath();

		var origin	= {
			x	: Math.cos(angle) * radius,
			y	: Math.sin(angle) * radius,
			z	: 0
		};
		vertexTransform(origin, object.get(0).position, present)
	});
	

	function onDeath(){
		speedZ	= opts.getSpeedZ();
		
		var angle	= Math.random() * Math.PI * 2;	
		var positionX	= Math.cos(angle) * radius;
		var positionY	= Math.sin(angle) * radius;
		var positionZ	= 0;
		object.position(positionX, positionY, positionZ)		
	}
});