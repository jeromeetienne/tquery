// NOTE: this match THREE namespace on purpose
if(typeof THREEx === "undefined")		var THREEx	= {};
if(typeof THREEx.Texture === "undefined")	THREEx.Texture	= {};

/**
*/
THREEx.Texture.PoolBall	= {
	/**
	 * display the shaddow of the smiley in a texture
	 *
	 * @param {canvasElement} the canvas where we draw
	*/
	draw	: function(canvas, textData, stripped, fillStyle){
		var ctx		= canvas.getContext( '2d' );
		var w		= canvas.width;
		var h		= canvas.height;
		
		// base color is white
		ctx.save();
		ctx.fillStyle	= "#FFFFFF";
		ctx.fillRect(0,0, w, h);
		ctx.restore();

		// do the strip/full
		ctx.save();
		ctx.translate(w/2, h/2)
		var rectH	= stripped ? h/2 : h;
		ctx.fillStyle	= fillStyle;
		ctx.fillRect(-w/2,-rectH/2, w, rectH);
		ctx.restore();
		
		if( textData ){
			// do white circle around textData
			ctx.save();
			ctx.translate(w/4, h/2)
			ctx.fillStyle	= "#FFFFFF";
			var radiusW	= 0.7 * w/4;
			var radiusH	= 1.2 * h/4;
			ctx.fillEllipse( -radiusW/2, -radiusH/2, radiusW, radiusH);
			ctx.restore();

			// draw text data
			ctx.save();
			ctx.translate(w/4, h/2)
			var textH	= w/4;
			ctx.font	= "bolder "+textH+"px Arial";
			ctx.fillStyle	= "#000000";
			var textW	= ctx.measureText(textData).width;
			ctx.fillText(textData, -textW/2, 0.8*textH/2);
			ctx.restore();			
		}
	},

//////////////////////////////////////////////////////////////////////////////////
//		texture helper							//
//////////////////////////////////////////////////////////////////////////////////
	
	ballTexture: function( textData, stripped, fillStyle, canvasW, mapping ){
		canvasW		= typeof canvasW !== 'undefined' ? canvasW : 512;
		// create the canvas
		var canvas	= document.createElement('canvas');
		canvas.width	= canvas.height	= canvasW;
		// create the texture
		var texture	= new THREE.Texture(canvas, mapping);
		texture.needsUpdate	= true;
		// draw in the texture
		this.draw(canvas, textData, stripped, fillStyle);
		// return the texture
		return texture;
	},
}