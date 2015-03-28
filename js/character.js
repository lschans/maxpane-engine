var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(rotObjectMatrix);
    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}

function character(world, tick, callback) {
    world.character = {};

    world.character.bodyInner = {};
    world.character.bodyOuter = {};
    world.character.bodyConeInner = {};
    world.character.bodyConeOuter = {};
    world.character.bodyTorusLow = {};
    world.character.bodyDome = {};

    world.character.bodyInner.geometry = new THREE.SphereGeometry( 3, 10, 10 );
    world.character.bodyInner.mesh = new THREE.Mesh( world.character.bodyInner.geometry, materials.redCharSolid );
    world.character.bodyInner.mesh.velocity =  new THREE.Vector3(0, 0, 0);
    world.character.bodyInner.mesh.position.y = 0;
    world.character.bodyInner.mesh.position.z = 0;

    world.character.bodyOuter.geometry = new THREE.SphereGeometry( 4, 10, 10 );
    world.character.bodyOuter.mesh = new THREE.Mesh( world.character.bodyOuter.geometry, materials.greenWireThin );
    world.character.bodyOuter.mesh.velocity =  new THREE.Vector3(0, 0, 0);
    world.character.bodyOuter.mesh.position.y = 0;
    world.character.bodyOuter.mesh.position.z = 0;

    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight
    world.character.bodyConeInner.geometry = new THREE.CylinderGeometry( 2.9, 4.4, 5, 8, 3 );
    world.character.bodyConeInner.mesh = new THREE.Mesh( world.character.bodyConeInner.geometry, materials.blueCharConeSolid );
    world.character.bodyConeInner.mesh.position.y = 7;
    world.character.bodyConeInner.mesh.position.z = 0;

    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight
    world.character.bodyConeOuter.geometry = new THREE.CylinderGeometry( 3.1, 4.6, 5, 16, 1 );
    world.character.bodyConeOuter.mesh = new THREE.Mesh( world.character.bodyConeOuter.geometry, materials.greenWireThin );
    world.character.bodyConeOuter.mesh.position.y = 7;
    world.character.bodyConeOuter.mesh.position.z = 0;

    // radius of entire torus, diameter of tube (less than total radius), sides per cylinder segment, cylinders around torus ("sides")
    world.character.bodyTorusLow.geometry = new THREE.TorusGeometry( 5, 1, 5, 16 );
    world.character.bodyTorusLow.mesh = new THREE.Mesh( world.character.bodyTorusLow.geometry, materials.blueCharConeSolid );
    world.character.bodyTorusLow.mesh.rotation.x = 300;
    world.character.bodyTorusLow.mesh.position.y = -2.6;
    // Add torus to body cone
    world.character.bodyConeOuter.mesh.add(world.character.bodyTorusLow.mesh);

    // Head dome
    world.character.bodyDome.geometry = new THREE.SphereGeometry( 3.1, 16, 16, 0, 2 * Math.PI, 0, Math.PI / 2 );
    world.character.bodyDome.mesh = new THREE.Mesh( world.character.bodyDome.geometry, materials.greenCharDomeSolid );
    world.character.bodyDome.mesh.position.y = 3;
    // Add Dome to body cone
    world.character.bodyConeOuter.mesh.add( world.character.bodyDome.mesh);

    world.meshes.push(world.character.bodyInner.mesh);
    world.meshes.push(world.character.bodyOuter.mesh);
    world.meshes.push(world.character.bodyConeInner.mesh);
    world.meshes.push(world.character.bodyConeOuter.mesh);

    // Change the controls over to character, this way we rely on control but non intrusive
    world.controls = new THREE.PointerLockControls(world.character.bodyInner.mesh);

    tick.push(function(world){
        // Move the character and use innerbody for positioning and stuff
        world.character.bodyInner.mesh.velocity.x = (world.velocity.x);
        world.character.bodyInner.mesh.velocity.y = (world.velocity.y);
        world.character.bodyInner.mesh.velocity.z = (world.velocity.z);

        world.character.bodyInner.mesh.position.x =  world.controls.getObject().position.x;
        world.character.bodyInner.mesh.position.y =  world.controls.getObject().position.y + 4;
        world.character.bodyInner.mesh.position.z =  world.controls.getObject().position.z;

        world.character.bodyInner.mesh.rotation.x = world.controls.getObject().rotation.x;
        world.character.bodyInner.mesh.rotation.y = world.controls.getObject().rotation.y;
        world.character.bodyInner.mesh.rotation.z = world.controls.getObject().rotation.z;

        // Bind outer and inner body
        world.character.bodyOuter.mesh.position.x =  world.character.bodyInner.mesh.position.x;
        world.character.bodyOuter.mesh.position.y =  world.character.bodyInner.mesh.position.y;
        world.character.bodyOuter.mesh.position.z =  world.character.bodyInner.mesh.position.z;

        // Bind cone to body
        world.character.bodyConeInner.mesh.position.x =  world.character.bodyInner.mesh.position.x;
        world.character.bodyConeInner.mesh.position.y =  world.character.bodyInner.mesh.position.y + 3;
        world.character.bodyConeInner.mesh.position.z =  world.character.bodyInner.mesh.position.z;

        world.character.bodyConeOuter.mesh.position.x =  world.character.bodyInner.mesh.position.x;
        world.character.bodyConeOuter.mesh.position.y =  world.character.bodyInner.mesh.position.y + 3;
        world.character.bodyConeOuter.mesh.position.z =  world.character.bodyInner.mesh.position.z;

        world.character.bodyConeInner.mesh.rotation.y = world.character.bodyInner.mesh.rotation.y;
        world.character.bodyConeOuter.mesh.rotation.y = world.character.bodyInner.mesh.rotation.y;

        var xAxis = new THREE.Vector3(1,0,0);
        var zAxis = new THREE.Vector3(0,0,1);

        var delta = 500; // Is half of the control delta
        var rotation = 0;
        var rotationInvert = 0;
        var quadrant = 629 / 4;
        var stepZ = (world.character.bodyInner.mesh.velocity.z / delta) / quadrant;
        var stepX = (world.character.bodyInner.mesh.velocity.x / delta) / quadrant;

        if(world.controls.objRotation.y >= 0 && world.controls.objRotation.y <= quadrant) {
            rotation = world.controls.objRotation.y;
            rotationInvert = quadrant - rotation;

            // Forward / backward
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, rotationInvert * stepZ);
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, rotation * stepZ);

            // Left / right
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, (rotation * stepX));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, 0 - (rotationInvert * stepX));
        }

        if(world.controls.objRotation.y > quadrant && world.controls.objRotation.y <= (quadrant * 2)) {
            rotation = world.controls.objRotation.y - quadrant;
            rotationInvert = quadrant - rotation;

            // Forward / backward
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, 0 - (rotation * stepZ));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, rotationInvert * stepZ);

            // Left / right
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, (rotationInvert * stepX));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, (rotation * stepX));
        }

        if(world.controls.objRotation.y > (quadrant * 2) && world.controls.objRotation.y <= (quadrant * 3)) {
            rotation = world.controls.objRotation.y - (quadrant * 2);
            rotationInvert = quadrant - rotation;

            // Forward / backward
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, 0 - (rotationInvert * stepZ));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, 0 - (rotation * stepZ));

            // Left / right
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, 0 - (rotation * stepX));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, (rotationInvert * stepX));
        }

        if(world.controls.objRotation.y > (quadrant * 3) && world.controls.objRotation.y <= (quadrant * 4)) {
            rotation = world.controls.objRotation.y - (quadrant * 3);
            rotationInvert = quadrant - rotation;

            // Forward / backward
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, (rotation * stepZ));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, 0 - (rotationInvert * stepZ));

            // Left / right
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, xAxis, 0 - (rotationInvert * stepX));
            rotateAroundWorldAxis(world.character.bodyOuter.mesh, zAxis, 0 - (rotation * stepX));
        }

        // world.controls.objRotation.x

        var dynOffsetZ = 40 - (Math.round(world.velocity.z) / 8);

        var relativeCameraOffset = new THREE.Vector3(0,0, dynOffsetZ);
        var cameraOffset = relativeCameraOffset.applyMatrix4( world.character.bodyInner.mesh.matrixWorld );

        world.camera.position.x = cameraOffset.x;
        world.camera.position.y = world.character.bodyInner.mesh.position.y + 15;
        world.camera.position.z = cameraOffset.z;
        world.camera.lookAt( world.character.bodyInner.mesh.position );
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}
