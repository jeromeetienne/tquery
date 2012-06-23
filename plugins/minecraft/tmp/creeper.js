var Creeper = (function (global) {
	'use strict';
	
	function getMaterial (img, trans) {
		var material = new THREE.MeshBasicMaterial({
			map: new THREE.Texture(
				img,
				new THREE.UVMapping(),
				THREE.ClampToEdgeWrapping,
				THREE.ClampToEdgeWrapping,
				THREE.NearestFilter,
				THREE.NearestFilter,
				(trans? THREE.RGBAFormat : THREE.RGBFormat)
			),
			transparent: !!trans
		});
		material.map.needsUpdate = true;
		return material;
	};
	
	function uvmap (geometry, face, x, y, w, h, rotateBy) {
		if(!rotateBy) rotateBy = 0;
		var uvs = geometry.faceVertexUvs[0][face];
		var tileU = x;
		var tileV = y;
		
		uvs[ (0 + rotateBy) % 4 ].u = tileU * tileUvWidth;
		uvs[ (0 + rotateBy) % 4 ].v = tileV * tileUvHeight;
		uvs[ (1 + rotateBy) % 4 ].u = tileU * tileUvWidth;
		uvs[ (1 + rotateBy) % 4 ].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[ (2 + rotateBy) % 4 ].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[ (2 + rotateBy) % 4 ].v = tileV * tileUvHeight + h * tileUvHeight;
		uvs[ (3 + rotateBy) % 4 ].u = tileU * tileUvWidth + w * tileUvWidth;
		uvs[ (3 + rotateBy) % 4 ].v = tileV * tileUvHeight;
	};
	
	var skincanvas = global.document.createElement('canvas');
	skincanvas.width = 64;
	skincanvas.height = 32;
	var skinc = skincanvas.getContext('2d');
	var material = getMaterial(skincanvas, false);
	
	var skin = new Image();
	skin.onload = function () {
		skinc.clearRect(0, 0, skincanvas.width, skincanvas.height);
		skinc.drawImage(skin, 0, 0);
		material.map.needsUpdate = true;
	};
	
	skin.src = "creeper.png";
	
	var tileUvWidth = 1/64;
	var tileUvHeight = 1/32;
	
	return function () {
		
		// Creeper model
		
		var leftleggeo = new THREE.CubeGeometry(4, 6, 4);
		uvmap(leftleggeo, 0, 8, 20, -4, 6);
		uvmap(leftleggeo, 1, 16, 20, -4, 6);
		uvmap(leftleggeo, 2, 4, 16, 4, 4, 3);
		uvmap(leftleggeo, 3, 8, 20, 4, -4, 1);
		uvmap(leftleggeo, 4, 12, 20, -4, 6);
		uvmap(leftleggeo, 5, 4, 20, -4, 6);
		var rightleggeo = new THREE.CubeGeometry(4, 6, 4);
		uvmap(rightleggeo, 0, 4, 20, 4, 6);
		uvmap(rightleggeo, 1, 12, 20, 4, 6);
		uvmap(rightleggeo, 2, 8, 16, -4, 4, 3);
		uvmap(rightleggeo, 3, 12, 20, -4, -4, 1);
		uvmap(rightleggeo, 4, 0, 20, 4, 6);
		uvmap(rightleggeo, 5, 8, 20, 4, 6);
		
		var bodygeo = new THREE.CubeGeometry(4, 12, 8);
		var headgeo = new THREE.CubeGeometry(8, 8, 8);
		
		// Legs
		var legs = new THREE.Object3D();
		legs.position.y = 3;
		var leftfrontleg = new THREE.Object3D();
		var leftbackleg = new THREE.Object3D();
		var rightfrontleg = new THREE.Object3D();
		var rightbackleg = new THREE.Object3D();
		
		
		var leftfrontlegmesh = new THREE.Mesh(leftleggeo, material);
		var leftbacklegmesh = new THREE.Mesh(leftleggeo, material);
		leftfrontlegmesh.position.x = 2;
		leftfrontlegmesh.position.y = -3;
		leftfrontlegmesh.position.z = -2;
		leftbacklegmesh.position.x = -2;
		leftbacklegmesh.position.y = -3;
		leftbacklegmesh.position.z = -2;
		
		leftfrontleg.add(leftfrontlegmesh);
		leftfrontleg.position.x = 2;
		leftfrontleg.position.y = 3;
		leftbackleg.add(leftbacklegmesh);
		leftbackleg.position.x = -2;
		leftbackleg.position.y = 3;
		
		legs.add(leftfrontleg);
		legs.add(leftbackleg);
		
		var rightfrontlegmesh = new THREE.Mesh(rightleggeo, material);
		var rightbacklegmesh = new THREE.Mesh(rightleggeo, material);
		rightfrontlegmesh.position.x = 2;
		rightfrontlegmesh.position.y = -3;
		rightfrontlegmesh.position.z = 2;
		rightbacklegmesh.position.x = -2;
		rightbacklegmesh.position.y = -3;
		rightbacklegmesh.position.z = 2;
	
		rightfrontleg.add(rightfrontlegmesh);
		rightfrontleg.position.x = 2;
		rightfrontleg.position.y = 3;
		rightbackleg.add(rightbacklegmesh);
		rightbackleg.position.x = -2;
		rightbackleg.position.y = 3;
		
		legs.add(rightfrontleg);
		legs.add(rightbackleg);
		
		leftfrontleg.rotation.z = -Math.PI/4;
		
		
		// Body
		var bodymesh = new THREE.Mesh(bodygeo, material);
		bodymesh.position.y = 12;
		uvmap(bodygeo, 0, 20, 20, 8, 12);
		uvmap(bodygeo, 1, 32, 20, 8, 12);
		uvmap(bodygeo, 2, 20, 16, 8, 4, 1);
		uvmap(bodygeo, 3, 28, 16, 8, 4, 3);
		uvmap(bodygeo, 4, 16, 20, 4, 12);
		uvmap(bodygeo, 5, 28, 20, 4, 12);
		
		
		//Head
		var headmesh = new THREE.Mesh(headgeo, material);
		headmesh.position.y = 2;
		uvmap(headgeo, 0, 8, 8, 8, 8);
		uvmap(headgeo, 1, 24, 8, 8, 8);
		
		uvmap(headgeo, 2, 8, 0, 8, 8, 1);
		uvmap(headgeo, 3, 16, 0, 8, 8, 3);
	
		uvmap(headgeo, 4, 0, 8, 8, 8);
		uvmap(headgeo, 5, 16, 8, 8, 8);
		
		var headgroup = new THREE.Object3D();
		headgroup.position.y = 20;
		headgroup.add(headmesh);
		
		var creeperModel = new THREE.Object3D();
		
		creeperModel.add(legs);
		creeperModel.add(bodymesh);
		creeperModel.add(headgroup);
		
		var creeperGroup = new THREE.Object3D();
		
		creeperGroup.add(creeperModel);
		
		this.model = creeperGroup;
		this.legs = {
			leftfront: leftfrontleg,
			leftback: leftbackleg,
			rightfront: rightfrontleg,
			rightback: rightbackleg,
		};
		this.head = headgroup;
	};
}(window));
