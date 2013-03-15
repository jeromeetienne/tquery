# tQuery.videos

It is a plugin to handle videos.


## API

to create a snow texture, use
```
tQuery.createTVSnowTexture()
```

to create a texture from a video, use
```
var tTexture = tQuery.createVideoTexture(url);
// here tTexture.image is the video element being played
```

to create a texture from a webcam, use
```
var tTexture	= tQuery.createWebcamTexture();
```

to create a audio/video texture from a video, use
```
// create the texture
var url		= '../../assets/videos/sintel.ogv';
var avTexture	= tQuery.createAudioVideoTexture(url);
// set it as material
object3D.setBasicMaterial()
	.map(avTexture.tTexture())	// To get the video 
	.back()
// make the sound follow the object
avTexture.addEventListener('soundReady', function(){
	avTexture.sound().follow(object3D)
})
```