﻿/**
* @fileOverview Plugins for tQuery and Stats.js
*/

tQuery.TrackballControl = function (elements) {

    // call parent ctor
    tQuery.TrackballControl.parent.constructor.call(this, elements)

    // sanity check - all items MUST be THREE.TrackballControls
    this._lists.forEach(function (item) { console.assert(item instanceof THREE.TrackballControls); });
}

/**
* inherit from tQuery.Control - implements update
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
    
    rotateSpeed             : tQuery.convert.toNumber,
    zoomSpeed               : tQuery.convert.toNumber,
    minDistance             : tQuery.convert.toNumber,
    maxDistance             : tQuery.convert.toNumber,
    noZoom                  : tQuery.convert.toBool,
    noPan                   : tQuery.convert.toBool,
    staticMoving            : tQuery.convert.toBool,
    dynamicDampingFactor    : tQuery.convert.toNumber,
    keys                    : tQuery.convert.identity

});

//Put these here for now as they relate to the above, don't want the functions registered if the above code isn't included in the build.

//Set the target of the trackball control, as its not an property that is written to, but a function call, then can't use mixin attributes (is this correct?)
tQuery.TrackballControl.register('target', function(vector3){
	// handle parameters
	if( typeof vector3 === "number" && arguments.length === 3 ){
		vector3	= new THREE.Vector3(arguments[0], arguments[1], arguments[2]);
	}
	console.assert(vector3 instanceof THREE.Vector3, "TrackballControl.target parameter error");

	// do the operation on each node
	this.each(function(trackballControl){
		trackballControl.target.copy(vector3);
	})

	// return this, to get chained API	
	return this;
});

//Create a control with a no camera, when this control is set to a world it will wrap that worlds current camera.
tQuery.register('createTrackballControl', function (settings) {
    
    var defaultSettings = { 
        rotateSpeed : 1.0,
        zoomSpeed : 1.2,
        minDistance : 40,
        maxDistance : 14000,
        noZoom : false,
        noPan : false,
        staticMoving : false,
        dynamicDampingFactor : 0.15,
        keys : [65, 83, 68]
    };

    //Apply default settings
    settings = tQuery.extend(settings, defaultSettings);

    //Create new controls, wrapping no camera to start off with
    var controls = new THREE.TrackballControls(null);

    controls.target.set(0, 0, 0)
    controls.rotateSpeed = settings.rotateSpeed;
    controls.zoomSpeed = settings.zoomSpeed;
    controls.minDistance = settings.minDistance;
    controls.maxDistance = settings.maxDistance;
    controls.noZoom = settings.noZoom;
    controls.noPan = settings.noPan;
    controls.staticMoving = settings.staticMoving;
    controls.dynamicDampingFactor = settings.dynamicDampingFactor;
    controls.keys = settings.keys;

    //Return the controls
    return tQuery(controls);
});