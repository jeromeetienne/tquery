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

## about mirror plane and angle compensation

* all computations are done in local-coordinates space of the mirror

first some definitions

* mirror plane: the THREE.Plane representing the mirror in the scene
* mirror width: the width of the mirrorPlane
* mirrorHalfWidth: mirrorWidth divided by 2
* user camera: the camera thru which the user is looking at the scene
* mirror camera: the camera of 'what the mirror is seeing'
  * it has the z-symmetric position of the user camera
  * it looks at the center of the mirror plane
  * the near plane intersect the mirror plane
  * its fov matchs the mirror size
* angle(mirrorPlane, userCamera): the angle between the mirror plane and the user camera
  * === angle(mirrorPlane, mirrorCamera)
 