tQuery.registerStatic('addBlueSkyBackground', function(){
	// directly from @mrdoob in http://mrdoob.com/lab/javascript/webgl/clouds/
	var canvas	= document.createElement( 'canvas' );
	var context	= canvas.getContext( '2d' );
	canvas.width	= 32;
	canvas.height	= window.innerHeight;

	var gradient	= context.createLinearGradient( 0, 0, 0, canvas.height );
	gradient.addColorStop(0  , "#1e4877");
	gradient.addColorStop(0.5, "#4584b4");

	context.fillStyle	= gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);

	var url		= canvas.toDataURL('image/png');
	document.body.style.background	= 'url(' + url + ')';
})