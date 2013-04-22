# particles.js 

a particle engine ala vendor.js

## applications
* white smoke, like plane engine touched by another plane
* black smoke, like wet wood burning smoke
* plasma explosion
* blue particle trail

## tween
* function which receive a value between [0,1] and return a value between [0,1]
* see tween.js function as example
* see tweenMidi.js a tween function based on midi notes

## various steps
here are the various steps of a particles
* onCreate
* onDestroy
* onUpdate


## onUpdate with time to live

```
// max age in seconds
var maxAge	= 0.7;

var birthDate	= tQuery.nowSeconds();
var callback	= world.hook(function(delta, now){
	var age		= now - birthDate;
	if( age >= maxAge ){
		// all the on ```onDestroy``` block
		// ...
		return;	
	}
	
	// all the 'onUpdate' block
	// ...
})
```

### create a THREE.Sprite for your smoke puff

```
var texture	= THREE.ImageUtils.loadTexture('images/cloud10.png')
var material	= tQuery.createSpriteMaterial()
			.map(texture)
var object3d	= tQuery.createSprite(material).addTo(world)
			.position(tick.position())
```

good at 20fps

### create a THREE.Sprite for your sparkle

```
var texture	= THREE.ImageUtils.loadTexture('images/blue_particle.jpg')
var material	= tQuery.createSpriteMaterial()
			.map(texture)
			.color(0xAA4488)
			.transparent(true)
			.blending(THREE.AdditiveBlending)§		
var object3d	= tQuery.createSprite(material).addTo(world)
			.position(tick.position())
```

good at 60fps

### Steady Rate Emitter

```
// emit 10 sparkle per seconds
var emitterRate	= 10
setInterval(function(){

	// Condition to know if an sparkle must be emitter or not [optional]
	var emitCondition	= true;
	if( emitCondition === false )	return;

	// all your onCreate, onUpdate, onDestroy
	// ...

}, 1000/emitterRate)
```

#### emit condition based on player velocity

```
var cVelocity	= player.cannonjs().body().velocity;
var playerSpeed	= cVelocity.norm();
if( playerSpeed < 3 )	return;
```


### emit the object3D a bit behind the player

```
// onCreate
var cVelocity	= player.cannonjs().body().velocity;
var velocity	= tQuery.createVector3(cVelocity.x, cVelocity.y, cVelocity.z)
object3d.translate(velocity.multiplyScalar(-0.05))
```

### Tween Property with tweenmidi.js

```
// onInit - init your tween
var ageToScale	= (function(){
	//var tweenMidi	= new TweenMidi(3, 0.5, 0.5);
	var tweenMidi	= createTweenMidi(maxAge, 0.2*maxAge, 0.2*maxAge);
	return function(age){
		return 0.5 + 0.5 * tweenMidi(age)
	}
})();

// ...
// onCreate - set the initial value with age 0
material.scale( ageToScale(0) )

// ...
// onUpdate - update value based on age value
material.scale( ageToScale(age) )	
```

### Tween Property with tween.js function

```
// onInit - init your tween
var ageToScale	= function(age){
	return 3 + 3 * TWEEN.Easing.Linear.None(age / maxAge)
}

// ...
// onCreate - set the initial value with age 0
material.scale( ageToScale(0) )

// ...
// onUpdate - update value based on age value
material.scale( ageToScale(age) )	
```
