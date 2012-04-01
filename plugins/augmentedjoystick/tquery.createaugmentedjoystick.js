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

// Left
		var leftData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(leftData, guiOpts.left.threshold.r, guiOpts.left.threshold.g, guiOpts.left.threshold.b);
		if( guiOpts.left.disp.enable )	imageData	= leftData;
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(leftData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.left.smooth.hFactor);
		var maxHLeft	= ImageData.getMaxHistogram(hist);
		if( guiOpts.left.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(leftData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.left.smooth.vFactor);
		var maxVLeft	= ImageData.getMaxHistogram(hist);
		if( guiOpts.left.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);


// Right
		var blueData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(blueData, guiOpts.right.threshold.r, guiOpts.right.threshold.g, guiOpts.right.threshold.b);
		if( guiOpts.right.disp.enable )	imageData	= blueData;
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(blueData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.right.smooth.hFactor);
		var maxHRight	= ImageData.getMaxHistogram(hist);
		if( guiOpts.right.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(blueData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.smoothHistogram(hist, guiOpts.right.smooth.vFactor);
		var maxVRight	= ImageData.getMaxHistogram(hist);
		if( guiOpts.right.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);

// Display Crosses
		// left
		if( guiOpts.left.disp.HLine )	ImageData.hline(imageData, maxHLeft.idx, 0, 255, 0);
		if( guiOpts.left.disp.VLine )	ImageData.vline(imageData, maxVLeft.idx, 0, 255, 0);
		// blue
		if( guiOpts.right.disp.HLine )	ImageData.hline(imageData, maxHRight.idx, 0, 0, 255);
		if( guiOpts.right.disp.VLine )	ImageData.vline(imageData, maxVRight.idx, 0, 0, 255);

		// update the canvas
		ctx.putImageData(imageData, 0, 0);
		// mark the texture as needsUpdate
		texture.needsUpdate	= true;
	});
	
	return texture;
});

