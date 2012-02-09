var playSoundtrack= function(){
	var url	= 'virt-lorem-ipsum.mp3';
	//var url	= 'eatpill.mp3';

	var audio	= document.createElement('audio');
	audio.setAttribute('src', url);
	audio.load();

	audio.addEventListener('canplaythrough', function(e) {
		console.log("canplaythrough")
		audio.play();
        }, false);
	audio.addEventListener('ended', function(e) {
		console.log("ended")
		setTimeout(function(){
			playSoundtrack();	
		}, 1000);		
        }, false);
}
setTimeout(function(){
	playSoundtrack();	
}, 2000);