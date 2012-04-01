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
	ratio	= ratio !== undefined ? ratio : 1.0;
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	for(var i = 0, y = 0; y < h; y++){
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

ImageData.threshold	= function(imageData, r, g, b)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	for(var i = 0, y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			if( (p[i+0] >= r.min && p[i+0] <= r.max)
					&& (p[i+1] >= g.min && p[i+1] <= g.max)
					&& (p[i+2] >= b.min && p[i+2] <= b.max) ){
			}else{
				p[i+0]	= p[i+1] = p[i+2] = 0;
			}
		}
	}
}

ImageData.convert	= function(imageData, callback)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var i	= 0;
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			callback(p, i, x, y, imageData);
		}
	}
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.hline	= function(imageData, y, r, g, b, a)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var i	= y * w * 4;
	r	= r !== undefined ? r : 255;
	g	= g !== undefined ? g : 255;
	b	= b !== undefined ? b : 255;
	a	= a !== undefined ? a : 255;
	for(var x = 0; x < w; x++, i += 4){
		p[i+0]	= r;
		p[i+1]	= g;
		p[i+2]	= b;
		p[i+3]	= a;
	}
}

ImageData.vline	= function(imageData, x, r, g, b, a)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	r	= r !== undefined ? r : 255;
	g	= g !== undefined ? g : 255;
	b	= b !== undefined ? b : 255;
	a	= a !== undefined ? a : 255;
	for(var i = x*4, y = 0; y < h; y++, i += w*4){
		p[i+0]	= r;
		p[i+1]	= g;
		p[i+2]	= b;
		p[i+3]	= a;
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.greenish	= function(imageData, threshold)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	console.assert(threshold, "invalid parameter")
	for(var i = 0, y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			var maxSum	= p[i+0]+p[i+2];
			if( p[i+1] >= threshold.minCol && maxSum <= threshold.maxSum  )	continue;
			p[i+0]	= p[i+1] = p[i+2] = p[i+3] = 0;
		}
	}
}

ImageData.blueish	= function(imageData, threshold)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	console.assert(threshold, "invalid parameter")
	for(var i = 0, y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			var maxSum	= p[i+0]+p[i+1];
			if( p[i+1] >= threshold.minCol && maxSum <= threshold.maxSum  )	continue;
			p[i+0]	= p[i+1] = p[i+2] = p[i+3] = 0;
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.smoothHistogram	= function(hist, factor)
{
	var value	= 0;
	for(var i = 0; i < hist.length; i++ ){
		value	+= (hist[i] - value) * factor;
		hist[i]	= value;
	}
}

ImageData.getMaxHistogram	= function(hist, imageData)
{
	var max	= -Number.MAX_VALUE;
	var idx	= 0;
	for(var i = 0; i < hist.length; i++ ){
		if( hist[i] > max ){
			max	= hist[i];
			idx	= i;
		}
	}

	return {max: max, idx: idx}
}


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.computeVerticalHistogram	= function(imageData, filter)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var hist= new Float64Array(w);
	console.assert(filter, "invalid parameter")
	for(var x = 0; x < w; x++){
		for(var i = x*4, y = 0; y < h; y++, i += w*4){
			if( filter(p, i, x, y, imageData) )	hist[x]++;
		}
	}
	return hist;
}

ImageData.displayVerticalHistogram	= function(imageData, hist)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	console.assert(hist.length === w);
	// create temporary cancas
	var canvas	= document.createElement('canvas');
	canvas.width	= w;
	canvas.height	= h;
	var ctx		= canvas.getContext("2d");
	// display the histogram in the canvas
	ctx.fillStyle	= 'red';
	for(var x = 0; x < w; x++ ){
		ctx.fillRect(x, h-hist[x], 1, hist[x]);
	}
	// copy the canvas in imageData
	var srcImgData	= ctx.getImageData(0,0, canvas.width, canvas.height);
	var pSrc	= srcImgData.data;
	var pDst	= imageData.data;
	for(var i = 0; i < pSrc.length; i += 4){
		if( pSrc[i+0] !== 0 || pSrc[i+1] !== 0 || pSrc[i+2] !== 0 ){
			pDst[i+0]	= pSrc[i+0];
			pDst[i+1]	= pSrc[i+1];
			pDst[i+2]	= pSrc[i+2];
		}
		pDst[i+3]	= 255;
	}
}



//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

ImageData.computeHorizontalHistogram	= function(imageData, filter)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	var hist= new Float64Array(h);
	console.assert(filter, "invalid parameter")
	for(var i = 0, y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			if( filter(p, i, x, y, imageData) )	hist[y]++;
		}
	}
	return hist;
}

ImageData.displayHorizontalHistogram	= function(imageData, hist)
{
	var p	= imageData.data;
	var w	= imageData.width;
	var h	= imageData.height;
	console.assert(hist.length === h);
	// create temporary cancas
	var canvas	= document.createElement('canvas');
	canvas.width	= w;
	canvas.height	= h;
	var ctx		= canvas.getContext("2d");
	// display the histogram in the canvas
	ctx.fillStyle	= 'red';
	for(var y = 0; y < h; y++ ){
		ctx.fillRect(0, y, hist[y], 1);
	}
	// copy the canvas in imageData
	var srcImgData	= ctx.getImageData(0,0, canvas.width, canvas.height);
	var pSrc	= srcImgData.data;
	var pDst	= imageData.data;
	for(var i = 0; i < pSrc.length; i += 4){
		if( pSrc[i+0] !== 0 || pSrc[i+1] !== 0 || pSrc[i+2] !== 0 ){
			pDst[i+0]	= pSrc[i+0];
			pDst[i+1]	= pSrc[i+1];
			pDst[i+2]	= pSrc[i+2];
		}
		pDst[i+3]	= 255;
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
		b	: new Float64Array(256)
	};
	
	for(var i = 0, y = 0; y < h; y++){
		for(var x = 0; x < w; x++, i += 4){
			hist.r[ p[i+0] ]++;
			hist.g[ p[i+1] ]++;
			hist.b[ p[i+2] ]++;
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
		max	= Math.max(max, hist.g[i]);
		max	= Math.max(max, hist.b[i]);
	}
	// normalize the histogram
	for (var i = 0; i < 256; i++ ){
		hist.r[i]	/= max;
		hist.g[i]	/= max;
		hist.b[i]	/= max;
	}

	var sumR	= 0;
	var sumG	= 0;
	var sumB	= 0;
	for (var i = 0; i < 256; i++ ){
		sumR	+= hist.r[i];
		sumG	+= hist.g[i];
		sumB	+= hist.b[i];
	}
	console.log("sum", max, sumR, sumG, sumB)
}

ImageData.normalizeColorHistogram0	= function(colorHistogram)
{
	var hist= colorHistogram;

	// get the max value
	var max	= -Number.MAX_VALUE;
	for (var i = 0; i < 256; i++ )	max		= Math.max(max, hist.r[i]);
	for (var i = 0; i < 256; i++ )	hist.r[i]	/= max;
	var max	= -Number.MAX_VALUE;
	for (var i = 0; i < 256; i++ )	max		= Math.max(max, hist.g[i]);
	for (var i = 0; i < 256; i++ )	hist.g[i]	/= max;
	var max	= -Number.MAX_VALUE;
	for (var i = 0; i < 256; i++ )	max		= Math.max(max, hist.b[i]);
	for (var i = 0; i < 256; i++ )	hist.b[i]	/= max;

	var sumR = 0, sumG = 0, sumB = 0;
	for (var i = 0; i < 256; i++ ){
		sumR	+= hist.r[i];
		sumG	+= hist.g[i];
		sumB	+= hist.b[i];
	}
	console.log("sum", max, sumR, sumG, sumB)
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


	var barW	= canvas.width / 256;
	var barH	= canvas.height / 3;

	ctx.fillStyle	= 'red';
	var barYOffset	= 0 * barH;
	for (var i = 0; i < 256; i++ ){
		var valH	= Math.floor(hist.r[i]*barH);
		ctx.fillRect(i*barW, barYOffset+(barH-valH), barW, valH);
	}

	ctx.fillStyle	= 'green';
	var barYOffset	= 1 * barH;
	for (var i = 0; i < 256; i++ ){
		var valH	= Math.floor(hist.g[i]*barH);
		ctx.fillRect(i*barW, barYOffset+(barH-valH), barW, valH);
	}

	ctx.fillStyle	= 'blue';
	var barYOffset	= 2 * barH;
	for (var i = 0; i < 256; i++ ){
		var valH	= Math.floor(hist.b[i]*barH);
		ctx.fillRect(i*barW, barYOffset+(barH-valH), barW, valH);
	}

	var srcImgData	= ctx.getImageData(0,0, canvas.width, canvas.height);
	var pSrc	= srcImgData.data;
	var pDst	= imageData.data;
	for(var i = 0; i < pSrc.length; i += 4){
		if( pSrc[i+0] !== 0 || pSrc[i+1] !== 0 || pSrc[i+2] !== 0 ){
			pDst[i+0]	= pSrc[i+0];
			pDst[i+1]	= pSrc[i+1];
			pDst[i+2]	= pSrc[i+2];
		}
	}
}