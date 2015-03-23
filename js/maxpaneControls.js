function maxpaneControls(world, tick, callback) {
    world.controls = new THREE.PointerLockControls(world.camera);
    world.scene.add(world.controls.getObject());

    world.controlsEnabled = true;
    world.canJump = true;
    world.moveForward = false;
    world.moveBackward = false;
    world.moveLeft = false;
    world.moveRight = false;

    // Nasty to use the maxpaneWorld but we need the globals
    var onKeyDown = function (event) {
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                maxpaneWorld.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                maxpaneWorld.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                maxpaneWorld.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                maxpaneWorld.moveRight = true;
                break;

            case 32: // space
                if (maxpaneWorld.canJump === true) maxpaneWorld.velocity.y += 350;
                maxpaneWorld.canJump = false;
                break;
        }
    };

    var onKeyUp = function (event) {
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                maxpaneWorld.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                maxpaneWorld.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                maxpaneWorld.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                maxpaneWorld.moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    tick.push(function(world){
        if ( world.controlsEnabled ) {

            var time = performance.now();
            var delta = ( time - world.prevTime ) / 1000;

            world.performance = Math.round(delta * 10000);

            world.velocity.x -= world.velocity.x * 10.0 * delta;
            world.velocity.z -= world.velocity.z * 10.0 * delta;

            world.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            if ( world.moveForward ) world.velocity.z -= 400.0 * delta;
            if ( world.moveBackward ) world.velocity.z += 400.0 * delta;

            if ( world.moveLeft ) world.velocity.x -= 400.0 * delta;
            if ( world.moveRight ) world.velocity.x += 400.0 * delta;



            // Collision detection, make top of objects 'solid'
            var intersections = world.raycaster.intersectObjects( world.objects );
            var isOnObject = intersections.length > 0;
            if ( isOnObject === true ) {
                world.velocity.y = Math.max( 0, world.velocity.y );
                world.canJump = true;
            }

            world.controls.getObject().translateX( world.velocity.x * delta );
            world.controls.getObject().translateY( world.velocity.y * delta );
            world.controls.getObject().translateZ( world.velocity.z * delta );

            if ( world.controls.getObject().position.y < 10 ) {

                world.velocity.y = 0;
                world.controls.getObject().position.y = 10;

                world.canJump = true;

            }

            world.prevTime = time;
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}