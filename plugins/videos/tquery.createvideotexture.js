/**
 * Create tQuery.Scene
*/
tQuery.registerStatic('createVideoTexture', function(opts){
	// arguments polymorphism
	if( arguments.length === 1 && typeof opts === 'string' ){
		opts	= { url : arguments[0] };
	}
	// arguments default values
	opts	= tQuery.extend(opts, {
		world	: tQuery.world
	});
	// argument sanity check
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

// how do i stop that ?
	var callback	= opts.world.hook(function(){
		if( video.readyState === video.HAVE_ENOUGH_DATA ){
			texture.needsUpdate	= true;
		}
	});
	
	// FIXME this is a poorly coded
	texture.poorlyCodedClose	= function(){
		opts.world.unhook(callback)
	}
	
	return texture;
});

