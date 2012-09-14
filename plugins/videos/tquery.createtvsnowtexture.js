/**
 * Create tQuery.Scene.
 *
 * TODO to optim with a sprite sheet. currently it push a change the canvas
 * at every frame. a spritesheet will allow to only change the UV
*/
tQuery.registerStatic('createTVSnowTexture', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop		: tQuery.world.loop(),
		width		: 256,
		height		: 256,
		nCanvases	: 10
	});
	/**
	 * Create a canvas with tv-like snow.
	 *
	 * May be better with some aliasing
	*/
	var createSnowCanvas	= function(width, height){
		var canvas	= document.createElement('canvas');
		var context	= canvas.getContext('2d');
		canvas.width	= width;
		canvas.height	= height;
		
		var imageData	= context.createImageData(canvas.width, canvas.height);
		var pix		= imageData.data;
		// Loop over each pixel and set a transparent red.
		for(var i = 0; i < pix.length; i += 4){
			var intensity	= Math.floor(Math.random() * 256);
			pix[i  ] = intensity;
			pix[i+1] = intensity;
			pix[i+2] = intensity;
			pix[i+3] = 255;
		}
		context.putImageData(imageData, 0,0);
		return canvas;
	}
	// create all the snows canvases
	var canvases	= [];
	for( var i = 0; i < opts.nCanvases; i++ ){
		var canvas	= createSnowCanvas(opts.width, opts.height);
		canvases.push(canvas)
	}

	// create destination canvas
	var canvas	= document.createElement('canvas');
	var context	= canvas.getContext('2d');
	canvas.width	= opts.width;
	canvas.height	= opts.height;

	// create the texture
	var texture	= new THREE.Texture(canvas)
	// make the canvases loop
	var canvasIdx	= 0;
	opts.loop.hook(function(){
		context.drawImage(canvases[canvasIdx], 0, 0);
		canvasIdx	= (canvasIdx+1) %  canvases.length;
		texture.needsUpdate	= true;
	})
	// return the texture
	return texture;
});

