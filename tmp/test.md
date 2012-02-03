ok i will try to give an example. It doesnt represent everything, i will explain more over the weekend.
Here is some code which does a plugin on ```THREE.Geometry```. Such tech can be used to make plugins
on most object in THREE namespace.

in my opinion, the strong point is that the plugins and three.js arent on the same namespace.

So the plugin ecosystem can't collide with three.js.
The people doing plugins doesnt need to come to three.js and ask permissions, so three.js devs can focus on what they do best, aka coding three.js.
Like jquery plugin ecosystem, it is the up to the plugin user to handle them. and By experience plugins devs do their best to avoid conflict
as it is nobody interest.

ok now the code.

```
var geometry	= new THREE.CubeGeometry(1,1,1);
console.assert( geometry instanceof THREE.Geometry );
```

i named the experience tQuery as it seems suitable :) here is a plugin
zoom at the geometry level, aka not object3d.scale vector3.
tQuery(geometry) return an instance of tQuery.Geometry. which contains a method ```zoom```.
a plugin made by somebody external.

```
var factor	= new THREE.Vector3(2,2,2);
tQuery(geometry).zoom(factor);
// here geometry is modified 
```

Here is how to define the plugins

* ```zoom``` is a random plugin of tQuery.Geometry. it is possible to do the same with tQuery.Object3D, tQuery.Light etc....
* tQuery.Geometry.register() register the plugin on tQuery.Geometry, not THREE.Geometry
* it does sanity check to ensure that nobody else declared another plugin called zoom

```javascript
tQuery.Geometry.register('zoom', function(vector3){
	this.each(function(geometry){

		for(var i = 0; i < geometry.vertices.length; i++) {
			var vertex	= geometry.vertices[i];
			vertex.position.multiplySelf(vector3); 
		}

		geometry.__dirtyVertices = true;
		geometry.computeBoundingBox();
	});
	return this;	// for chained API
});
```