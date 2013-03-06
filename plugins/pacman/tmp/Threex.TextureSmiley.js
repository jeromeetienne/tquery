// NOTE: this match THREE namespace on purpose
if(typeof THREEx === "undefined")		var THREEx	= {};
if(typeof THREEx.Texture === "undefined")	THREEx.Texture	= {};

/**
 * - depends on a lib excanvas which isnt there
 * - to get idea on how to draw
 *   http://www.wpclipart.com/smiley/glossy_smiley/glossy_pink_smileys/glossy_smiley_pink_angry.png.html
*/
THREEx.Texture.Smiley	= {
	clear	: function(canvas){
		var w	= canvas.width;
		var ctx	= canvas.getContext( '2d' );
		clearRect(0, 0, w, w);	
	},
	/**
	 * display an happy smiley on a canvas for texture
	 *
	 * @param {canvasElement} the canvas where we draw
	*/
	happy	: function(canvas){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
		
		var eyeDx	= w/16;
		var eyeDy	= w/12;
	
		var eyeW	= w/16;
		var eyeH	= w/6;
		
		var mouthW	= w/12;
		var mouthDy	= w/12;
		var mouthRbeg	= 0;
		var mouthRend	= 180 * Math.PI / 180;
			
		ctx.fillStyle = "rgb(0,0,0)";
		
		// right eyes
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
		ctx.restore();
	
		// left eyes
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.fillEllipse(- eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
		ctx.restore();
		
		// right part of the mouth
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2 - w/4, w/2);
		ctx.arc(0, mouthDy, mouthW, mouthRbeg, mouthRend, false)
		ctx.fill();
		ctx.restore();	
	},
	/**
	 * display an hurt smiley on a canvas for texture
	*/
	hurt	: function(canvas){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
	
		var eyeDx	= w/16;
		var eyeDy	= w/12;
	
		var eyeW	= w/24;
		var eyeH	= w/9;
	
		var mouthW	= w/12;
		var mouthDx	= 0;
		var mouthDy	= w/12;
	
		ctx.fillStyle	= "#000000";
		ctx.lineCap	= "round";
		ctx.lineWidth	= w/48;

		// right eyes
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2 - w/4, w/2);
		ctx.translate(eyeDx, -eyeDy);
		ctx.moveTo(-eyeW/2, -eyeH/2);
		ctx.lineTo(+eyeW/2, +eyeH/2);
		ctx.stroke();		
		ctx.moveTo(+eyeW/2, -eyeH/2);
		ctx.lineTo(-eyeW/2, +eyeH/2);
		ctx.stroke();
		ctx.restore();
	
		// left eyes
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2 - w/4, w/2);
		ctx.translate(-eyeDx, -eyeDy);
		ctx.moveTo(-eyeW/2, -eyeH/2);
		ctx.lineTo(+eyeW/2, +eyeH/2);
		ctx.stroke();				
		ctx.moveTo(+eyeW/2, -eyeH/2);
		ctx.lineTo(-eyeW/2, +eyeH/2);
		ctx.stroke();
		ctx.restore();

	
		ctx.lineWidth	= w/32;

		// mouth flat (rigth)
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2 - w/4, w/2);
		ctx.translate(+mouthDx, +mouthDy);
		ctx.moveTo(-mouthW/2, 0);
		ctx.lineTo(+mouthW/2, 0);
		ctx.stroke();
		ctx.restore();
	},

	/**
	 * display an angry smiley on a canvas for texture
	*/
	angry	: function(canvas){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
		
		var eyeDx	= w/16;
		var eyeDy	= w/10;
	
		var eyeW	= w/12;
		var eyeH	= w/10;
		
		var mouthW	= w/12;
		var mouthDy	= w/10;
		var mouthRbeg	= 180 * Math.PI / 180;
		var mouthRend	= 0;
			
		ctx.fillStyle = "rgb(0,0,0)";
		
		var eyeBrowW	= w/6;
		var eyeBrowH	= w/20;
		var eyeBrowDx	= w/16;
		var eyeBrowDy	= w/5;
		var eyeBrowRot	= 30*Math.PI/180;
		
		// right eyebrow
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.translate(eyeBrowDx, -eyeBrowDy);
		ctx.rotate(-eyeBrowRot)
		ctx.fillRect( -eyeBrowW/2, -eyeBrowH/2, eyeBrowW, eyeBrowH);
		ctx.restore();
	
		//// right eyes
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
		ctx.restore();

		// left eyebrow
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.translate(-eyeBrowDx, -eyeBrowDy);
		ctx.rotate(+eyeBrowRot)
		ctx.fillRect( -eyeBrowW/2, -eyeBrowH/2, eyeBrowW, eyeBrowH);
		ctx.restore();
	
		// left eyes
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.fillEllipse(- eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
		ctx.restore();
		
		// the mouth
		ctx.save();
		ctx.beginPath();
		ctx.translate(w/2 - w/4, w/2);
		ctx.arc(0, mouthDy, mouthW, mouthRbeg, mouthRend, false)
		ctx.fill();
		ctx.restore();	
	},

	/**
	 * display an happy smiley on a canvas for texture
	 *
	 * @param {canvasElement} the canvas where we draw
	*/
	pupil	: function(canvas){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
		
		var eyeDx	= 0;
		var eyeDy	= 0;
	
		var eyeW	= w/12;
		var eyeH	= w/3;
		
		ctx.fillStyle	= "#000000";
		
		// pupil 
		ctx.save();
		ctx.translate(w/2 - w/4, w/2);
		ctx.fillEllipse(eyeDx - eyeW/2, - eyeDy - eyeH/2, eyeW, eyeH);
		ctx.restore();
	},

	/**
	 * display the shaddow of the smiley in a texture
	 *
	 * @param {canvasElement} the canvas where we draw
	*/
	shaddow	: function(canvas){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
		
		ctx.fillStyle	= "#333333";

		var circleW	= 8*w/8;
		var circleH	= 8*w/8;
		
		ctx.save();
		ctx.translate(w/2 , w/2);
		ctx.fillEllipse(-circleW/2, -circleH/2, circleW, circleH);
		ctx.restore();
	},
	
	/**
	 * display the shaddow of the smiley in a texture
	 *
	 * @param {canvasElement} the canvas where we draw
	*/
	textOnBack	: function(canvas, textData, fontSize){
		var w		= canvas.width;
		var ctx		= canvas.getContext( '2d' );
		
		ctx.fillStyle	= "#000000";
		
		ctx.save();
		ctx.translate(+3*w/4, w/2-w/32)
		ctx.font	= "bolder "+fontSize+" Arial";
		var textW	= ctx.measureText(textData).width;
		ctx.strokeStyle	= "rgb(0,0,0)";
		//console.log("measutreText", ctx.measureText(textData));
		ctx.fillText(textData, -textW/2, 0);
		ctx.restore();
	},

//////////////////////////////////////////////////////////////////////////////////
//		texture helper							//
//////////////////////////////////////////////////////////////////////////////////
	
	happyTexture: function( canvasW, mapping, callback ) {
		var canvasDrawer	= THREEx.Texture.Smiley.happy;
		return THREEx.Texture.Smiley._buildTexture( canvasW, mapping, callback, canvasDrawer );
	},
	hurtTexture: function( canvasW, mapping, callback ) {
		var canvasDrawer	= THREEx.Texture.Smiley.hurt;
		return THREEx.Texture.Smiley._buildTexture( canvasW, mapping, callback, canvasDrawer );
	},
	angryTexture: function( canvasW, mapping, callback ) {
		var canvasDrawer	= THREEx.Texture.Smiley.angry;
		return THREEx.Texture.Smiley._buildTexture( canvasW, mapping, callback, canvasDrawer );
	},
	pupilTexture: function( canvasW, mapping, callback ) {
		var canvasDrawer	= THREEx.Texture.Smiley.pupil;
		return THREEx.Texture.Smiley._buildTexture( canvasW, mapping, callback, canvasDrawer );
	},
	shaddowTexture: function( canvasW, mapping, callback ) {
		var canvasDrawer	= THREEx.Texture.Smiley.shaddow;
		return THREEx.Texture.Smiley._buildTexture( canvasW, mapping, callback, canvasDrawer );
	},
	
	_buildTexture: function( canvasW, mapping, callback, canvasDrawer ) {
		canvasW		= typeof canvasW !== 'undefined' ? canvasW : 64;
		var canvas	= document.createElement('canvas');
		canvas.width	= canvas.height	= canvasW;
		var texture	= new THREE.Texture(canvas, mapping);

		canvasDrawer(canvas);

		texture.needsUpdate	= true;
		if( callback )	callback( this );
		return texture;
	},

}