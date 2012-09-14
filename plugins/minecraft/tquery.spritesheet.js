tQuery.registerStatic('createSpritesheet', function(opts){
	return new tQuery.Spritesheet(opts)
});
/**
 * Class to handle spritesheet and generate extruded 3d objects with it.
 * TODO remove the canvas part, this is useless
 * 
 * @name tQuery.Spritesheet
 * @class
 *
 * @param {Object?} opts the options to create the spritesheet
 * @param {string} opts.url the url of the spritesheet image
 * @param {Number} opts.imgW the width of the image
 * @param {Number} opts.imgH the height of the image
 * @param {Number} opts.spriteW the width of each sprite in the image
 * @param {Number} opts.spriteH the height of each sprite in the image
*/
tQuery.registerStatic('Spritesheet', function(opts){
	// handle parameters
	this._opts	= tQuery.extend(opts, {
		url	: 'images/items/items.png',
		imgW	: 256,	// TODO would be better if i didnt have to do that
				// in fact there is some weird trick with explosion size
				// sort this out
		imgH	: 256,
		spriteW	: 16,	// TODO is it smart to get 
		spriteH	: 16
	});
	var imgW	= this._opts.imgW;
	var imgH	= this._opts.imgH;
	var spriteW	= this._opts.spriteW;
	var spriteH	= this._opts.spriteH;
	var nSpriteX	= this._opts.imgW / this._opts.spriteW;
	var nSpriteY	= this._opts.imgH / this._opts.spriteH;
	function getMaterial(image, transparent){
		var tex		= new THREE.Texture(image);
		tex.magFilter	= THREE.NearestFilter;
		tex.minFilter	= THREE.NearestFilter;
		tex.format	= transparent ? THREE.RGBAFormat : THREE.RGBFormat;
		tex.needsUpdate	= true;
		var material	= new THREE.MeshBasicMaterial({
			map		: tex,
			transparent	: transparent ? true : false
		});
		return material;
	}
	function uvmap (geometry, face, x, y, w, h, rotateBy){
		rotateBy	= rotateBy !== undefined ? rotateBy : 0;
		var uvs		= geometry.faceVertexUvs[0][face];
		var tileU	= x;
		var tileV	= y;
		
		uvs[ (0 + rotateBy) % 4 ].u = tileU * tileUvW;
		uvs[ (0 + rotateBy) % 4 ].v = tileV * tileUvH;
		uvs[ (1 + rotateBy) % 4 ].u = tileU * tileUvW;
		uvs[ (1 + rotateBy) % 4 ].v = tileV * tileUvH + h * tileUvH;
		uvs[ (2 + rotateBy) % 4 ].u = tileU * tileUvW + w * tileUvW;
		uvs[ (2 + rotateBy) % 4 ].v = tileV * tileUvH + h * tileUvH;
		uvs[ (3 + rotateBy) % 4 ].u = tileU * tileUvW + w * tileUvW;
		uvs[ (3 + rotateBy) % 4 ].v = tileV * tileUvH;
		
		uvs[ (0 + rotateBy) % 4 ].v	= 1 - uvs[ (0 + rotateBy) % 4 ].v;
		uvs[ (1 + rotateBy) % 4 ].v	= 1 - uvs[ (1 + rotateBy) % 4 ].v;
		uvs[ (2 + rotateBy) % 4 ].v	= 1 - uvs[ (2 + rotateBy) % 4 ].v;
		uvs[ (3 + rotateBy) % 4 ].v	= 1 - uvs[ (3 + rotateBy) % 4 ].v;
	};
	/**
	 * Create the geometry of the sprite 'id'. It is cached
	 *
	 * @param {Number} id the id of the sprite. aka (x + y*nSpriteX)
	 * @returns {THREE.Geometry} geometry built
	*/
	function getGeometry( id ){
		if( geometries[id] !== undefined )	return geometries[id];
		
		function getSides(x, y){
			var ix = Math.floor(id % nSpriteX)*spriteW;
			var iy = Math.floor(id / nSpriteX)*spriteH;
			
			var alphaPx	= (x+1) < spriteW	? imd[((x+1)+y*spriteW)*4+3] : 0;
			var alphaNx	= (x-1) >= 0		? imd[((x-1)+y*spriteW)*4+3] : 0;
			var alphaPy	= (y+1) < spriteH	? imd[(x+(y-1)*spriteW)*4+3] : 0;
			var alphaNy	= (y-1) >= 0		? imd[(x+(y+1)*spriteW)*4+3] : 0;
			
			return {
				px: !alphaPx, // Turns zero and undefined to true
				nx: !alphaNx,
				py: !alphaPy,
				ny: !alphaNy,
				pz: true,
				nz: true
			};
		};

		var imgdata	= context.getImageData(Math.floor(id % nSpriteX)*spriteW, Math.floor(id / nSpriteX)*spriteH, spriteW, spriteH);
		var imd		= imgdata.data;			
		var geometry	= new THREE.Geometry();
		
		for(var x=0; x < spriteW; x++) {
			for(var y=0; y < spriteH; y++) {
				// is this pixel transparent, skip it
				if( imd[(x+y*spriteW)*4+3] === 0)	continue;
				
				var voxel	= new THREE.CubeGeometry(1, 1, 2, 1, 1, 1, undefined, getSides(x, y));
				// TODO why is there a texture here ????
				// - this is a single pixel. get the pixel and set the color
				// - this may fix the anti alias issue
				for(var i=0; i < voxel.faceVertexUvs[0].length; i++) { // Fix color of voxel
					uvmap(voxel, i,
						Math.floor(id % nSpriteX)*spriteW + x,
						Math.floor(id / nSpriteX)*spriteH+y,
						1, 1);
				}
				
				// TODO what is this ... it seems a translation but why ?
				console.assert(voxel.vertices.length)
				for(var i=0; i < voxel.vertices.length; i++) { // Fix voxel's position
					voxel.vertices[i].x += +(x-(spriteW-1)/2);	// what is this 7.5 ? why not 8 ? as in 16/2
					voxel.vertices[i].y += -(y-(spriteH-1)/2);
				}
				THREE.GeometryUtils.merge(geometry, voxel);
			}
		}
		// if the geometry is fully transparent, unset it - NOTE: this is set to null, not unsigned
		if( geometry.faces.length === 0 )	geometry = null;
		// scale it to be Cube(1, 1, 1)
		geometry	&& tQuery(geometry).scaleBy(1/Math.max(spriteW, spriteH))
		// cache the result
		geometries[id]	= geometry;
		// return the result
		return geometry;
	};
	/**
	 * Create a tQuery.Mesh with the sprite at x,y in the spritesheet
	 * @param {Number} x the x position of the sprite in the spritesheet
	 * @param {Number} y the y position of the sprite in the spritesheet
	 * @returns {tQuery.Mesh} the generate mesh
	*/
	function createMeshItem(x, y) {
		console.assert(typeof(x) === 'number');
		console.assert(typeof(y) === 'number');
		var id		= x + y * nSpriteX;
		var geometry	= getGeometry(id);
		if( !geometry )	return null;
		var mesh	= new THREE.Mesh( geometry, material );
		return tQuery(mesh);
	};	

	// create the canvas element
	var canvas	= document.createElement('canvas');
	canvas.width	= imgW;
	canvas.height	= imgH;
	var context	= canvas.getContext('2d');
	var material	= getMaterial(canvas, false);
	// init some constants
	var tileUvW	= 1/canvas.width;
	var tileUvH	= 1/canvas.height;
	

	var geometries	= [];

	// load the image
	var items	= new Image();
	items.onload	= function(){
		// clear the canvas - TODO is this necessary ?
		context.clearRect(0, 0, canvas.width, canvas.height);
		// draw the loaded image to the canvas
		context.drawImage(items, 0, 0, canvas.width, canvas.height);
		// trigger the 'load' event
		this.trigger("load");
	}.bind(this);
	items.src = this._opts.url;
	
	// setup the public function
	this.createMesh		= createMeshItem;
	this.createGeometry	= getGeometry;
	this.imgW		= function(){ return imgW;	};
	this.imgH		= function(){ return imgH;	};
	this.spriteW		= function(){ return spriteW;	};
	this.spriteH		= function(){ return spriteH;	};
	this.nSpriteX		= function(){ return nSpriteX;	};
	this.nSpriteY		= function(){ return nSpriteY;	};
});

// make it eventable
tQuery.MicroeventMixin(tQuery.Spritesheet.prototype);
