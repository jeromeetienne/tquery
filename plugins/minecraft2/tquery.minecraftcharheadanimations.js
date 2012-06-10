tQuery.register('MinecraftCharHeadAnimations', function(){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	var tweenAngle	= function(baseValue, nextValue, timePercent){
		if( nextValue - baseValue >  Math.PI )	nextValue	-= Math.PI*2;
		if( nextValue - baseValue < -Math.PI )	nextValue	+= Math.PI*2;
		return (1-timePercent) * baseValue + timePercent * nextValue;
	}

	
	var onUpdate	= function(position){
		character.parts.headGroup.rotation.y	= position.headRotationY
		character.parts.headGroup.rotation.z	= position.headRotationZ;
	};
	var onCapture	= function(position){
		position.headRotationY	= character.parts.headGroup.rotation.y;
		position.headRotationZ	= character.parts.headGroup.rotation.z;
	};
	var propTweens	= {
		headRotationY	: tweenAngle,
		headRotationZ	: tweenAngle
	};
	
	
	// Setup 'still' animation
	animations.add('still'	, tQuery.createAnimation().pushKeyframe(0.5, {
		headRotationY	: 0,
		headRotationZ	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'no' animation
	animations.add('no'	, tQuery.createAnimation().pushKeyframe(0.5, {
		headRotationY	: +Math.PI/6,
		headRotationZ	: 0
	}).pushKeyframe(0.5, {
		headRotationY	: -Math.PI/6,
		headRotationZ	: 0
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'yes' animation
	animations.add('yes'	, tQuery.createAnimation().pushKeyframe(0.3, {
		headRotationY	: 0,
		headRotationZ	: +Math.PI/8
	}).pushKeyframe(0.3, {
		headRotationY	: 0,
		headRotationZ	: -Math.PI/8
	}).propertyTweens(propTweens).onCapture(onCapture).onUpdate(onUpdate));
});


tQuery.inherit(tQuery.MinecraftCharHeadAnimations, tQuery.Animations);
