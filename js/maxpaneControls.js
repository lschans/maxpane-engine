function maxpaneControls(world, tick, callback) {

    // Has some nastyness to bind the character here... should be in the character or set as global
    world.controls = new THREE.PointerLockControls(world.character.bodyInner.mesh);

    world.scene.add(world.controls.getObject());

    world.controlsEnabled = true;
    world.canJump = true;
    world.moveForward = false;
    world.moveBackward = false;
    world.moveLeft = false;
    world.moveRight = false;

    world.controls.objRotation = {};
    world.controls.objRotation.x = 0;
    world.controls.objRotation.y = 0;
    world.controls.objRotation.z = 0;

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

            if(world.controls.getObject().rotation.x < -6.29) world.controls.getObject().rotation.x = 0;
            if(world.controls.getObject().rotation.x > 0) world.controls.getObject().rotation.x = -6.29;

            if(world.controls.getObject().rotation.y < -6.29) world.controls.getObject().rotation.y = 0;
            if(world.controls.getObject().rotation.y > 0) world.controls.getObject().rotation.y = -6.29;

            if(world.controls.getObject().rotation.z < -6.29) world.controls.getObject().rotation.z = 0;
            if(world.controls.getObject().rotation.z > 0) world.controls.getObject().rotation.z = -6.29;


            world.controls.objRotation.x = 0 - Math.round(world.controls.getObject().rotation.x * 100);
            world.controls.objRotation.y = 0 - Math.round(world.controls.getObject().rotation.y * 100);
            world.controls.objRotation.z = 0 - Math.round(world.controls.getObject().rotation.z * 100);

            var time = performance.now();
            var deltaX = ( time - world.prevTime ) / 1000;
            var deltaY = ( time - world.prevTime ) / 1000;
            var deltaZ = ( time - world.prevTime ) / 1000;

            world.performance = Math.round(((deltaX + deltaY + deltaZ) / 3) * 10000);

            world.velocity.x -= world.velocity.x * 10.0 * deltaX;
            world.velocity.z -= world.velocity.z * 10.0 * deltaZ;

            world.velocity.y -= 9.8 * 100.0 * deltaY; // 100.0 = mass

            if ( world.moveForward ) world.velocity.z -= 600.0 * deltaZ;
            if ( world.moveBackward ) world.velocity.z += 600.0 * deltaZ;

            if ( world.moveLeft ) world.velocity.x -= 600.0 * deltaX;
            if ( world.moveRight ) world.velocity.x += 600.0 * deltaX;

            // Collision detection, make top of objects 'solid'
            var intersections = world.raycaster.intersectObjects( world.objects );
            var isOnObject = intersections.length > 0;
            if ( isOnObject === true ) {
                world.velocity.y = Math.max( 0, world.velocity.y );
                world.canJump = true;
            }

            world.controls.getObject().translateX( world.velocity.x * deltaX );
            world.controls.getObject().translateY( world.velocity.y * deltaY );
            world.controls.getObject().translateZ( world.velocity.z * deltaZ );

            if ( world.controls.getObject().position.y < 0 ) {

                world.velocity.y = 0;
                world.controls.getObject().position.y = 0;

                world.canJump = true;
            }

            world.prevTime = time;
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}