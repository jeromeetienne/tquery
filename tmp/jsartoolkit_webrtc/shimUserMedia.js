// shim for navigator.getUserMedia
navigator.getUserMedia	= navigator.getUserMedia
			|| navigator.webkitGetUserMedia
			|| navigator.mozGetUserMedia
			|| navigator.msGetUserMedia
			|| navigator.oGetUserMedia;
if( !navigator.getUserMedia ){
	throw new Error("navigator.getUserMedia not found.");
}

// shim for window.URL.createObjectURL
window.URL	= window.URL || window.webkitURL;
window.URL.createObjectURL	= window.URL.createObjectURL || webkitURL.createObjectURL;
if( !window.URL || !window.URL.createObjectURL ){
	throw new Error("URL.createObjectURL not found.");
}

