/**
 * Create tQuery.Scene
*/
tQuery.register('createAugmentedJoystick', function(opts){
	// handle parameters
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});

	var video	= document.createElement('video');
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= true;

	var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
	//console.log("UserMedia is detected", hasUserMedia);

	if( hasUserMedia ){
		navigator.webkitGetUserMedia('video', function(stream){
			video.src	= webkitURL.createObjectURL(stream);
			//console.log("pseudo object URL", video.src);
		}, function(error){
			alert('you got no WebRTC webcam');
		});
	}else{
		console.assert(false);
	}

	var canvas	= document.createElement('canvas');
	canvas.width	= video.width	/4;
	canvas.height	= video.height	/4;
	var ctx		= canvas.getContext("2d");
	//var texture	= new THREE.Texture( video );
	var texture	= new THREE.Texture( canvas );

window.canvas	= canvas;
window.ctx	= ctx;
window.video	= video;
window.imageData= ctx.getImageData(0,0, canvas.width, canvas.height);

	var imageData	= ctx.getImageData(0,0, canvas.width, canvas.height);
	console.log("imageData", imageData)
	
	var frameCounter	= 0;
	var frameRate		= 1;
	opts.loop.hook(function(){
		frameCounter++;
		if( frameCounter % frameRate !== 0 )	return;

		if( video.readyState === video.HAVE_ENOUGH_DATA ){
			
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			var imageData	= ctx.getImageData(0,0, canvas.width, canvas.height);

			//ImageData.fliph(imageData);
			//ImageData.luminance(imageData);

			//var greenData	= ImageData.duplicate(imageData, ctx);
			//ImageData.greenish(greenData);

			//var blueData	= ImageData.duplicate(imageData, ctx);
			//ImageData.greenish(imageData);
			//ImageData.blueish(blueData);
			//var colorHist	= ImageData.computeColorHistogram(blueData);
			//ImageData.normalizeColorHistogram(colorHist);
			//ImageData.displayColorHistogram(imageData, colorHist);

			ctx.putImageData(imageData, 0, 0);
			
			texture.needsUpdate	= true;
		}
	});
	
	return texture;
});

