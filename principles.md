* to go in core, you need to be used everytime!
* tQuery is only an API change, no change in semantic
  * other functions
  * other default
  * same semantic
* a good api is
  * clear (clear for whom ?)
  * stable
  * well documented
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

## directions
* "For those who want to know webgl, good news! You already know it, just replace j by t!"
  * make this statement true
* "webgl should not be harder than playing with lego."
* for api, copy jquery whenever possible
  * helpers may be provided, but jquery is the auhority
* must provide Access to three.js
  * ideally in a easier fashion
  * should cover it all, must cover most common/cool features


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
  
## unix phylosophy
For inspiration. from http://www.faqs.org/docs/artu/ch01s06.html

1. Rule of Modularity: Write simple parts connected by clean interfaces.
1. Rule of Clarity: Clarity is better than cleverness.
1. Rule of Composition: Design programs to be connected to other programs.
1. Rule of Separation: Separate policy from mechanism; separate interfaces from engines.
1. Rule of Simplicity: Design for simplicity; add complexity only where you must.
1. Rule of Parsimony: Write a big program only when it is clear by demonstration that nothing else will do.
1. Rule of Transparency: Design for visibility to make inspection and debugging easier.
1. Rule of Robustness: Robustness is the child of transparency and simplicity.
1. Rule of Representation: Fold knowledge into data so program logic can be stupid and robust.
1. Rule of Least Surprise: In interface design, always do the least surprising thing.
1. Rule of Silence: When a program has nothing surprising to say, it should say nothing.
1. Rule of Repair: When you must fail, fail noisily and as soon as possible.
1. Rule of Economy: Programmer time is expensive; conserve it in preference to machine time.
1. Rule of Generation: Avoid hand-hacking; write programs to write programs when you can.
1. Rule of Optimization: Prototype before polishing. Get it working before you optimize it.
1. Rule of Diversity: Distrust all claims for “one true way”.
1. Rule of Extensibility: Design for the future, because it will be here sooner than you think.
