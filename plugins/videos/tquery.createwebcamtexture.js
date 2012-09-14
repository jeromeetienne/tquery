/**
 * Create tQuery.Scene
*/
tQuery.registerStatic('createWebcamTexture', function(opts){
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

	var texture;

	if( hasUserMedia ){
		navigator.webkitGetUserMedia({video:true}, function(stream){
			video.src	= webkitURL.createObjectURL(stream);
			console.log("pseudo object URL", video.src);
		}, function(error){
			alert('you got no WebRTC webcam');
		});
		texture	= new THREE.Texture( video );
	}
	
	opts.loop.hook(function(){
		if( video.readyState === video.HAVE_ENOUGH_DATA ){
			texture.needsUpdate	= true;
		}
	});
	
	return texture;
});

