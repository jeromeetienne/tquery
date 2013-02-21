tQuery.registerStatic('createMinecraftCharAnimations', function(character){
	return new tQuery.MinecraftCharAnimations(character);
});

tQuery.registerStatic('MinecraftCharAnimations', function(character){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	var tweenAngle	= function(baseValue, nextValue, timePercent){
		// compute the nextValue to get the shortest path - assume it is an angle
		if( nextValue - baseValue > +Math.PI )	nextValue -= Math.PI*2;
		if( nextValue - baseValue < -Math.PI )	nextValue += Math.PI*2;
		return (1-timePercent) * baseValue + timePercent * nextValue;
	}

	
	var onUpdate	= function(position){
		character.parts.armR.rotation.z	= position.armRRotationZ;
		character.parts.armL.rotation.z	= position.armLRotationZ;

		character.parts.armR.rotation.x	=  position.armRotationX;
		character.parts.armL.rotation.x = -position.armRotationX;

		character.parts.legR.rotation.x	=  position.legRotationX;
		character.parts.legL.rotation.x = -position.legRotationX;
	};
	var onCapture	= function(position){
		position.armLRotationZ	= character.parts.armL.rotation.z;
		position.armRRotationZ	= character.parts.armR.rotation.z;
		position.armRotationX	= character.parts.armR.rotation.x;
		position.legRotationX	= character.parts.legR.rotation.x;
	};
	var propTweens	= {
		armLRotationZ	: tweenAngle,
		armRRotationZ	: tweenAngle,
		armRotationX	: tweenAngle,
		legRotationX	: tweenAngle		
	}
	
	
	// Setup 'run' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('run'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: +angleRange,
		legRotationX	: -angleRange			
	}).pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: -angleRange,
		legRotationX	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'walk' animation
	var angleRange	= Math.PI/3-Math.PI/10;
	animations.add('walk'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/30,
		armRRotationZ	: -Math.PI/30,
		armRotationX	: +angleRange,
		legRotationX	: -angleRange		
	}).pushKeyframe(0.5, {
		armLRotationZ	: +Math.PI/30,
		armRRotationZ	: -Math.PI/30,
		armRotationX	: -angleRange,
		legRotationX	: +angleRange
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'stand' animation
	animations.add('stand', tQuery.createAnimation().pushKeyframe(0.3, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: 0,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'wave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('wave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: 0,
		armRRotationZ	: Math.PI+2*Math.PI/5,
		armRotationX	: 0,
		legRotationX	: 0			
	}).pushKeyframe(0.5, {
		armLRotationZ	: 0,
		armRRotationZ	: Math.PI+Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'hiwave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('hiwave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationZ	: Math.PI-3*Math.PI/5,
		armRRotationZ	: Math.PI+3*Math.PI/5,
		armRotationX	: 0,
		legRotationX	: 0			
	}).pushKeyframe(0.5, {
		armLRotationZ	: Math.PI-Math.PI/10,
		armRRotationZ	: Math.PI+Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0			
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'circularPunch' animation
	var delay	= 1/5;
	animations.add('circularPunch'	, tQuery.createAnimation().pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: 0,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: -Math.PI/2,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: -Math.PI,
		legRotationX	: 0
	}).pushKeyframe(delay, {
		armLRotationZ	: 0,
		armRRotationZ	: 0,
		armRotationX	: +Math.PI/2,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'rightPunch' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('rightPunch', tQuery.createAnimation().pushKeyframe(0.1, {
		armLRotationZ	: +Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: 0,
		legRotationX	: 0
	}).pushKeyframe(0.3, {
		armLRotationZ	: -Math.PI/10,
		armRRotationZ	: -Math.PI/10,
		armRotationX	: +Math.PI/2+Math.PI/5,
		legRotationX	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
});


tQuery.inherit(tQuery.MinecraftCharAnimations, tQuery.Animations);
