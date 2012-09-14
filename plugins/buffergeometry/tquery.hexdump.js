/**
 * it seems more like debug.js than tquery thing
*/
tQuery.registerStatic('hexDump', function(buffer, noConsole){
	//////////////////////////////////////////////////////////////////////////
	// from http://javascript0.org/wiki/Hexdump				//
	function hexify(num) {
		var hex		= num.toString(16);
		var zero	= hex.length < 2 ? '0' : ''
		return zero + hex;
	}
	function charify(num) {
		if (num > 0x7e || num < 0x20) { // non-printable
			return '.';
		}
		return String.fromCharCode(num);
	}
	var dv		= buffer instanceof ArrayBuffer ? new DataView(buffer) : buffer;
	var offset	= 0;
	var lines	= [];
	while(offset < buffer.byteLength){
		var chars = '';
		var hexes = '';
		for (var i = 0; i < 16; i++) {
			if (offset < buffer.byteLength) {
				byte = dv.getUint8(offset);
				chars += charify(byte);
				hexes += hexify(byte);
			} else {
				chars += ' ';
				hexes += '  '
			}
			hexes += ' ';
			if (i == 7) {
				hexes += ' ';
			}
			offset += 1;
		}
		lines.push(hexes + '  |' + chars + '|');
	}
	var output	= lines.join('\n');
	if( noConsole !== true )	console.log(output)
	return output;
});
