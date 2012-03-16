var SoundCone	= function(webaudio, soundUrl, opts){
	this._opts	= opts = tQuery.extend(opts, {
		minColorHex	: 0x1111FF,
		maxColorHex	: 0xFF4400,
		colorScale	: 1.6,
		volume		: 1.0
		
	});
	var group	= tQuery.createObject3D();
	this._group	= group;

	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0xFFffff
	});

		
	var post	= tQuery.createCube(0.1,1.5,0.1, material).addTo(group)
		.translateY(1.5/2);
	var cone	= tQuery.createCylinder(0.5, 0, 1, 16, 4, material).addTo(group)
		.geometry()
			.rotateX(Math.PI/2)
			.back()
		.translateY(1.5).translateZ();
	this._cone	= cone;

	// setup .castShadow	
	post.get(0).castShadow	= true;
	cone.get(0).castShadow	= true;

	world.loop().hook(function(){
		cone.rotateY(0.01);
	}.bind(this));

	// create the webaudio sound
	var sound	= new THREEx.WebAudio.Sound(webaudio);
	sound.load(soundUrl, function(sound){
		sound._source.loop	= true;
		sound.play();
	});
	// update sound position with this._group position
	world.loop().hook(function(deltaTime){
		sound.updateWithObject3d(cone.get(0), deltaTime);
	}.bind(this));

	sound.volume(opts.volume);
	sound.pannerCone(Math.PI/10*8, Math.PI/10*8, 0.25);
	this._initSoundScale(sound, cone);
};

SoundCone.prototype.object3D	= function(){
	return this._group;
}

SoundCone.prototype._initSoundScale	= function(sound, object){
	var analyser	= sound._analyser;
	var freqByte	= new Uint8Array(analyser.frequencyBinCount);
	analyser.smoothingTimeConstant = 0.6;
	
	var minColor	= new THREE.Color(this._opts.minColorHex);
	var maxColor	= new THREE.Color(this._opts.maxColorHex);

	tQuery.world.loop().hook(function(deltaTime){
		analyser.getByteFrequencyData(freqByte);
		var nb		= 2;
		var total	= 0;
		for(var i = 0; i < nb; i++){
			total	+= freqByte[i];
		}
		var scale	= total / (nb*256-1);
		console.assert(scale >= 0.0);
		console.assert(scale <= 1.0);

		// set object scale
		object.scale(scale*1.5+0.5);
		
		// set object color
		var intensity	= scale*this._opts.colorScale;
		intensity	= Math.max(intensity, 0)
		intensity	= Math.min(intensity, 1)
		var colorR	= intensity * (maxColor.r - minColor.r) + minColor.r;
		var colorG	= intensity * (maxColor.g - minColor.g) + minColor.g;
		var colorB	= intensity * (maxColor.b - minColor.b) + minColor.b;
		object.get(0).material.color.setRGB(colorR, colorG, colorB);
	}.bind(this))
}

