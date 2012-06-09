tQuery.register('MinecraftCharAnimations', function(){
	var animations	= this;
	// call parent ctor
	tQuery.MinecraftCharAnimations.parent.constructor.call(this)
	
	// Setup 'run' animation
	var angleRange	= Math.PI/2-Math.PI/10;
	animations.add('run'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange			
	}).pushKeyframe(0.5, {
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).onCapture(function(position){
		position.armRotationZ	= character.parts.armR.rotation.z;
		position.legRotationZ	= character.parts.legR.rotation.z;
	}).onUpdate(function(position){
		character.parts.armR.rotation.z	=  position.armRotationZ;
		character.parts.armL.rotation.z = -position.armRotationZ;
		character.parts.legR.rotation.z	=  position.legRotationZ;
		character.parts.legL.rotation.z = -position.legRotationZ;
	}));

	// Setup 'walk' animation
	var angleRange	= Math.PI/3-Math.PI/10;
	animations.add('walk'	, tQuery.createAnimation().pushKeyframe(0.5, {
		armRotationZ	: +angleRange,
		legRotationZ	: -angleRange		
	}).pushKeyframe(0.5, {
		armRotationZ	: -angleRange,
		legRotationZ	: +angleRange
	}).onCapture(function(position){
		position.armRotationZ	= character.parts.armR.rotation.z;
		position.legRotationZ	= character.parts.legR.rotation.z;
	}).onUpdate(function(position){
		character.parts.armR.rotation.z	=  position.armRotationZ;
		character.parts.armL.rotation.z = -position.armRotationZ;
		character.parts.legR.rotation.z	=  position.legRotationZ;
		character.parts.legL.rotation.z = -position.legRotationZ;
	}));

	// Setup 'stand' animation
	animations.add('stand', tQuery.createAnimation().pushKeyframe(0.5, {
		armRotationZ	: 0,
		legRotationZ	: 0
	//}).pushKeyframe(0.5, {
	//	armRotationZ	: 0,
	//	legRotationZ	: 0
	}).onCapture(function(position){
		position.armRotationZ	= character.parts.armR.rotation.z;
		position.legRotationZ	= character.parts.legR.rotation.z;
	}).onUpdate(function(position){
		character.parts.armR.rotation.z	=  position.armRotationZ;
		character.parts.armL.rotation.z = -position.armRotationZ;
		character.parts.legR.rotation.z	=  position.legRotationZ;
		character.parts.legL.rotation.z = -position.legRotationZ;
	}));
});


tQuery.inherit(tQuery.MinecraftCharAnimations, tQuery.Animations);
