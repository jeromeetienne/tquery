
/**
* @Base tquery object for a control
*/

tQuery.Control = function (elements) {
    // call parent ctor
    tQuery.Control.parent.constructor.call(this, elements);
}

/**
* inherit from tQuery.Node
*/
tQuery.inherit(tQuery.Control, tQuery.Node);

/**
* All controls should implement update to be called in the render loop
*/
tQuery.Control.prototype.update = function () {
    this._lists.forEach(function (item) { item.update(); });
}

/**
* All controls needs to be set to a world, at which point the controls internal camera object is set
* and the worlds camera control is also set.
*/
/**
* All controls needs to be set to a world, at which point the controls internal camera object is set
* and the worlds camera control is also set.
*/
tQuery.Control.prototype.setOn = function (world) {

    console.assert(world instanceof tQuery.World, "Control.setOn world parameter error");

    this._lists[0].object = world.camera();

    world.setCameraControls(this);

    //chain
    return this;
}

/**
* Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.Control);