//These rely on TWEEN.js being hooked to handle the animation

//Animate movement to new position
tQuery.TrackballControl.register('moveCameraTo', function (target, time) {
    // handle parameters
    console.assert(target instanceof THREE.Vector3, "TrackballControl.moveCameraTo target parameter error");
    console.assert((typeof time === "number"), "TrackballControl.moveCameraTo time parameter error");
    console.assert(tQuery.world.tweenActive === true, "TrackballControl.moveCameraTo requires Tween to animate, please hook Tween");

    var camera = this._lists[0].object;

    var start = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    var end = { x: target.x, y: target.y, z: target.z };

    var moveTween = new TWEEN.Tween(start).to(end, time).start();
    moveTween.onUpdate(function () {
        camera.position.set(start.x, start.y, start.z);
    });
});

//Animate movement to new target
tQuery.TrackballControl.register('moveCameraTargetTo', function (target, time) {
    // handle parameters
    console.assert(target instanceof THREE.Vector3, "TrackballControl.moveCameraTo target parameter error");
    console.assert((typeof time === "number"), "TrackballControl.moveCameraTo time parameter error");
    console.assert(tQuery.world.tweenActive === true, "TrackballControl.moveCameraTargetTo requires Tween to animate, please hook Tween");

    var self = this;

    var currentTarget = self.target();

    var start = { x: currentTarget.x, y: currentTarget.y, z: currentTarget.z };
    var end = { x: target.x, y: target.y, z: target.z };

    var moveTween = new TWEEN.Tween(start).to(end, time).start();
    moveTween.onUpdate(function () {
        self.target(start.x, start.y, start.z);
    });
});

//Combine position and target movement to create pan effect
tQuery.TrackballControl.register('panCameraTo', function (target, time) {

    // handle parameters
    console.assert(target instanceof THREE.Vector3, "TrackballControl.moveCameraTo target parameter error");
    console.assert((typeof time === "number"), "TrackballControl.moveCameraTo time parameter error");
    console.assert(tQuery.world.tweenActive === true, "TrackballControl.panCameraTo requires Tween to animate, please hook Tween");

    //Calculate camera position
    var currentTarget = tQuery.world.getCameraControls().target();
    var cameraPos = tQuery.world.camera().position;

    var moveTo = new THREE.Vector3();
    moveTo.copy(target);
    moveTo = moveTo.add(moveTo, cameraPos);
    moveTo = moveTo.sub(moveTo, currentTarget);

    //Call movement functions
    this.moveCameraTo(moveTo, time);
    this.moveCameraTargetTo(target, time);
});