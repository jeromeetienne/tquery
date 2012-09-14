tQuery.registerStatic('createMinecraftChar', function(opts){
	return new tQuery.MinecraftChar(opts);
});

/**
 * original demo - http://djazz.mine.nu/lab/minecraft_items/
 * http://danielmcgraw.com/2010/10/06/How-To-Skin-Your-Minecraft-Character/
 * http://www.minecraftskins.com/
 * http://www.minecraftskins.info/
 * http://www.minecraftwiki.net/wiki/Anvil_file_format
 * 
 * http://www.minecraftwiki.net/wiki/File:Skintemplate.png
 * http://www.minershoes.com/
*/
tQuery.registerStatic('MinecraftChar', function(opts){
	opts	= tQuery.extend(opts, {
		skinUrl	: tQuery.MinecraftChar.baseUrl + "examples/images/char.png"
	});
	
	var tTexture	= THREE.ImageUtils.loadTexture( opts.skinUrl );
	tTexture.magFilter	= THREE.NearestFilter;
	tTexture.minFilter	= THREE.NearestFilter;
	this._tTexture	= tTexture

	var tMaterial	= new THREE.MeshBasicMaterial({
		map	: tTexture
	});
	var tMaterialt	= new THREE.MeshBasicMaterial({
		map		: tTexture,
		transparent	: true,
		side		: THREE.DoubleSide
	});
	//tMaterial.overdraw	= true;

	//////////////////////////////////////////////////////////////////////////
	// define size constant
	var sizes	= {};
	sizes.charH	= 1;
	sizes.pixRatio	= 1/32;

	sizes.headH	= 8  * sizes.pixRatio;
	sizes.headW	= 8  * sizes.pixRatio;
	sizes.headD	= 8  * sizes.pixRatio;

	sizes.helmetH	= 9  * sizes.pixRatio;
	sizes.helmetW	= 9  * sizes.pixRatio;
	sizes.helmetD	= 9  * sizes.pixRatio;

	sizes.bodyH	= 12 * sizes.pixRatio;
	sizes.bodyW	=  8 * sizes.pixRatio;
	sizes.bodyD	=  4 * sizes.pixRatio;

	sizes.legH	= 12 * sizes.pixRatio;
	sizes.legW	=  4 * sizes.pixRatio;
	sizes.legD	=  4 * sizes.pixRatio;

	sizes.armH	= 12 * sizes.pixRatio;
	sizes.armW	=  4 * sizes.pixRatio;
	sizes.armD	=  4 * sizes.pixRatio;


	// build model core hierachy
	// - origin between 2 feet
	// - height of full character is 1
	var model	= {}
	model.root	= tQuery.createObject3D();
	model.headGroup	= tQuery.createObject3D().addTo(model.root)
				.translateY(sizes.charH - sizes.headH);
	

	// visualize the texture - good for debug
	if( false ){
		tQuery.createPlane(64/32, 32/32, tMaterial).addTo(model.root)
			.translateX(1.5)
	}


	// build model.head
	model.head	= tQuery.createCube(sizes.headW, sizes.headH, sizes.headD, tMaterial)
				.addTo(model.headGroup)
				.geometry()
					.translateY(sizes.headH/2)
					.back()
	var tGeometry	= model.head.geometry().get(0);
	mapUv(tGeometry, 0, 16, 24, 24, 16)	// left
	mapUv(tGeometry, 1,  0, 24,  8, 16)	// right
	mapUv(tGeometry, 2,  8, 32, 16, 24)	// top
	mapUv(tGeometry, 3, 16, 32, 24, 24)	// bottom
	mapUv(tGeometry, 4,  8, 24, 16, 16)	// front
	mapUv(tGeometry, 5, 24, 24, 32, 16)	// back
	
	// // build model.helmet
	model.helmet	= tQuery.createCube(sizes.helmetH, sizes.helmetH, sizes.helmetH, tMaterialt)
				.addTo(model.headGroup)
				.geometry()
					.translateY(sizes.headH/2)
					.back()
	var tGeometry	= model.helmet.geometry().get(0);
	mapUv(tGeometry, 0, 48, 24, 56, 16)	// left
	mapUv(tGeometry, 1, 32, 24, 40, 16)	// right
	mapUv(tGeometry, 2, 40, 32, 48, 24)	// top
	mapUv(tGeometry, 3, 48, 32, 56, 24)	// bottom
	mapUv(tGeometry, 4, 40, 24, 48, 16)	// front
	mapUv(tGeometry, 5, 56, 24, 64, 16)	// back
	
	
	// build model.body
	model.body	= tQuery.createCube(sizes.bodyW, sizes.bodyH, sizes.bodyD, tMaterial)
				.addTo(model.root) 
				.translateY(sizes.legH + sizes.bodyH/2);
	var tGeometry	= model.body.geometry().get(0);
	mapUv(tGeometry, 0, 28, 12, 32,  0)	// left
	mapUv(tGeometry, 1, 16, 12, 20,  0)	// right
	mapUv(tGeometry, 2, 20, 16, 28, 12)	// top
	mapUv(tGeometry, 3, 28, 16, 32, 12)	// bottom
	mapUv(tGeometry, 4, 20, 12, 28,  0)	// front
	mapUv(tGeometry, 5, 32, 12, 40,  0)	// back

	// build model.armR
	model.armR	= tQuery.createCube(sizes.armW, sizes.armH, sizes.armD, tMaterial)
				.addTo(model.root)
				.geometry()
					.translateY(-sizes.armH/2 + sizes.armW/2)
					.back()
				.translateX(-sizes.bodyW/2 - sizes.armW/2)
				.translateY(sizes.legH + sizes.bodyH - sizes.armW/2)
	var tGeometry	= model.armR.geometry().get(0);
	mapUv(tGeometry, 0, 48, 12, 52,  0)	// right
	mapUv(tGeometry, 1, 40, 12, 44,  0)	// left
	mapUv(tGeometry, 2, 44, 16, 48, 12)	// top
	mapUv(tGeometry, 3, 48, 16, 52, 12)	// bottom
	mapUv(tGeometry, 4, 44, 12, 48,  0)	// front
	mapUv(tGeometry, 5, 52, 12, 56,  0)	// back
	
	// build model.armL
	model.armL	= tQuery.createCube(sizes.armW, sizes.armH, sizes.armD, tMaterial)
				.addTo(model.root)
				.geometry()
					.translateY(-sizes.armH/2 + sizes.armW/2)
					.back()
				.translateX(sizes.bodyW/2 + sizes.armW/2)
				.translateY(sizes.legH + sizes.bodyH - sizes.armW/2)
	var tGeometry	= model.armL.geometry().get(0);
	mapUv(tGeometry, 0, 44, 12, 40,  0)	// right
	mapUv(tGeometry, 1, 52, 12, 48,  0)	// left
	mapUv(tGeometry, 2, 44, 16, 48, 12)	// top
	mapUv(tGeometry, 3, 48, 16, 52, 12)	// bottom
	mapUv(tGeometry, 4, 48, 12, 44,  0)	// front
	mapUv(tGeometry, 5, 56, 12, 52,  0)	// back

	// build model.legR
	model.legR	= tQuery.createCube(sizes.legW, sizes.legH, sizes.legD, tMaterial)
				.addTo(model.root)
				.geometry()
					.translateY(-sizes.legH/2)
					.back()
				.translateX(-sizes.legW/2)
				.translateY( sizes.legH)
	var tGeometry	= model.legR.geometry().get(0);
	mapUv(tGeometry, 0,  8, 12, 12,  0)	// right
	mapUv(tGeometry, 1,  0, 12,  4,  0)	// left
	mapUv(tGeometry, 2,  4, 16,  8, 12)	// top
	mapUv(tGeometry, 3,  8, 16, 12, 12)	// bottom
	mapUv(tGeometry, 4,  4, 12,  8,  0)	// front
	mapUv(tGeometry, 5, 12, 12, 16,  0)	// back

	// build model.legL
	model.legL	= tQuery.createCube(sizes.legW, sizes.legH, sizes.legD, tMaterial)
				.addTo(model.root)
				.geometry()
					.translateY(-sizes.legH/2)
					.back()
				.translateX(sizes.legW/2)
				.translateY(sizes.legH)
	var tGeometry	= model.legL.geometry().get(0);
	mapUv(tGeometry, 0,  4, 12,  0,  0)	// left
	mapUv(tGeometry, 1, 12, 12,  8,  0)	// right
	mapUv(tGeometry, 2,  8, 16,  4, 12)	// top
	mapUv(tGeometry, 3, 12, 16,  8, 12)	// bottom
	mapUv(tGeometry, 4,  8, 12,  4,  0)	// front
	mapUv(tGeometry, 5, 16, 12, 12,  0)	// back


	this._model	= model;
	
	// backward compatibility only
	if( true ){
		this.model	= model.root;
		this.parts	= {
			headGroup	: model.headGroup.get(0),
			upperBody	: model.body.get(0),
			legL		: model.legL.get(0),
			legR		: model.legR.get(0),
			armR		: model.armR.get(0),
			armL		: model.armL.get(0)
		};		
	}

	
	return;


	function mapUv(tGeometry, faceIdx, x1, y1, x2, y2){
		var tileUvW	= 1/64;
		var tileUvH	= 1/32;
		var UVs		= tGeometry.faceVertexUvs[0][faceIdx];
		UVs[0].u = x1 * tileUvW;	UVs[0].v = y1 * tileUvH;
		UVs[1].u = x1 * tileUvW;	UVs[1].v = y2 * tileUvH;
		UVs[2].u = x2 * tileUvW;	UVs[2].v = y2 * tileUvH;
		UVs[3].u = x2 * tileUvW;	UVs[3].v = y1 * tileUvH;		
	}
});

// make it pluginable
tQuery.pluginsInstanceOn(tQuery.MinecraftChar);


tQuery.MinecraftChar.baseUrl	= "../../../plugins/minecraft/";

/**
 * Load a skin
 *
 * @param {string} url the url of the skin image
*/
tQuery.MinecraftChar.prototype.loadSkin	= function(url){
	var image	= new Image();
	image.onload	= function () {
		this._tTexture.image		= image;
		this._tTexture.needsUpdate	= true;
	}.bind(this);
	image.src = url;
	return this;	// for chained API
}

/**
 * getter/setter on objects3d
 *
 * @param {string} name the name of the object3d to get
*/
tQuery.MinecraftChar.prototype.object3D	= function(name){
	// name default to 'root'
	name	= name	|| 'root';
	// sanity check
	console.assert( this._model[name] !== undefined );
	// handle getter case
	return this._model[name];
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Emulate tQuery.Object3D.addTo
*/
tQuery.MinecraftChar.prototype.addTo	= function(object3D){
	this._model.root.addTo(object3D);
	return this;
}

/**
 * Emulate tQuery.Object3D.removeFrom
*/
tQuery.MinecraftChar.prototype.removeFrom	= function(object3D){
	this.object3D('root').removeFrom(object3D);
	return this;
};

