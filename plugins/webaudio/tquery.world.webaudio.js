/**
 * tquery.js plugin to handle webaudio
*/
define(['examples/webaudio/threex.webaudio'], function(){
	var instance	= null;
	tQuery.World.register('webaudio', function(){
		if( !instance )	instance = new THREEx.WebAudio();
		return instance;
	});
});
