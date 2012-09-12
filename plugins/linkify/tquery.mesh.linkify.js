tQuery.Mesh.register('linkify', function(url){
	var mesh	= tQuery(this.get(0));
	// measure mesh size
	var size	= mesh.geometry().computeAll().size();
	
	// build the underline
	var underlineH	= size.y / 10;
	var deltaY	= size.y / 20;
	var underline	= tQuery.createCube(size.x, underlineH, size.z, mesh.get(0).material)
			.translateY(-size.y/2 - deltaY - underlineH/2);
	// make it invisible by default
	underline.get(0).visible	= false;
	// add it to the mesh
	underline.addTo(mesh)
	
	// bind the click
	mesh.on('click', function(event){
		window.open(url, '_blank');
	});
	// bind 'mouseover'
	mesh.on('mouseover', function(){
		underline.get(0).visible	= true;
		document.body.style.cursor	= 'pointer';
	});
	// bind 'mouseout'
	mesh.on('mouseout', function(){
		underline.get(0).visible	= false;		
		document.body.style.cursor	= 'default';
	});
});