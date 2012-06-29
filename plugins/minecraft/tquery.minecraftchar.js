/**
 * original demo - http://djazz.mine.nu/lab/minecraft_items/
 * http://danielmcgraw.com/2010/10/06/How-To-Skin-Your-Minecraft-Character/
 * http://www.minecraftskins.com/
 * http://www.minecraftskins.info/
 * http://www.minecraftwiki.net/wiki/Anvil_file_format
*/
tQuery.register('MinecraftChar', function(opts){
	opts	= tQuery.extend(opts, {
		skinUrl	: "images/char.png"
	});
	/**
	 * Could be replace by a CubeGeometry but would require to change the whole indexing
	 * not now.
	*/
	function cubeFromPlanes(size, material) {
		var cube	= new THREE.Object3D();
		var meshes	= [];
		for( var i=0; i < 6; i++ ){
			var geometry	= new THREE.PlaneGeometry(size, size);
			var mesh	= new THREE.Mesh(geometry, material);
			mesh.doubleSided= true;
			//mesh.visible	= false
			cube.add(mesh);
			meshes.push(mesh);
		}
		// Front
		meshes[0].rotation.x	=  Math.PI/2;
		meshes[0].position.z	=  size/2;

		// Back
		meshes[1].rotation.x	=  Math.PI/2;
		meshes[1].rotation.z	=  Math.PI;
		meshes[1].position.z	= -size/2;

		// Top
		meshes[1].rotation.y	=  Math.PI/2;
		meshes[2].position.y	=  size/2;

		// Bottom
		meshes[3].rotation.y	= -Math.PI/2;
		meshes[3].rotation.z	=  Math.PI;
		meshes[3].position.y	= -size/2;

		// Left
		meshes[4].rotation.x	=  Math.PI/2;
		meshes[4].rotation.z	=  Math.PI/2;
		meshes[4].position.x	= -size/2;

		// Right
		meshes[5].rotation.x	= -Math.PI/2;
		meshes[5].rotation.y	=  Math.PI;
		meshes[5].rotation.z	=  Math.PI/2;
		meshes[5].position.x	=  size/2;

		return cube;
	};
	function getMaterial(image, transparent) {
		var texture		= new THREE.Texture(image);
		texture.magFilter	= THREE.NearestFilter;
		texture.minFilter	= THREE.NearestFilter;
		texture.format		= transparent ? THREE.RGBAFormat : THREE.RGBFormat;
		texture.needsUpdate	= true;
		var material	= new THREE.MeshBasicMaterial({
			map		: texture,
			transparent	: transparent ? true : false
		});
		return material;
	}
	function uvmap (geometry, face, x, y, w, h, rotateBy) {
		if( !rotateBy )	rotateBy = 0;
		var uvs		= geometry.faceVertexUvs[0][face];
		var tileU	= x;
		var tileV	= y;
		
		uvs[ (0 + rotateBy) % 4 ].u = tileU * tileUvW;
		uvs[ (0 + rotateBy) % 4 ].v = tileV * tileUvH;
		uvs[ (1 + rotateBy) % 4 ].u = tileU * tileUvW;
		uvs[ (1 + rotateBy) % 4 ].v = tileV * tileUvH	+ h * tileUvH;
		uvs[ (2 + rotateBy) % 4 ].u = tileU * tileUvW	+ w * tileUvW;
		uvs[ (2 + rotateBy) % 4 ].v = tileV * tileUvH	+ h * tileUvH;
		uvs[ (3 + rotateBy) % 4 ].u = tileU * tileUvW	+ w * tileUvW;
		uvs[ (3 + rotateBy) % 4 ].v = tileV * tileUvH;
	};

	var canvas	= document.createElement('canvas');
	canvas.width	= 64;
	canvas.height	= 32;

	var context	= canvas.getContext('2d');
	this._context	= context;

	var material	= getMaterial(canvas, false);
	var materialTrans= getMaterial(canvas, true);

	this._material		= material;
	this._materialTrans	= materialTrans;

	// Player model
	var playerModel	= tQuery.createObject3D();
	
	
	var tileUvW	= 1/canvas.width;
	var tileUvH	= 1/canvas.height;
	
	var headgroup	= new THREE.Object3D();
	var upperBody	= new THREE.Object3D();

	////////////////////////////////////////////////////////////////////////
	// Left leg
	var legLgeo	= new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		legLgeo.vertices[i].y -= 6;
	}
	var legL	= new THREE.Mesh(legLgeo, material);
	tQuery(legL).geometry().rotateY(-Math.PI/2)
	legL.position.x =  2;
	legL.position.y = -6;
	uvmap(legLgeo, 0,  8, 20, -4, 12);
	uvmap(legLgeo, 1, 16, 20, -4, 12);
	uvmap(legLgeo, 2,  4, 16,  4,  4, 3);
	uvmap(legLgeo, 3,  8, 20,  4, -4, 1);
	uvmap(legLgeo, 4, 12, 20, -4, 12);
	uvmap(legLgeo, 5,  4, 20, -4, 12);
	playerModel.add(legL)

	
	////////////////////////////////////////////////////////////////////////
	// Right leg
	var legRgeo	= new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		legRgeo.vertices[i].y -= 6;
	}
	var legR	= new THREE.Mesh(legRgeo, material);
	tQuery(legR).geometry().rotateY(-Math.PI/2)
	legR.name	= "legR";
	legR.position.x = -2;
	legR.position.y = -6;
	uvmap(legRgeo, 0,  4, 20,  4, 12);
	uvmap(legRgeo, 1, 12, 20,  4, 12);
	uvmap(legRgeo, 2,  8, 16, -4,  4, 3);
	uvmap(legRgeo, 3, 12, 20, -4, -4, 1);
	uvmap(legRgeo, 4,  0, 20,  4, 12);
	uvmap(legRgeo, 5,  8, 20,  4, 12);
	playerModel.add(legR)


	////////////////////////////////////////////////////////////////////////
	var upperBody	= tQuery.createObject3D();
	upperBody.name	= "upperBody";
	playerModel.add(upperBody)


	////////////////////////////////////////////////////////////////////////
	// Body
	var bodygeo	= new THREE.CubeGeometry(4, 12, 8);
	var bodymesh	= new THREE.Mesh(bodygeo, material);
	tQuery(bodymesh).geometry().rotateY(-Math.PI/2)
	bodymesh.name	= "body";
	uvmap(bodygeo, 0, 20, 20, 8, 12);
	uvmap(bodygeo, 1, 32, 20, 8, 12);
	uvmap(bodygeo, 2, 20, 16, 8, 4, 1);
	uvmap(bodygeo, 3, 28, 16, 8, 4, 3);
	uvmap(bodygeo, 4, 16, 20, 4, 12);
	uvmap(bodygeo, 5, 28, 20, 4, 12);
	upperBody.add(bodymesh);
	
	
	////////////////////////////////////////////////////////////////////////
	// Left arm
	var armLgeo	= new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		armLgeo.vertices[i].y -= 4;
	}
	var armL	= new THREE.Mesh(armLgeo, material);
	tQuery(armL).geometry().rotateY(-Math.PI/2)
	armL.name	= "armL"
	armL.position.x = 6;
	armL.position.y = 4;
	armL.rotation.z = Math.PI/32;
	uvmap(armLgeo, 0, 48, 20, -4, 12);
	uvmap(armLgeo, 1, 56, 20, -4, 12);
	uvmap(armLgeo, 2, 48, 16, -4,  4, 1);
	uvmap(armLgeo, 3, 52, 16, -4,  4, 3);
	uvmap(armLgeo, 4, 52, 20, -4, 12);
	uvmap(armLgeo, 5, 44, 20, -4, 12);
	upperBody.add(armL);
	
	////////////////////////////////////////////////////////////////////////
	// Right arm
	var armRgeo	= new THREE.CubeGeometry(4, 12, 4);
	for(var i=0; i < 8; i+=1) {
		armRgeo.vertices[i].y -= 4;
	}
	var armR 	= new THREE.Mesh(armRgeo, material);
	tQuery(armR).geometry().rotateY(-Math.PI/2)
	armR.name	= "armR"
	armR.position.x = -6;
	armR.position.y =  4;
	armR.rotation.z = -Math.PI/32;
	uvmap(armRgeo, 0, 44, 20, 4, 12);
	uvmap(armRgeo, 1, 52, 20, 4, 12);
	uvmap(armRgeo, 2, 44, 16, 4, 4, 1);
	uvmap(armRgeo, 3, 48, 16, 4, 4, 3);
	uvmap(armRgeo, 4, 40, 20, 4, 12);
	uvmap(armRgeo, 5, 48, 20, 4, 12);
	upperBody.add(armR);

	////////////////////////////////////////////////////////////////////////
	// head group
	var headgroup	= new THREE.Object3D();
	upperBody.add(headgroup)
	headgroup.position.y = 8;

	// Head
	var headgeo	= new THREE.CubeGeometry(8, 8, 8);
	var headmesh	= new THREE.Mesh(headgeo, material);
	tQuery(headmesh).geometry().rotateY(-Math.PI/2)
	headmesh.name	= "head";
	headmesh.position.y = 2;
	uvmap(headgeo, 0,  8, 8, 8, 8);
	uvmap(headgeo, 1, 24, 8, 8, 8);	
	uvmap(headgeo, 2,  8, 0, 8, 8, 1);
	uvmap(headgeo, 3, 16, 0, 8, 8, 3);
	uvmap(headgeo, 4,  0, 8, 8, 8);
	uvmap(headgeo, 5, 16, 8, 8, 8);
	headgroup.add(headmesh);

	// Helmet	
	var helmet	= cubeFromPlanes(9, materialTrans);
//tQuery(helmet).geometry().rotateY(-Math.PI/2)
	helmet.name	= "helmet";
	helmet.position.y = 2;
	uvmap(helmet.children[0].geometry, 0, 32+ 8, 8, 8, 8);
	uvmap(helmet.children[1].geometry, 0, 32+24, 8, 8, 8);
	uvmap(helmet.children[2].geometry, 0, 32+ 8, 0, 8, 8, 1);
	uvmap(helmet.children[3].geometry, 0, 32+16, 0, 8, 8, 3);
	uvmap(helmet.children[4].geometry, 0, 32+ 0, 8, 8, 8);
	uvmap(helmet.children[5].geometry, 0, 32+16, 8, 8, 8);
	headgroup.add(helmet);

	// earL and earR	
	var ears	= new THREE.Object3D();
	var eargeo	= new THREE.CubeGeometry(1, (9/8)*6, (9/8)*6);
	var earL	= new THREE.Mesh(eargeo, material);
	tQuery(earL).geometry().rotateY(-Math.PI/2)
	earL.name	= "earL";
	var earR	= new THREE.Mesh(eargeo, material);
	tQuery(earR).geometry().rotateY(-Math.PI/2)
	earR.name	= "earR";
	earL.position.x	= -2-(9/8)*5;
	earR.position.x	= -2-(9/8)*5;
	earL.position.z	=  -(9/8)*5;
	earR.position.z	=   (9/8)*5;
	uvmap(eargeo, 0, 25, 1, 6, 6);		// Front side
	uvmap(eargeo, 1, 32, 1, 6, 6);		// Back side
	uvmap(eargeo, 2, 25, 0, 6, 1, 1);	// Top edge
	uvmap(eargeo, 3, 31, 0, 6, 1, 1);	// Bottom edge
	uvmap(eargeo, 4, 24, 1, 1, 6);		// Left edge
	uvmap(eargeo, 5, 31, 1, 1, 6);		// Right edge
	ears.add(earL);
	ears.add(earR);
	earL.visible = earR.visible = false;
	headgroup.add(ears);

	//////////////////////////////////////////////////////////////////////////
	//		load the skin						//
	//////////////////////////////////////////////////////////////////////////
	this.loadSkin(opts.skinUrl);

	// scale down the whole player at geometry level
	tQuery('mesh', playerModel).geometry().scaleBy(1/35)
	playerModel.traverseHierarchy(function(object3d){
		object3d.position.multiplyScalar(1/35)
	});


	// export public variable
	this.model	= playerModel;
	this.parts	= {
		headGroup	: headgroup,
		legL		: legL,
		legR		: legR,
		armR		: armR,
		armL		: armL
	};
});

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.MinecraftChar);

/**
 * Load a skin
 *
 * @param {string} url the url of the skin image
*/
tQuery.MinecraftChar.prototype.loadSkin	= function(url){
	var canvas	= this._context.canvas;
	var context	= this._context;
	
	var image	= new Image();
	image.onload	= function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(image, 0, 0);

		this._material.map.needsUpdate		= true;
		this._materialTrans.map.needsUpdate	= true;
	}.bind(this);
	image.src = url;
	return this;	// for chained API
}
