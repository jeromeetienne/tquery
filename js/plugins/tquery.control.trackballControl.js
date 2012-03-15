/**
* @fileOverview Plugins for tQuery and Stats.js
*/

tQuery.TrackballControl = function (elements) {

    // call parent ctor
    tQuery.TrackballControl.parent.constructor.call(this, elements)

    // sanity check - all items MUST be THREE.TrackballControls
    this._lists.forEach(function (item) { console.assert(item instanceof THREE.TrackballControls); });
}

/**
* inherit from tQuery.Control
*/
tQuery.inherit(tQuery.TrackballControl, tQuery.Control);

/**
* Make it pluginable
*/
tQuery.pluginsInstanceOn(tQuery.TrackballControl);

/**
* define all acceptable attributes for this class
*/
tQuery.mixinAttributes(tQuery.TrackballControl, {
    maxDistance : tQuery.convert.toNumber
});

tQuery.register('createTrackballControls', function () {
    var controls = new THREE.TrackballControls(_this.camera());

    controls.target.set(0, 0, 0)
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 40;
    controls.maxDistance = 14000;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.15;
    controls.keys = [65, 83, 68];

    return tQuery(controls);
});