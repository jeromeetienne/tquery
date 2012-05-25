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

#### Head

* working on postprocessing in tQuery.World
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

