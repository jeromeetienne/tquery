Pixastic.Actions.fliph3 = {
	process : function(params) {
		var data	= Pixastic.prepareData(params);
		var rect	= params.options.rect;
		var limit	= {
			r	: [-1, 60],
			g	: [-1, 60],
			b	: [180, 255]
		};

		for( var y = 0; y < rect.height; y++ ){
			for( var x = 0; x < rect.width; x++ ){
				var idx	= x * 4 + y * rect.width * 4;
				
				var luminance	= (0.2126*(data[idx+0]/255)) + (0.7152*(data[idx+1]/255)) + (0.0722*(data[idx+2]/255))
				if( luminance < 0.6 ){
					data[idx+0]	= 0;
					data[idx+1]	= 0;
					data[idx+2]	= 0;
				}

				if(!( data[idx+0]/255 < 1 && data[idx+1]/255 < 1 && data[idx+2]/255 > 0.5 )){
					data[idx+0]	= 0;
					data[idx+1]	= 0;
					data[idx+2]	= 0;
				}

				
				var sum	= data[idx+0] + data[idx+1] + data[idx+2];

				
				if( data[idx+0]/sum < 1 && data[idx+1]/sum < 1 && data[idx+2]/sum > 0.2 ){
					
				}else{
					//data[idx+0]	= 0;
					//data[idx+1]	= 0;
					//data[idx+2]	= 0;
					//continue;					
				}

				//if( data[idx+0] < limit.r[0] || data[idx+0] > limit.r[1] )	data[idx+0]	= 0;
				//if( data[idx+1] < limit.g[0] || data[idx+1] > limit.g[1] )	data[idx+1]	= 0;
				//if( data[idx+2] < limit.b[0] || data[idx+2] > limit.b[1] )	data[idx+2]	= 0;
			}
		}
		return true;
	},
	checkSupport : function() {
		return Pixastic.Client.hasCanvas();
	}
}




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
	video.loop	= true;	

	var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
	console.log("UserMedia is detected", hasUserMedia);

	if( hasUserMedia ){
		navigator.webkitGetUserMedia('video', function(stream){
			video.src	= webkitURL.createObjectURL(stream);
			console.log("pseudo object URL", video.src);
		}, function(error){
			alert('you got no WebRTC webcam');
		});
	}

	var canvas	= document.createElement('canvas');
	canvas.width	= video.width;
	canvas.height	= video.height;
	var ctx		= canvas.getContext("2d");

	var texture;
	texture	= new THREE.Texture( video );
	texture	= new THREE.Texture( canvas );

	
	var frameCounter	= 0;
	opts.loop.hook(function(){
		if( video.readyState === video.HAVE_ENOUGH_DATA ){
			frameCounter++;
			if( frameCounter % 1 === 0 ){
				
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				//texture.needsUpdate	= true;


				var rect	= {
					left	:0,
					top	:0,
					width	:canvas.width,
					height	:canvas.height
				};

				var rect0	= {
					left	:canvas.width/4,
					top	:canvas.height/4,
					width	:canvas.width/2,
					height	:canvas.height/2
				};
				
				//console.log("image", texture.image)
				//Pixastic.process(canvas, "emboss", {direction:"topleft", rect:{left:0,top:0,width:canvas.width,height:canvas.height}}, function(newImage){
				//Pixastic.process(canvas, "blur", null, function(newImage){
				var image	= canvas;
				Pixastic.process(image, "fliph", null, function(image){
					Pixastic.process(image, "fliph3", {rect: rect}, function(image){
						Pixastic.process(image, "colorhistogram", {paint:true, rect: rect}, function(image){
							ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
							texture.needsUpdate	= true;
						});
					});
				});
			}
		}
	});
	
	return texture;
});

