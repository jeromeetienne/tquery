tQuery.convert.toThreeColor.addEventListener('preConvert', function(args){
	if( args.length !== 1 )		return undefined;
	if( typeof(args[0]) !== 'string' )	return undefined;
	var colorName	= args[0]
	var colorHex	= THREE.ColorKeywords[colorName];
	return new THREE.Color(colorHex);
});
