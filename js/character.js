/*
var rotWorldMatrix;
function rotateAroundWorldAxis(object, axis, radians) {
    //rotWorldMatrix = new THREE.Matrix4();
    //rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    //rotWorldMatrix.multiplySelf(object.matrix);
    //object.matrix = rotWorldMatrix;
    object.rotateOnAxis(axis, radians);
}
*/

var rotObjectMatrix;
function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js r50-r58:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // new code for Three.js r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}



function character(world, tick, callback) {
    world.character = {};

    world.character.bodyInner = {};
    world.character.bodyOuter = {};

    world.character.bodyInner.geometry = new THREE.SphereGeometry( 3, 10, 10 );
    world.character.bodyInner.mesh = new THREE.Mesh( world.character.bodyInner.geometry, materials.redWireThin );
    world.character.bodyInner.mesh.velocity =  new THREE.Vector3(0, 0, 0);
    world.character.bodyInner.mesh.position.y = 0;
    world.character.bodyInner.mesh.position.z = 0;

    world.character.bodyOuter.geometry = new THREE.SphereGeometry( 4, 10, 10 );
    world.character.bodyOuter.mesh = new THREE.Mesh( world.character.bodyOuter.geometry, materials.greenWireThin );
    world.character.bodyOuter.mesh.velocity =  new THREE.Vector3(0, 0, 0);
    world.character.bodyOuter.mesh.position.y = 0;
    world.character.bodyOuter.mesh.position.z = 0;

    /*
    world.character.bodyOuter.mesh.roll_z = function(distance) {
        this.position.z += distance;

        var xAxis = new THREE.Vector3(1, 0, 0);
        var angle = distance / (2 * Math.PI * this.boundRadius) * Math.PI;
        this.rotateOnAxis(xAxis, angle);
    };
*/
    world.meshes.push(world.character.bodyInner.mesh);
    world.meshes.push(world.character.bodyOuter.mesh);

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

        //630 - 580 = 50

        //630 -> 315 -> 165 -> 82 -> 41

        //-50

        var xAxis = new THREE.Vector3(1,0,0);
        //rotateAroundObjectAxis(world.character.bodyOuter.mesh, xAxis, world.character.bodyInner.mesh.velocity.z / 500);

        var zAxis = new THREE.Vector3(0,0,1);
        //rotateAroundObjectAxis(world.character.bodyOuter.mesh, zAxis, world.character.bodyInner.mesh.velocity.z / 500);

        //world.character.bodyOuter.mesh.velocity.x = world.character.bodyInner.mesh.velocity.z;

        var stepZ = (world.character.bodyInner.mesh.velocity.z / 500) / 165;
        var stepX = (world.character.bodyInner.mesh.velocity.x / 500) / 165;
        var rotation = 0;
        var rotationInvert = 0;
        var quadrant = 629 / 4;

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



        //var yAxis = new THREE.Vector3(0,1,0);
        //rotateAroundObjectAxis(world.character.bodyOuter.mesh, yAxis, world.character.bodyInner.mesh.rotation.y);



        //world.character.bodyOuter.mesh.rotation.y = world.character.bodyInner.mesh.rotation.y;

        //var euler = new THREE.Euler( (world.character.bodyInner.mesh.velocity.z / 500), 0, 0, 'XYZ' );
        //world.character.bodyOuter.mesh.rotation.applyEuler(euler);

        //var xAxis = new THREE.Vector3(1, 0, 0);

        //world.character.bodyOuter.mesh.roll_z((world.character.bodyInner.mesh.velocity.z / 500));

        //world.character.bodyOuter.mesh.rotateOnAxis(xAxis, (world.character.bodyInner.mesh.velocity.z / 100));
        //world.character.bodyOuter.mesh.rotateZ((world.character.bodyInner.mesh.velocity.z / 500));

        // 315
        // 157 107 207

        var relativeCameraOffset = new THREE.Vector3(0,0,30);
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
