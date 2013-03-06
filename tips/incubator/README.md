### how to include plugins with require.js
* be sure to use ```tquery-bundle-require.js```
* it will declare a bunch of plugins directly loadable
* say you need ```tquery.minecraft```, ```tquery.pproc``` and ```tquery.webaudio```

```
	<!doctype html><title>Minimal tQuery Page</title>
	<script src="../../../build/tquery-bundle-require.js"></script>
	<body><script>
	require([ 'tquery.minecraft'
		, 'tquery.pproc'
		, 'tquery.webaudio'
	], function(){
		// here all the javascript is loaded
		// so start writting here
	});
	</script></body> 
```

### How to make a class eventable

* any class can become an event emitter, just do

```
tQuery.MicroeventMixin(tQuery.World.prototype)
```

It makes ```tQuery.World``` able to trigger events. Just do this from inside the class

```
this.dispatchEvent('mySuperEvent', 'john', 'smith')
```

Now any listener will be immediatly notified. To add a listener, just do

```
world.addEventListener('mySuperEvent', function(firstName, lastName){
	// your code goes here
	// firstName	=== 'john'
	// secondName	=== 'lastName'
});
```

this is the library gowiththeflow.js which provides events

### how to make a class inherit from another

* an example for tQuery.Material

```
// inherit from tQuery.Material
tQuery.inherit(tQuery.MeshBasicMaterial, tQuery.Material);
```

if will do the magic to get inheritance in javascript, and declare 
```tQuery.MeshBasicMaterial.parent``` to point on 
```tQuery.Material.prototype```.

* in the constructor of the child class, you may call the parent class constructor.

```
	// call parent ctor
	tQuery.MeshBasicMaterial.parent.constructor.apply(this, arguments)
```

* if,in the child class, you want to overload a given method from the parent
class, just do

```
tQuery.MeshBasicMaterial.prototype.foobar	= function(){
	// your code goes here
}
```

* if you want to call the parent method too, inside the function above, do

```
	tQuery.MeshBasicMaterial.parent.foobar.apply(this, arguments);
```









