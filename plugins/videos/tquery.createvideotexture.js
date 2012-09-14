/**
 * Create tQuery.Scene
*/
tQuery.registerStatic('createVideoTexture', function(opts){
	// handle parameters
	if( arguments.length === 1 && typeof opts === 'string' ){
		opts	= { url : arguments[0] };
	}
	opts	= tQuery.extend(opts, {
		loop	: tQuery.world.loop()
	});
	console.assert( opts.url, "url MUST be specified" )

	// create the video element
	var video	= document.createElement('video');
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= true;
	video.loop	= true;
	video.src	= opts.url;

	// create the texture
	var texture	= new THREE.Texture( video );
	
	opts.loop.hook(function(){
		if( video.readyState === video.HAVE_ENOUGH_DATA ){
			texture.needsUpdate	= true;
		}
	});
	
	return texture;
});

