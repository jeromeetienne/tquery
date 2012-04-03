* to go in core, you need to be used everytime!
* tQuery is only an API change, no change in semantic
  * other functions
  * other default
  * same semantic
* a good api is
  * clear (clear for whom ?)
  * stable
  * well documented
* for api, copy jquery whenever possible
  * helpers may be provided, but jquery is the auhority
* must provide Access to three.js
  * ideally even easier
  * no requirement to cover it all
  * but must cover most common/cool features
* you must be able to easily go back and forth between three.js and tQuery.
* core has no require.js
  * dependancy between plugins handled by require.js
* tquery.js core depends only on the three.js
* the only global defined is tQuery
* not to disrupt devs habits is important for a lib
* put sanity check when possible
  * any misuse should be detected as soon as possible
* instrumentability
  * stuff must be usable by computers
* between 2 alternatives, one cooked, one raw, pick the raw one
  * especially in case of doubt
* a screencast should be simple, informative and apropos
  * simple: to easily understandable by the audience
  * informative: well to be usefull
* to show the possibilities of a plugin, one can do a "playground"
  * aka a simple display of the plugin features,
  * and a dat.gui with the paramers to play with


## directions
* "For those who want to know webgl, good news! You already know it, just replace j by t!"
  * make this statement true
* "webgl should not be harder than playing with lego."
* "WebGL for jQuery enthousiasts"

## Name Conventions
* suppose you want to create a material plugin about fireball
* file tquery.fireballmaterial.js
* classname tQuery.FileballMaterial
* ctor: tQuery.FileballMaterial and new tQuery.FileballMaterial()
* naming convention is more readable

* provide .create*() functions to avoid new everywhere
  * see in Object.Create()
  * seen in domElement.createElement()

* geometry varname represents tQuery.Geometry instance
  * tGeometry varname represents THREE.Geometry
  * and so on in the principles
  

