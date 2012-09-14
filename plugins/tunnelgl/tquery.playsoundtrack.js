/**
 * <audio> tag management. Super dirty
 * There is a timeout 1sec
*/
tQuery.registerStatic('playSoundtrack', function(url){
	var playSoundtrack= function(){
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
	}, 1000);
});