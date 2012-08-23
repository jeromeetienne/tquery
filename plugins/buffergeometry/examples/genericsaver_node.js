//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var triangles		= 1;

var vertexIdxArray	= new Int16Array(triangles * 3);
var i	= 0;
vertexIdxArray[i+0]	= 0;
vertexIdxArray[i+1]	= 1;	
vertexIdxArray[i+2]	= 2;
i	+= 3;

var vertexPosArray	= new Float32Array(triangles * 3 * 3);
var i	= 0;
vertexPosArray[i+0]	= 0;
vertexPosArray[i+1]	= 0;
vertexPosArray[i+2]	= 0;
i	+= 3;
vertexPosArray[i+0]	= 1;
vertexPosArray[i+1]	= 0;
vertexPosArray[i+2]	= 0;
i	+= 3;
vertexPosArray[i+0]	= 0;
vertexPosArray[i+1]	= 1;
vertexPosArray[i+2]	= 0;
i	+= 3;

var uvArray		= new Float32Array(triangles * 3 * 2);
var i	= 0;
uvArray[i+0]	= 0;
uvArray[i+1]	= 0;
i	+= 2;
uvArray[i+0]	= 1;
uvArray[i+1]	= 0;
i	+= 2;
uvArray[i+0]	= 0;
uvArray[i+1]	= 1;
i	+= 2;


// var vertexIdxArray	= new Int16Array(53185 * 3);
// var vertexPosArray	= new Float32Array(100876 * 3);
// var uvArray		= new Float32Array(53185 * 2);

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var buffer	= saveToBuffer(vertexIdxArray, vertexPosArray, uvArray);
require('fs').writeFileSync('modelgeneric.bin', buffer, 'binary')
return;


function saveToBuffer(vertexIdxArray, vertexPosArray, uvArray){
	var types	= {
		padding		: 0,
		vertexIdx	: 1,
		vertexPos	: 2,
		vertexUv	: 3,
	};

	// compute the buffer length
	var bufferLen	= 0;
	bufferLen	+= chunkLength(bufferLen, vertexIdxArray);
	bufferLen	+= chunkLength(bufferLen, vertexPosArray);
	bufferLen	+= chunkLength(bufferLen, uvArray);

	console.log('bufferLen', bufferLen);

	var buffer	= new Buffer(bufferLen)
	var offset	= 0;
	offset		= chunkSave(buffer, offset, types.vertexIdx, vertexIdxArray);
	offset		= chunkSave(buffer, offset, types.vertexPos, vertexPosArray);
	offset		= chunkSave(buffer, offset, types.vertexUv , uvArray);

	return buffer;

	/**
	 * TODO
	 * * improve padding tech
	 * * type of chunck as 8bit
	 * * if type === 0, then skip. in reader
	 * * offset % 4 != 2, then add padding
	 * * how to estimate the size of the output ?
	*/

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

	function chunkSave(buffer, offset, chunkType, arr){
		// write the padding if needed
		var padLength	= [3, 2, 1, 0][offset % 4];
		for(var i = 0; i < padLength; i++){
			buffer.writeUInt8(types.padding, offset);
			offset		+= 1;
		}
		// write the chunk header
		buffer.writeUInt8(chunkType, offset);
		offset		+= 1;
		// write the array
		buffer.writeUInt32LE(arr.length, offset);
		offset		+= 4;
		if( arr.byteLength / arr.length === 4 ){
			for(var i = 0; i < arr.length; i++){
				buffer.writeFloatLE(arr[i], offset);
				offset		+= 4;
			}
		}else if( arr.byteLength / arr.length === 2 ){
			for(var i = 0; i < arr.length; i++){
				buffer.writeUInt16LE(arr[i], offset);
				offset		+= 2;
			}
		}else	console.assert(false);
		// return the new offset
		return offset;
	}	
}
