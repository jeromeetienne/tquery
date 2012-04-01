tQuery.register('createAugmentedJoystick', function(opts){
	return new tQuery.AugmentedJoystick(opts);
});


/**
 * Create tQuery.Scene
*/
tQuery.register('AugmentedJoystick', function(opts){
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

	if( !tQuery.AugmentedJoystick.hasUserMedia )	alert('Panic: no UserMedia')
	console.assert( tQuery.AugmentedJoystick.hasUserMedia, "no usermedia available");

	navigator.webkitGetUserMedia('video', function(stream){
		video.src	= webkitURL.createObjectURL(stream);
		//console.log("pseudo object URL", video.src);
	}, function(error){
		alert('you got no WebRTC webcam');
	});
	var canvas	= document.createElement('canvas');
	canvas.width	= guiOpts.general.video.w;
	canvas.height	= guiOpts.general.video.h;
	var ctx		= canvas.getContext("2d");
	var texture	= new THREE.Texture( canvas );

	// gesture recognition
	var gestureR	= new tQuery.GestureRecognition();
	var pointerR	= {
		x	: canvas.width/2,
		y	: canvas.height/2
	};
	var gestureL	= new tQuery.GestureRecognition();
	var pointerL	= {
		x	: canvas.width/2,
		y	: canvas.height/2
	};
	
	var frameCounter	= 0;
	var frameRate		= 1;
	opts.loop.hook(function(){
		// rate limiter
		frameCounter++;
		if( frameCounter % frameRate !== 0 )	return;
		// if no data is ready, do nothing
		if( video.readyState !== video.HAVE_ENOUGH_DATA )	return;
		
		// update canvas size if needed
		if( canvas.width != guiOpts.general.video.w )	canvas.width	= guiOpts.general.video.w;
		if( canvas.height != guiOpts.general.video.h )	canvas.height	= guiOpts.general.video.h;
		
		// draw video into a canvas2D
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		var imageData	= ctx.getImageData(0,0, canvas.width, canvas.height);

		ImageData.fliph(imageData);
		//ImageData.luminance(imageData);

// Right
		var rightData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(rightData, guiOpts.right.threshold.r, guiOpts.right.threshold.g, guiOpts.right.threshold.b);
		if( guiOpts.right.disp.enable )	imageData	= rightData;
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(rightData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.windowedAverageHistogram(hist, guiOpts.right.smooth.vWidth);
		var maxVRight	= ImageData.getMaxHistogram(hist);
		if( guiOpts.right.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(rightData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.windowedAverageHistogram(hist, guiOpts.right.smooth.hWidth);
		var maxHRight	= ImageData.getMaxHistogram(hist);
		if( guiOpts.right.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		

// Left
		var leftData	= ImageData.duplicate(imageData, ctx);
		ImageData.threshold(leftData, guiOpts.left.threshold.r, guiOpts.left.threshold.g, guiOpts.left.threshold.b);
		if( guiOpts.left.disp.enable )	imageData	= leftData;
		// horizontal coord X discovery
		var hist	= ImageData.computeVerticalHistogram(leftData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.windowedAverageHistogram(hist, guiOpts.left.smooth.vWidth);
		var maxVLeft	= ImageData.getMaxHistogram(hist);
		if( guiOpts.left.disp.VHist )	ImageData.displayVerticalHistogram(imageData, hist);
		// horizontal coord Y discovery
		var hist	= ImageData.computeHorizontalHistogram(leftData, function(p, i){
			return p[i+1] !== 0 ? true : false;
		});
		ImageData.windowedAverageHistogram(hist, guiOpts.left.smooth.hWidth);
		var maxHLeft	= ImageData.getMaxHistogram(hist);
		if( guiOpts.left.disp.HHist )	ImageData.displayHorizontalHistogram(imageData, hist);
		

// Display Crosses
		// right
		if( guiOpts.right.disp.VLine )	ImageData.vline(imageData, maxVRight.idx, 0, 0, 255);
		if( guiOpts.right.disp.HLine )	ImageData.hline(imageData, maxHRight.idx, 0, 0, 255);
		// left
		if( guiOpts.left.disp.VLine )	ImageData.vline(imageData, maxVLeft.idx, 0, 255, 0);
		if( guiOpts.left.disp.HLine )	ImageData.hline(imageData, maxHLeft.idx, 0, 255, 0);


// pointer Right
		pointerR.x	+= (maxVRight.idx - pointerR.x) * guiOpts.right.pointer.coordSmoothV;
		pointerR.y	+= (maxHRight.idx - pointerR.y) * guiOpts.right.pointer.coordSmoothH;
		var eventR	= gestureR.update(pointerR.x, pointerR.y, canvas.width, canvas.height);
		if( eventR )	console.log("gestureR event", eventR)
		if( guiOpts.right.pointer.display ){
			ImageData.vline(imageData, Math.floor(pointerR.x), 255, 0, 255);
			ImageData.hline(imageData, Math.floor(pointerR.y), 255, 0, 255);
		}
// pointer Left
		pointerL.x	+= (maxVLeft.idx - pointerL.x) * guiOpts.left.pointer.coordSmoothV;
		pointerL.y	+= (maxHLeft.idx - pointerL.y) * guiOpts.left.pointer.coordSmoothH;
		var eventL	= gestureL.update(pointerL.x, pointerL.y, canvas.width, canvas.height);
		if( eventL )	console.log("gestureL event", eventL)
		if( guiOpts.left.pointer.display ){
			ImageData.vline(imageData, Math.floor(pointerL.x), 255, 0, 0);
			ImageData.hline(imageData, Math.floor(pointerL.y), 255, 0, 0);
		}

		// update the canvas
		ctx.putImageData(imageData, 0, 0);
		// mark the texture as needsUpdate
		texture.needsUpdate	= true;
	});
	
	return texture;
});

/**
 * equal to hasUserMedia
*/
tQuery.AugmentedJoystick.hasUserMedia	= navigator.webkitGetUserMedia ? true : false;
