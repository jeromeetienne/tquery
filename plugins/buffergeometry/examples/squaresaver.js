//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var triangles		= 2;

var vertexIdxArray	= new Int16Array(triangles * 3);
var i	= 0;
vertexIdxArray[i+0]	= 0;
vertexIdxArray[i+1]	= 1;	
vertexIdxArray[i+2]	= 2;
i	+= 3;
vertexIdxArray[i+0]	= 3;
vertexIdxArray[i+1]	= 4;	
vertexIdxArray[i+2]	= 5;
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
vertexPosArray[i+0]	= 0;
vertexPosArray[i+1]	= 1;
vertexPosArray[i+2]	= 0;
i	+= 3;
vertexPosArray[i+0]	= 1;
vertexPosArray[i+1]	= 0;
vertexPosArray[i+2]	= 0;
i	+= 3;
vertexPosArray[i+0]	= 1;
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
uvArray[i+0]	= 0;
uvArray[i+1]	= 1;
i	+= 2;
uvArray[i+0]	= 1;
uvArray[i+1]	= 0;
i	+= 2;
uvArray[i+0]	= 1;
uvArray[i+1]	= 1;
i	+= 2;

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var types	= {
	vertexIdx	: 1,
	vertexPos	: 2,
	vertexUv	: 3,
};

// create the buffer
var headerArray	= new Int32Array(2);
var buffer	= new Buffer(
	headerArray.byteLength + vertexIdxArray.byteLength + 
	headerArray.byteLength + vertexPosArray.byteLength + 
	headerArray.byteLength + uvArray.byteLength
);


var offset	= 0
// write chunk header
buffer.writeUInt32LE(types.vertexIdx, offset);
offset		+= 4;
buffer.writeUInt32LE(vertexIdxArray.length, offset);
offset		+= 4;
// write vertexIdxArray
for(var i = 0; i < vertexIdxArray.length; i++){
	buffer.writeUInt16LE(vertexIdxArray[i], offset);
	offset		+= 2;	
}

// write chunk header
buffer.writeUInt32LE(types.vertexPos, offset);
offset		+= 4;
buffer.writeUInt32LE(vertexPosArray.length, offset);
offset		+= 4;
// write vertexPosArray
for(var i = 0; i < vertexPosArray.length; i++){
	buffer.writeFloatLE(vertexPosArray[i], offset);
	offset		+= 4;
}

// write chunk header
buffer.writeUInt32LE(types.vertexUv, offset);
offset		+= 4;
buffer.writeUInt32LE(uvArray.length, offset);
offset		+= 4;
// write vertexPosArray
for(var i = 0; i < uvArray.length; i++){
	buffer.writeFloatLE(uvArray[i], offset);
	offset		+= 4;
}

console.log('offset', offset)
//console.log('buffer', buffer.length);

var filename	= "model-square.bin"
require('fs').writeFileSync(filename, buffer, 'binary')

