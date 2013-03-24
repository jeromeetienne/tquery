# tQuery.mirror

Handle mirror meshes easily
* [live example](http://jeromeetienne.github.com/tquery/plugins/mirror/examples/index.html)

## How to do a mirror ball

```
var mirror	= tQuery.createMirrorBall().addTo(world)
```

* mirror inherit from ```tQuery.Object3D```.
* [live example](http://jeromeetienne.github.com/tquery/plugins/mirror/examples/mirror-ball.html)

## How to do a mirror plane

```
var mirror	= tQuery.createMirrorPlane().addTo(world)
```

* mirror inherit from ```tQuery.Object3D```
* [live example](http://jeromeetienne.github.com/tquery/plugins/mirror/examples/mirror-plane.html)
* *TODO* close to the mirror, there is an artefact when the world camera got 
  a big angle with the mirror
  * this is due to the rotation of the frustum vs the mirror's plane
  * this is reducable by computing the height of this artefact
  * then pushin mirror camera that much further from the mirror's plane

