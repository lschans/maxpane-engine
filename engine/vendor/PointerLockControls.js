/**
 * @author mrdoob / http://mrdoob.com/
 * @author schteppe / https://github.com/schteppe
 * @author lschans / https://github.com/lschans
 */
 var PointerLockControls = function (world, mode) {

    if(mode.view == 1) {
        var camera = world.camera;
        var cannonBody = world.player.body.sphereBody;
    } else if(mode.view == 2) {
        var camera = mode.view.camera;
        var cannonBody = mode.view.controls;
    }

    var velocityFactor = 4;
    var jumpVelocity = 300;
    var scope = this;

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 2;
    yawObject.add( pitchObject );

    var quat = new THREE.Quaternion();

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var stop = false;

    var canJump = false;

    var contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    var upAxis = new CANNON.Vec3(0,1,0);
    cannonBody.addEventListener("collide",function(e){
        var contact = e.contact;

        // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
        // We do not yet know which one is which! Let's check.
        if(contact.bi.id == cannonBody.id)  // bi is the player body, flip the contact normal
            contact.ni.negate(contactNormal);
        else
            contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

        // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
        if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
            canJump = true;
    });

    var velocity = cannonBody.velocity;

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

        if ( scope.enabled === false ) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
    };

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 69: // e
                stop = true;
                break;


            case 32: // space
                if ( canJump === true ){
                    velocity.y = jumpVelocity;
                }
                canJump = false;
                break;
        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // a
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

            case 69: // e
                stop = false;
                break;
        }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    this.enabled = false;

    this.getObject = function () {
        return yawObject;
    };

    this.getDirection = function(targetVec){
        targetVec.set(0,0,-1);
        quat.multiplyVector3(targetVec);
    };

    // Moves the camera to the Cannon.js object position and adds velocity to the object if the run key is down
    var inputVelocity = new THREE.Vector3();
    var worldEdge = 1800;
    var oldDist = worldEdge;
    var oldPos = cannonBody.position;
    var euler = new THREE.Euler();

    this.setRotation = function(rotation) {
        // Function sets yaw rotation relative to the mesh object
        if(typeof(rotation.x) != 'undefined') yawObject.rotation.x = 0 - (rotation.x / 100);
        if(typeof(rotation.y) != 'undefined') yawObject.rotation.y = 0 - (rotation.y / 100);
        if(typeof(rotation.z) != 'undefined') yawObject.rotation.z = 0 - (rotation.z / 100);
    }

    this.update = function ( delta ) {

        if (scope.enabled === false) return;

        delta *= 0.1;

        inputVelocity.set(0, 0, 0);
        // Detect world boundry and stop movement
        var dist = MP.collision.distance(
            {x:0,y:0,z:0}, // World
            {x:world.player.body.sphereBody.position.x,y:world.player.body.sphereBody.position.y,z:world.player.body.sphereBody.position.z} // Player
        );

        var averageVelocity = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.z, 2));

        var distArea = worldEdge * 0.95;

        // Add a bumper around the world... Like an invisible rubber border you cannot pass
        if(dist.distance > distArea && averageVelocity >= 0 && oldDist < dist.distance) {
            if(cannonBody.position.z > oldPos.z) cannonBody.position.z -= Math.abs(velocity.z);
            if(cannonBody.position.z < oldPos.z) cannonBody.position.z += Math.abs(velocity.z);

            if(cannonBody.position.x > oldPos.x) cannonBody.position.x -= Math.abs(velocity.x);
            if(cannonBody.position.x < oldPos.x) cannonBody.position.x += Math.abs(velocity.x);
        } else {
            if (moveForward) {
                inputVelocity.z = -velocityFactor * delta;
            }
            if (moveBackward) {
                inputVelocity.z = velocityFactor * delta;
            }
            if (moveLeft) {
                inputVelocity.x = -velocityFactor * delta;
            }
            if (moveRight) {
                inputVelocity.x = velocityFactor * delta;
            }
        }
        oldPos = cannonBody.position;
        oldDist = dist.distance;

        // Convert velocity to world coordinates
        euler.x = pitchObject.rotation.x;
        euler.y = yawObject.rotation.y;
        euler.order = "XYZ";
        quat.setFromEuler(euler);
        inputVelocity.applyQuaternion(quat);

        // Add to the object
        velocity.x += inputVelocity.x;
        velocity.z += inputVelocity.z;

        yawObject.position.copy(cannonBody.position);

        if(yawObject.rotation.x < -6.29) yawObject.rotation.x = 0;
        if(yawObject.rotation.x > 0) yawObject.rotation.x = -6.29;

        if(yawObject.rotation.y < -6.29) yawObject.rotation.y = 0;
        if(yawObject.rotation.y > 0) yawObject.rotation.y = -6.29;

        if(yawObject.rotation.z < -6.29) yawObject.rotation.z = 0;
        if(yawObject.rotation.z > 0) yawObject.rotation.z = -6.29;

        cannonBody.rotation.x = 0 - (yawObject.rotation.x * 100);
        cannonBody.rotation.y = 0 - (yawObject.rotation.y * 100);
        cannonBody.rotation.z = 0 - (yawObject.rotation.z * 100);
        cannonBody.velocity.avg = averageVelocity;
    };
};
