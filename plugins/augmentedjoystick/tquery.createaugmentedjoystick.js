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
	var texture	= new THREE.Texture( canvas );

	var frameCounter	= 0;
	var frameRate		= 1;
	opts.loop.hook(function(){
		// rate limiter
		frameCounter++;
		if( frameCounter % frameRate !== 0 )	return;
		// if no data is ready, do nothing
		if( video.readyState !== video.HAVE_ENOUGH_DATA )	return;
		// draw video into a canvas2D
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		var imageData	= ctx.getImageData(0,0, canvas.width, canvas.height);

		ImageData.fliph(imageData);
		//ImageData.luminance(imageData);

// Green
		var greenData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(greenData, guiOpts.green.threshold.r, guiOpts.green.threshold.g, guiOpts.green.threshold.b);
		if( guiOpts.green.disp.enable )	imageData	= greenData;
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(greenData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.green.smooth.hFactor);
		var maxHGreen	= ImageData.getMaxHistogram(hist);
		if( guiOpts.green.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(greenData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.green.smooth.vFactor);
		var maxVGreen	= ImageData.getMaxHistogram(hist);
		if( guiOpts.green.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);


// Blue
		var blueData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(blueData, guiOpts.blue.threshold.r, guiOpts.blue.threshold.g, guiOpts.blue.threshold.b);
		if( guiOpts.blue.disp.enable )	imageData	= blueData;
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(blueData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.blue.smooth.hFactor);
		var maxHBlue	= ImageData.getMaxHistogram(hist);
		if( guiOpts.blue.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(blueData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.blue.smooth.vFactor);
		var maxVBlue	= ImageData.getMaxHistogram(hist);
		if( guiOpts.blue.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);

// Display Crosses
		// green
		if( guiOpts.green.disp.HLine )	ImageData.hline(imageData, maxHGreen.idx, 0, 255, 0);
		if( guiOpts.green.disp.VLine )	ImageData.vline(imageData, maxVGreen.idx, 0, 255, 0);
		// blue
		if( guiOpts.blue.disp.HLine )	ImageData.hline(imageData, maxHBlue.idx, 0, 0, 255);
		if( guiOpts.blue.disp.VLine )	ImageData.vline(imageData, maxVBlue.idx, 0, 0, 255);

		// update the canvas
		ctx.putImageData(imageData, 0, 0);
		// mark the texture as needsUpdate
		texture.needsUpdate	= true;
	});
	
	return texture;
});

