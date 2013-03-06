/**
 * hook tQuery.convert.toTexture() to accept MediaStream
 */
tQuery.convert.toTexture.addEventListener('preConvert', function(args){
	// if first args IS NOT a LocalMediaStream, return now
	//if( args[0] instanceof LocalMediaStream === false )	return undefined;
	
	// FIXME window.LocalMediaStream is not defined... so impossible to do instanceof
	// - working around by testing properties which MUST exist in a MediaLocalStream
	// - aka a poor version of it
	if( args[0].audioTracks === undefined )	return;
	if( args[0].videoTracks === undefined )	return;
	if( args[0].readyState  === undefined )	return;
	// now convert the stream in a texture using tquery.videos plugin
	var stream	= args[0];
	var url		= URL.createObjectURL(stream);
	var texture	= tQuery.createVideoTexture(url);
	return texture;
});
