

tQuery.registerStatic('convert3jsbgToGeometry', function(arraybuffer){
	var dataView	= new DataView(arraybuffer);
	
	// define constant
	var chunkTypes	= {
		padding	: 0,
		vertPos	: 1,
		faceIdx	: 2,
		faceUvs	: 3,
		offsets	: 4
	};
	var offset	= 0;

	//tQuery.hexDump(dataView)
	// console.log('dataView', dataView)

	while( true ){
		// skip padding
		for(; offset < dataView.byteLength && dataView.getUint8(offset) === chunkTypes.padding; offset++ );
		//console.log('offset', offset)
		// detect the end of dataView
		if( offset >= dataView.byteLength )	break;
		// get chunkType
		var chunkType	= dataView.getUint8(offset);
		//console.log('chunkType', chunkType, offset)
		offset++;
		//console.log('chunkType', chunkType)
		if( chunkType === chunkTypes.vertPos ){
			var numItems		= dataView.getUint32(offset, true);
			offset			+= 4;
			var vertPosArray	= new Float32Array(arraybuffer, offset, numItems);
			offset			+= numItems * 4;
//console.log('vertPosArray')
//console.dir(vertPosArray);
			// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
		}else if( chunkType === chunkTypes.faceIdx ){
			var numItems		= dataView.getUint32(offset, true);
			offset			+= 4;
			var faceIdxArray	= new Int16Array(arraybuffer, offset, numItems);
			offset			+= numItems * 2;
//console.log('faceIdxArray')
//console.dir(faceIdxArray);
			// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
		}else if( chunkType === chunkTypes.faceUvs ){
			var numItems		= dataView.getUint32(offset, true);
			offset			+= 4;
			var faceUvsArray	= new Float32Array(arraybuffer, offset, numItems);
			offset			+= numItems * 4;
//console.log('faceUvsArray')
//console.dir(faceUvsArray);
			// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
		}else if( chunkType === chunkTypes.offsets ){
			// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
			var numItems		= dataView.getUint32(offset, true);
			offset			+= 4;
			var offsetsArray	= new Uint16Array(arraybuffer, offset, numItems);
			offset			+= numItems * 2;
			var offsetsJSON		= String.fromCharCode.apply(null, offsetsArray);
//console.log('offsetsJSON', offsetsJSON);
		}else	console.assert(false);
	}
	console.assert(faceIdxArray)
	console.assert(vertPosArray)
	console.assert(faceUvsArray)
	console.assert(offsetsJSON)
	

	// build BufferGeometry
	var tGeometry		= new THREE.BufferGeometry();
	tGeometry.offsets	= JSON.parse(offsetsJSON);
	tGeometry.attributes	= {
		position	: {
			itemSize: 3,
			array	: vertPosArray,
			numItems: vertPosArray.length
		},
		index		: {
			itemSize: 1,
			array	: faceIdxArray,
			numItems: faceIdxArray.length
		},
		uv	: {
			itemSize: 2,
			array	: faceUvsArray,
			numItems: faceUvsArray.length
		}
	};
	console.time('computeBoundingBox')
	tGeometry.computeBoundingBox();
	console.timeEnd('computeBoundingBox')
	console.time('computeBoundingSphere')
	tGeometry.computeBoundingSphere();
	console.timeEnd('computeBoundingSphere')
	console.time('computeVertexNormals')
	tGeometry.computeVertexNormals();
	console.timeEnd('computeVertexNormals')
	return tGeometry;
});

tQuery.registerStatic('Loader3jsbg', function(url, onComplete){
	// parameter polymorphism
	onComplete	= onComplete	|| function(tGeometry){};
	// launch the xhr
	var xhr		= new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.responseType= "arraybuffer"; 
	xhr.onload	= function(event){
		var arraybuffer	= xhr.response; // not responseText
		//console.log('loaded', arraybuffer, arraybuffer.byteLength);
		console.time('convert3jsbgToGeometry')
		var tGeometry	= tQuery.convert3jsbgToGeometry(arraybuffer)
		console.timeEnd('convert3jsbgToGeometry')
		// notify the caller
		onComplete(tGeometry)
	}
	xhr.send();
});
