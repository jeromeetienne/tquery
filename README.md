## How to Get Started

or how to get the boilerplate :)
boilerplate for tquery is a template to get you started. You download it and
modify it until it fits your needs. It is a fast way to start a
clean project with tquery.
The running boilerplate looks [like that](http://jeromeetienne.github.com/tqueryboilerplate/).

Want to run it on your computer ?
First you get boilerplate's files
[here](https://github.com/downloads/jeromeetienne/tquery/tqueryboilerplate.zip).
Then you launch the http server to serve them. Here is a little shell script which does it all.

```bash
curl -OL https://github.com/downloads/jeromeetienne/tquery/tqueryboilerplate.zip
unzip tqueryboilerplate.zip
cd tqueryboilerplate
make server
```

Then you open a browser on [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to
see it running. Up to you to modify ```index.html``` until it fits your needs. ```index.html```
looks like the code below... Quite short.

```html
<!doctype html><title>Minimal tQuery Page</title>
<script src="./tquery-all.js"></script>
<body><script>
    var world   = tQuery.createWorld().boilerplate().start();
    var object  = tQuery.createTorus().addTo(world);
</script></body>
```

## Changelog


#### Current

#### Release - r53.0
* ported to three.js r53

#### Release - r52.0
* ported to three.js r52

#### Release - r51.0
* ported to three.js r51
* added tQuery.montainarena plugin - usefull for arena
* added ogsworkshop
* added webrtc.io

#### Release - r50.2

* added require.js for webgl-inspector
* support for object3d.positionX(2) getter/setter (for x,y,z and position/rotation/scale)
* support for object3d.position() getter
* remove ambiguous .register() - now .registerInstance() and .registerStatic() - see #117
* support dev branch on github - master being the last stable release

#### Release - r50.1

* implemented tQuery.now() - act as Date.now() with Performance.now() performance
* notify tQuery.Loop hooks with Performance.now() precision
* tQuery.extend() now support deep copy
* renamed tQuery.convert.toBool to tQuery.convert.toBoolean
* tquery.datguituner plugin - build a Dat.GUI on existing Scene Graph
  * Very usefull to fine tune parameters
* added tQuery.gsvpano - easy interface with gsvpano.js
* added nice looking earth in tquery.planets 
* added tquery.statsplus - like stats.js but report memory and renderer stats
* added tquery.flocking - early version
* much better require.js support

#### Release - r50.0

* ported three.js r50
* ported to require.js - see plugins/require.js
* added plugins/lightsaber
* added plugins/lensflare
* added plugins/lavamaterial
* added plugins/buffergeometry
* working on postprocessing in tQuery.World
* added catmull-clark subdivision in tQuery.Geometry.smooth()
* improved home page with more screenshots and link to tutorials
* added .clone() to ```tQuery.Object3D```
* added attributes to ```tQuery.Object3D``` (needed for shadow)
* added plugins/skymap to handle textureCube and skymap
* added plugins/bluesky to generate blue sky html page background - no texture

#### Release - r49.1

* support IOS
* support canvasRenderer 
* included doccoviewer to visualize annoted source
* added plugins/glfx.js as example of interaction with glfx.js

#### Release - r49.0

* First numbered release (synched on three.js version)

## Distributions

build/tquery.js: tquery core - 6k gzip+min

build/tquery-bundle.js: es5-shim + tquery core + three.js + boilerplate - 100k gzip+min

build/tquery-all.js: tquery bundle + all the plugin in incubations - infinite size - dont use :)

