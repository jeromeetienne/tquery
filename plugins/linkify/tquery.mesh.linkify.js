tQuery.Mesh.registerInstance('linkify', function(url){
	var mesh	= tQuery(this.get(0));
	// measure mesh size
	var size	= mesh.geometry().computeAll().size();
	
	// build the underline
	var underlineH	= size.y / 10;
	var deltaY	= size.y / 20;
	var underline	= tQuery.createCube(size.x, underlineH, size.z, mesh.get(0).material)
			.translateY(-size.y/2 - deltaY - underlineH/2)
			.addClass('underline')
	// make it invisible by default
	underline.get(0).visible	= false;
	// add it to the mesh
	underline.addTo(mesh)
	
	// the boundbing box to detect mouse events - make it invisible
	var boundingBox	= tQuery.createCube(size.x, size.y, size.z).addTo(mesh)
		.visible(false)
	
	// bind the click
	boundingBox.on('click', function(event){
		window.open(url, '_blank');
	});
	// bind 'mouseover'
	boundingBox.on('mouseover', function(){
		underline.get(0).visible	= true;
		document.body.style.cursor	= 'pointer';
	});
	// bind 'mouseout'
	boundingBox.on('mouseout', function(){
		underline.get(0).visible	= false;		
		document.body.style.cursor	= 'default';
	});
	// return this for chained API
	return this;
});