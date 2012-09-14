
tQuery.registerStatic('defaultExtrudeSettings', {
	amount		: 5,
	bevelEnabled	: true,
	bevelSegments	: 2,
	steps		: 2
});

tQuery.registerStatic('createShape', function(tShape){
	return new tQuery.Shape(tShape);
});


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createFish', function(material){
	return tQuery.createFishShape().extrude()
		.computeAll().center()
		.normalize().rotateY(-Math.PI)
		.toMesh(material);	
});

tQuery.registerStatic('createHeart', function(material){
	return tQuery.createHeartShape().extrude()
		.computeAll().center()
		.normalize().rotateZ(Math.PI)
		.toMesh(material);	
});

tQuery.registerStatic('createSmiley', function(material){
	return tQuery.createSmileyShape().extrude()
		.computeAll().center()
		.normalize().rotateZ(Math.PI)
		.toMesh(material);	
});

tQuery.registerStatic('createTriangle', function(material){
	return tQuery.createTriangleShape().extrude()
		.computeAll().center()
		.normalize()
		.toMesh(material);	
});

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

tQuery.registerStatic('createHeartShape', function(){
	var x	= 0, y	= 0;
	// TODO put it upsidedown and normalize it
	var shape	= tQuery.createShape()
		.moveTo( x + 25, y + 25 )
		.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y )
		.bezierCurveTo( x - 30, y, x - 30, y + 35,x - 30,y + 35 )
		.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 )
		.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 )
		.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y )
		.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 )
	return shape;
});

tQuery.registerStatic('createTriangleShape', function(){
	// TODO normalize it
	var shape	= tQuery.createShape()
		.moveTo(  80, 20 )
		.lineTo(  40, 80 )
		.lineTo( 120, 80 )
		.lineTo(  80, 20 );	
	return shape;
});

tQuery.registerStatic('createSquareShape', function(width){
	return tQuery.createRectangleShape(width, width);
});

tQuery.registerStatic('createRectangleShape', function(width, height){
	var w		= width !== undefined ? width : 80;
	var h		= height!== undefined ? height: 80;
	var shape	= tQuery.createShape()
		.moveTo(  0, 0 )
		.lineTo(  0, h )
		.lineTo(  w, h )
		.lineTo(  w, 0 )	
		.lineTo(  0, 0 );	
	return shape;
});

tQuery.registerStatic('createCircleShape', function(radius){
	radius	= radius !== undefined ? radius	: 40;
	// TODO normalize it
	var shape	= tQuery.createShape()
		.moveTo( 0, radius )
		.quadraticCurveTo(  radius,  radius,  radius, 0 )
		.quadraticCurveTo(  radius, -radius, 0, -radius )
		.quadraticCurveTo( -radius, -radius, -radius, 0 )
		.quadraticCurveTo( -radius,  radius, 0,  radius );
	return shape;
});

tQuery.registerStatic('createFishShape', function(radius){
	// TODO normalize it
	var x	= 0, y	= 0;
	var shape	= tQuery.createShape()
		.moveTo(x,y)
		.quadraticCurveTo(x + 50, y - 80, x + 90, y - 10)
		.quadraticCurveTo(x + 100, y - 10, x + 115, y - 40)
		.quadraticCurveTo(x + 115, y, x + 115, y + 40)
		.quadraticCurveTo(x + 100, y + 10, x + 90, y + 10)
		.quadraticCurveTo(x + 50, y + 80, x, y);
	return shape;
});

tQuery.registerStatic('createWheelShape', function(){
	var arcShape	= new THREE.Shape();
	arcShape.moveTo( 0, 0 );
	arcShape.arc( 10, 10, 30, 0, Math.PI*2, false );
	
	var holePath	= new THREE.Path();
	holePath.moveTo( 0, 0 );
	holePath.arc( 10, 10, 10, 0, Math.PI*2, true );

	arcShape.holes.push( holePath );

	return new tQuery.Shape(arcShape);
});

tQuery.registerStatic('createSmileyShape', function(radius){
	var smileyShape = new THREE.Shape();
	smileyShape.moveTo( 80, 40 );
	smileyShape.arc( 40, 40, 40, 0, Math.PI*2, false );

	var smileyEye1Path = new THREE.Path();
	smileyEye1Path.moveTo( 35, 20 );
	smileyEye1Path.arc( 25, 20, 10, 0, Math.PI*2, true );
	smileyShape.holes.push( smileyEye1Path );

	var smileyEye2Path = new THREE.Path();
	smileyEye2Path.moveTo( 65, 20 );
	smileyEye2Path.arc( 55, 20, 10, 0, Math.PI*2, true );
	smileyShape.holes.push( smileyEye2Path );

	var smileyMouthPath = new THREE.Path();
	// ugly box mouth
	// smileyMouthPath.moveTo( 20, 40 );
	// smileyMouthPath.lineTo( 60, 40 );
	// smileyMouthPath.lineTo( 60, 60 );
	// smileyMouthPath.lineTo( 20, 60 );
	// smileyMouthPath.lineTo( 20, 40 );

	smileyMouthPath.moveTo( 20, 40 );
	smileyMouthPath.quadraticCurveTo( 40, 60, 60, 40 );
	smileyMouthPath.bezierCurveTo( 70, 45, 70, 50, 60, 60 );
	smileyMouthPath.quadraticCurveTo( 40, 80, 20, 60 );
	smileyMouthPath.quadraticCurveTo( 5, 50, 20, 40 );

	smileyShape.holes.push( smileyMouthPath );

	return new tQuery.Shape(smileyShape);
});







