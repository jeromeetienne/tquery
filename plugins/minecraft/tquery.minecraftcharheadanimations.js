tQuery.registerStatic('createMinecraftCharHeadAnimations', function(character){
	return new tQuery.MinecraftCharHeadAnimations(character);
});

tQuery.registerStatic('MinecraftCharHeadAnimations', function(character){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	var tweenAngle	= function(baseValue, nextValue, timePercent){
		if( nextValue - baseValue >  Math.PI )	nextValue	-= Math.PI*2;
		if( nextValue - baseValue < -Math.PI )	nextValue	+= Math.PI*2;
		return (1-timePercent) * baseValue + timePercent * nextValue;
	}

	
	var onUpdate	= function(position){
		character.parts.headGroup.rotation.x	= position.headRotationX;
		character.parts.headGroup.rotation.y	= position.headRotationY
	};
	var onCapture	= function(position){
		position.headRotationX	= character.parts.headGroup.rotation.x;
		position.headRotationY	= character.parts.headGroup.rotation.y;
	};
	var propTweens	= {
		headRotationX	: tweenAngle,
		headRotationY	: tweenAngle
	};
	
	
	// Setup 'still' animation
	animations.add('still'	, tQuery.createAnimation().pushKeyframe(0.5, {
		headRotationX	: 0,
		headRotationY	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'no' animation
	animations.add('no'	, tQuery.createAnimation().pushKeyframe(0.5, {
		headRotationX	: 0,
		headRotationY	: +Math.PI/6
	}).pushKeyframe(0.5, {
		headRotationX	: 0,
		headRotationY	: -Math.PI/6
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'yes' animation
	animations.add('yes'	, tQuery.createAnimation().pushKeyframe(0.4, {
		headRotationY	: 0,
		headRotationX	: +Math.PI/8
	}).pushKeyframe(0.4, {
		headRotationX	: -Math.PI/8,
		headRotationY	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
});


tQuery.inherit(tQuery.MinecraftCharHeadAnimations, tQuery.Animations);
