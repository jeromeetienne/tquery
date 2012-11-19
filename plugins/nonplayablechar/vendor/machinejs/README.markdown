#Machine.js
Make behaviour trees in JavaScript

v1.1 [see changelog]

By mary rose cook

* http://maryrosecook.com
* maryrosecook@maryrosecook.com

##What is Machine.js?

Machine.js lets you use a hierarchical state machine to control a JavaScript object.

* Define a behaviour tree as JSON.
    <pre><code>{
        identifier: "idle", strategy: "prioritised",
        children: [
            {
                identifier: "photosynthesise", strategy: "sequential",
                children: [
                    { identifier: "makeEnergy" },
                    { identifier: "grow" },
                    { identifier: "emitOxygen" },
                ]
            },
            { identifier: "gatherSun" },
            { identifier: "gatherWater" },
        ]
    };
    </code></pre>

* For each leaf state, define a function that enacts the behaviour for that state.  So, for the gatherSun state, define a function that gathers sun.

* For each state, define a can function that returns true if the actor may move to that state.  So, for the gatherSun state, define a function canGatherSun that returns true if the sun is out.

##Licence

The code is open source, under the MIT licence.  It uses Base.js by Dean Edwards.

##Getting started

Download the repository.  Open index.html in your browser to see the demo and documentation.