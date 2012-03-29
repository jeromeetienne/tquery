var ImageData	= {};

ImageData.fliph	= function(imageData)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var tmp;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w/2; x++){
			var i1	= (x		+ y*w)*4;
			var i2	= ((w-1-x)	+ y*w)*4;
			// swap red
			tmp	= p[i1+0];
			p[i1+0]	= p[i2+0];
			p[i2+0]	= tmp;
			// swap red
			tmp	= p[i1+1];
			p[i1+1]	= p[i2+1];
			p[i2+1]	= tmp;
			// swap green
			tmp	= p[i1+2];
			p[i1+2]	= p[i2+2];
			p[i2+2]	= tmp;
			// swap alpha
			tmp	= p[i1+3];
			p[i1+3]	= p[i2+3];
			p[i2+3]	= tmp;
		}
	}
}

ImageData.luminance	= function(imageData, ratio)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var i	= 0;
	ratio	= ratio !== undefined ? ratio : 1.0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			var luminance	= (0.2126*(p[i+0]/255)) + (0.7152*(p[i+1]/255)) + (0.0722*(p[i+2]/255))
			luminance	= Math.floor(luminance*ratio*255);
			p[i+0]	= luminance;
			p[i+1]	= luminance;
			p[i+2]	= luminance;
		}
	}
}


ImageData.duplicate	= function(srcImageData, ctx)
{
	var dstImageData= ctx.createImageData(srcImageData);
	var pSrc	= srcImageData.data;
	var pDst	= dstImageData.data;
	for(var i = 0; i < pSrc.length; i++){
		pDst[i]	= pSrc[i];
	}
	return dstImageData;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.threshold	= function(imageData, min, max)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var i	= 0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			if( p[i+0] >= min.r && p[i+0] <= max.r )	continue;
			if( p[i+1] >= min.g && p[i+1] <= max.g )	continue;
			if( p[i+2] >= min.b && p[i+2] <= max.b )	continue;
			if( p[i+3] >= min.a && p[i+3] <= max.a )	continue;
			p[i+0]	= p[i+1] = p[i+2] = p[i+3] = 0;
		}
	}
}

ImageData.greenish	= function(imageData)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var i	= 0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			//if( p[i+0] <= 30 )	continue;
			//if( p[i+2] <= 30 )	continue;

			var sumRB	= p[i+0]+p[i+2];

			if( p[i+1] >= 130 && sumRB < 300 )	continue;

			p[i+0]	= p[i+1] = p[i+2] = p[i+3] = 0;
		}
	}
}

ImageData.blueish	= function(imageData)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var i	= 0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			//if( p[i+0] <= 30 )	continue;
			//if( p[i+2] <= 30 )	continue;

			var sumRG	= p[i+0]+p[i+1];

			if( p[i+2] >= 130 && sumRG < 200 )	continue;

			p[i+0]	= p[i+1] = p[i+2] = p[i+3] = 0;
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.computeColorHistogram	= function(imageData)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var hist= {
		r	: new Float64Array(256),
		g	: new Float64Array(256),
		b	: new Float64Array(256),
		a	: new Float64Array(256)
	};
	
	var i	= 0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			hist.r[ p[i+0] ]++;
			hist.g[ p[i+1] ]++;
			hist.b[ p[i+2] ]++;
			hist.a[ p[i+3] ]++;
		}
	}
	return hist;
}

ImageData.normalizeColorHistogram	= function(colorHistogram)
{
	var hist= colorHistogram;

	// get the max value
	var max	= -Number.MAX_VALUE;
	for (var i = 0; i < 256; i++ ){
		max	= Math.max(max, hist.r[i]);
	}
	// normalize the histogram
	for (var i = 0; i < 256; i++ ){
		hist.r[i]	/= max;
	}
}

ImageData.displayColorHistogram	= function(imageData, colorHistogram)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var hist= colorHistogram;

	var canvas	= document.createElement('canvas');
	canvas.width	= w;
	canvas.height	= h;
	var ctx		= canvas.getContext("2d");
	ctx.fillStyle	= 'red';

	var barW	= canvas.width / 256;
	var barH	= canvas.height / 3;
	var barYOffset	= 0;
	for (var i = 0; i < 256; i++ ){
		ctx.fillRect(
			i*barW,		// x
			barYOffset,	// y
			barW,				// w
			Math.floor(hist.r[i]*256*barH)	// h
		);
	}
	var srcImgData	= ctx.getImageData(0,0, canvas.width, canvas.height);
	var pSrc	= srcImgData.data;
	var pDst	= imageData.data;
	for(var i = 0; i < pSrc.length; i++){
		pDst[i]	= pSrc[i];
	}
}