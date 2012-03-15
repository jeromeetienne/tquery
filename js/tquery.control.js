/**
* @Base tquery object for a camera control
*/

tQuery.Control = function (elements) {

    // call parent ctor
    tQuery.Control.parent.constructor.call(this, elements)
}

/**
* inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Control, tQuery.Node);

/**
* Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Control);