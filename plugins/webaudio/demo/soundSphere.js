var SoundSphere	= function(webaudio, soundUrl){	
	var group	= tQuery.createObject3D();
	this._group	= group;

	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0xFF5588,
		specular: 0xCC88ff,
		shininess: 400
	});

	var post	= tQuery.createCube(0.1,1.5,0.1, material).addTo(group)
		.translateY(1.5/2);
	var sphere	= tQuery.createSphere(0.5, 32, 16, material).addTo(group)
		.translateY(1.5);


	// setup .castShadow	
	post.get(0).castShadow	= true;
	sphere.get(0).castShadow= true;
	
	// create the webaudio sound
	var sound	= new tQuery.WebAudio.Sound(webaudio);
	sound.load(soundUrl, function(sound){
		sound._source.loop	= true;
		//sound.volume(0.5);
		sound.play();
	});
	// update sound position with this._group position
	world.loop().hook(function(deltaTime){
		var object3d	= this._group.get(0);
		sound.updateWithObject3d(object3d, deltaTime)
	}.bind(this));

	this._initSoundScale(sound, sphere);
};

SoundSphere.prototype.object3D	= function(){
	return this._group;
}

SoundSphere.prototype._initSoundScale	= function(sound, object){
	var analyser	= sound._analyser;
	var freqByte	= new Uint8Array(analyser.frequencyBinCount);
	analyser.smoothingTimeConstant = 0.6;

	var minColor	= new THREE.Color(0x1111FF);
	var maxColor	= new THREE.Color(0xFFaaFF);

	tQuery.world.loop().hook(function(){
		analyser.getByteFrequencyData(freqByte);
		var nb		= 2;
		var total	= 0;
		for(var i = 0; i < nb; i++){
			total	+= freqByte[i];
		}
		var scale	= total / (nb*256-1);
		console.assert(scale >= 0.0);
		console.assert(scale <= 1.0);

		object.scale(scale*1.5+0.5);

		var colorScale	= scale*1;
		colorScale	= Math.max(colorScale, 0)
		colorScale	= Math.min(colorScale, 1)
		var colorR	= colorScale * (maxColor.r - minColor.r) + minColor.r;
		var colorG	= colorScale * (maxColor.g - minColor.g) + minColor.g;
		var colorB	= colorScale * (maxColor.b - minColor.b) + minColor.b;
		object.get(0).material.color.setRGB(colorR, colorG, colorB);
	})
}

