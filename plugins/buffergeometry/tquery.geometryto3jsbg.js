tQuery.registerStatic('geometryTo3jsbg', function(tBgGeometry){
	// parameter polymorphism
	if( tBgGeometry instanceof THREE.Geometry ){
		tBgGeometry	= tQuery.createBufferGeometryDisjoint(tBgGeometry);		
	}	
	// sanity check
	console.assert(tBgGeometry instanceof THREE.BufferGeometry );
	// copy parameters 
	var offsets	= tBgGeometry.offsets;
	var vPosArray	= tBgGeometry.attributes.position.array;
	var fIdxArray	= tBgGeometry.attributes.index.array;
	var fUvsArray	= tBgGeometry.attributes.uv.array;
	
	// convert offsets to json
	var offsetsJSON	= JSON.stringify(offsets);
console.log('offsets', JSON.stringify(offsets))
	
	// compute the buffer length
	var bufferLen	= 0;
	bufferLen	+= stringLength(bufferLen,offsetsJSON)
	bufferLen	+= chunkLength(bufferLen, vPosArray);
	bufferLen	+= chunkLength(bufferLen, fIdxArray);
	bufferLen	+= chunkLength(bufferLen, fUvsArray);

	// console.log('bufferLen', bufferLen);

	var inNode	= typeof(window) === 'undefined' ? true : false;
	if( inNode === false ){
		var dataView	= new DataView(new ArrayBuffer(bufferLen));
	}else{
		var dataView	= new Buffer(bufferLen)
	}

	var types	= {
		padding	: 0,
		vertPos	: 1,
		faceIdx	: 2,
		faceUvs	: 3,
		offsets	: 4
	};

	var offset	= 0;
	offset		= stringSave(dataView, offset,types.offsets, offsetsJSON)
	offset		= chunkSave(dataView, offset, types.vertPos, vPosArray);
	offset		= chunkSave(dataView, offset, types.faceIdx, fIdxArray);
	offset		= chunkSave(dataView, offset, types.faceUvs, fUvsArray);

	return dataView;

	/**
	 * TODO
	 * * improve padding tech
	 * * type of chunck as 8bit
	 * * if type === 0, then skip. in reader
	 * * offset % 4 != 2, then add padding
	 * * how to estimate the size of the output ?
	*/

	//////////////////////////////////////////////////////////////////
	//		to store string					//
	//////////////////////////////////////////////////////////////////
	function stringLength(offset, string){
		var length	= 0;
		// length of the padding
		var padLength	= [3, 2, 1, 0][offset % 4];
		length	+= padLength;
		// length of type - 1byte
		length	+= 1;
		// length of string - 4byte
		length	+= 4;
		// length of the string itself
		length	+= string.length * 2;	
		return length;
	}
	// http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
	function stringSave(dataView, offset, chunkType, string){
		
		// write the padding if needed
		var padLength	= [3, 2, 1, 0][offset % 4];
		for(var i = 0; i < padLength; i++){
			dataView.setUint8(offset, types.padding);
			offset		+= 1;
		}
		// write the chunk header
		dataView.setUint8(offset, chunkType);
		offset		+= 1;
		// write the numItems
		dataView.setUint32(offset, string.length, true);
		offset		+= 4;

		// copy each char one by one
		// FIXME i doubt it works with non ascii char 
		for(var i = 0; i < string.length; i++){
			dataView.setUint16(offset, string.charCodeAt(i), true);
			offset		+= 2;
		}
		// return the new offset
		return offset;
	}

	//////////////////////////////////////////////////////////////////
	//		to store chunk					//
	//////////////////////////////////////////////////////////////////
	function chunkLength(offset, arr){
		var length	= 0;
		// length of the padding
		var padLength	= [3, 2, 1, 0][offset % 4];
		length	+= padLength;
		// length of type
		length	+= 1;
		// length of nElements
		length	+= 4;
		// length of the array itself
		length	+= arr.byteLength;	
		return length;
	}

	function chunkSave(dataView, offset, chunkType, arr){
		// write the padding if needed
		var padLength	= [3, 2, 1, 0][offset % 4];
		for(var i = 0; i < padLength; i++){
			dataView.setUint8(offset, types.padding);
			offset		+= 1;
		}
		// write the chunk header
		dataView.setUint8(offset, chunkType);
		offset		+= 1;
		// write the array length
		dataView.setUint32(offset, arr.length, true);
		offset		+= 4;
		if( arr.byteLength / arr.length === 4 ){
			// i copy element one by one to get little endian storage		
			for(var i = 0; i < arr.length; i++){
				dataView.setFloat32(offset, arr[i], true);
				offset		+= 4;
			}
		}else if( arr.byteLength / arr.length === 2 ){
			for(var i = 0; i < arr.length; i++){
				dataView.setUint16(offset, arr[i], true);
				offset		+= 2;
			}
		}else	console.assert(false);
		// return the new offset
		return offset;
	}

});
