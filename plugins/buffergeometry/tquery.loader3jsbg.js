tQuery.register('Loader3jsbg', function(url, onComplete){
	// parameter polymorphism
	onComplete	= onComplete	|| function(tGeometry){};
	// define constant
	var chunkTypes	= {
		padding	: 0,
		vertPos	: 1,
		faceIdx	: 2,
		faceUvs	: 3,
		offsets	: 4
	};
	// launch the xhr
	var xhr		= new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.responseType= "arraybuffer"; 
	xhr.onload	= function(event){
		var arraybuffer	= xhr.response; // not responseText
		//console.log('loaded', arraybuffer, arraybuffer.byteLength);

		var dataView	= new DataView(arraybuffer);
		var offset	= 0;

		tQuery.hexDump(dataView)
		//console.log('dataView', dataView)
	
		while( true ){
			// skip padding
			for(; offset < dataView.byteLength && dataView.getUint8(offset) === chunkTypes.padding; offset++ );
			//console.log('offset', offset)
			// detect the end of dataView
			if( offset >= dataView.byteLength )	break;
			// get chunkType
			var chunkType	= dataView.getUint8(offset);
			offset++;
			//console.log('chunkType', chunkType)
			if( chunkType === chunkTypes.faceIdx ){
				var numItems		= dataView.getUint32(offset, true);
				offset			+= 4;
				var faceIdxArray	= new Int16Array(arraybuffer, offset, numItems);
				offset			+= numItems * 2;
				// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
			}else if( chunkType === chunkTypes.vertPos ){
				var numItems		= dataView.getUint32(offset, true);
				offset			+= 4;
				var vertPosArray	= new Float32Array(arraybuffer, offset, numItems);
				offset			+= numItems * 4;
				// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
			}else if( chunkType === chunkTypes.faceUvs ){
				var numItems		= dataView.getUint32(offset, true);
				offset			+= 4;
				var faceUvsArray	= new Float32Array(arraybuffer, offset, numItems);
				offset			+= numItems * 4;
				// TODO 3jsbg is stored in little endian, convert to bigendian here if needed
			}else if( chunkType === chunkTypes.offsets ){
				// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
				var offsetsLength	= dataView.getUint32(offset, true);
				offset			+= 4;
				var offsetsArray	= new Uint16Array(arraybuffer, offset, offsetsLength/2);
				offset			+= offsetsLength;
				var offsetsJSON		= String.fromCharCode.apply(null, offsetsArray);
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
		tGeometry.computeBoundingBox();
		tGeometry.computeBoundingSphere();
		tGeometry.computeVertexNormals();
		
		// notify the caller
		onComplete(tGeometry)
	}
	xhr.send();
});
