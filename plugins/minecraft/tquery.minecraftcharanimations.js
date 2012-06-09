tQuery.register('MinecraftCharAnimations', function(){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	
	var onUpdate	= function(position){
		character.parts.armR.rotation.x	= position.armRRotationX;
		character.parts.armL.rotation.x	= position.armLRotationX;

		character.parts.armR.rotation.z	=  position.armRotationZ;
		character.parts.armL.rotation.z = -position.armRotationZ;

		character.parts.legR.rotation.z	=  position.legRotationZ;
		character.parts.legL.rotation.z = -position.legRotationZ;
	};
	var onCapture	= function(position){
		position.armLRotationX	= character.parts.armL.rotation.x;
		position.armRRotationX	= character.parts.armR.rotation.x;
		position.armRotationZ	= character.parts.armR.rotation.z;
		position.legRotationZ	= character.parts.legR.rotation.z;
	};
	
	
	// Setup 'run' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('run'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange			
	}).pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'walk' animation
	var angleRange	= Math.PI/3-Math.PI/10;
	animations.add('walk'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange		
	}).pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'stand' animation
	animations.add('stand', tQuery.createAnimation().pushKeyframe(0.2, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: 0,
		legRotationZ	: 0
	}).pushKeyframe(0.2, {
		armLRotationX	: 0,
		armRRotationX	: 0,
		armRotationZ	: 0,
		legRotationZ	: 0
	}).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'wave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('wave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: Math.PI+2*Math.PI/5,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).pushKeyframe(0.5, {
		armLRotationX	: 0,
		armRRotationX	: Math.PI+Math.PI/10,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).onCapture(onCapture).onUpdate(onUpdate));

	// Setup 'hiwave' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('hiwave'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armLRotationX	: Math.PI-3*Math.PI/5,
		armRRotationX	: Math.PI+3*Math.PI/5,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).pushKeyframe(0.5, {
		armLRotationX	: Math.PI-Math.PI/10,
		armRRotationX	: Math.PI+Math.PI/10,
		armRotationZ	: 0,
		legRotationZ	: 0			
	}).onCapture(onCapture).onUpdate(onUpdate));
});


tQuery.inherit(tQuery.MinecraftCharAnimations, tQuery.Animations);
