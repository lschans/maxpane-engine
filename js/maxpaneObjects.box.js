/*
 MP.add.box(world, tick, {
     width:1,
     height:1,
     depth:1,
     x:0,
     y:0,
     z:0,
     mass:0,
     material:new THREE.MeshBasicMaterial({ color: 0xaaaaaa})
 });
*/

MP.add.box = function(world, tick, boxObject) {
    boxObject = MP.add.configTest(boxObject);

    if(boxObject.hasPhys) {
        var cannonVector = new CANNON.Vec3(boxObject.width / 2, boxObject.height / 2, boxObject.depth / 2);
        var cannonBox = new CANNON.Box(cannonVector);
        var boxBody = new CANNON.Body({mass: boxObject.mass});
        boxBody.addShape(cannonBox);
        world.bodies.push(boxBody);
        boxBody.position.set(boxObject.x, boxObject.y, boxObject.z);
    }

    var boxGeometry = new THREE.BoxGeometry(boxObject.width, boxObject.height, boxObject.depth, boxObject.widthSegments, boxObject.heightSegments, boxObject.depthSegments);
    var boxMesh = new THREE.Mesh(boxGeometry, boxObject.material);
    world.meshes.push(boxMesh);
    boxMesh.position.set(boxObject.x, boxObject.y, boxObject.z);

    if(boxObject.nonPhysMovement === true && boxObject.hasPhys === true) {
        // Add rotation function to body to make life a bit less hard
        boxBody.rotation = MP.add.addRotation(boxBody, boxMesh);
        tick.push(function (world) {
            // Update box w.o. physics
            boxBody.rotation.update();
        });
    }

    if(boxObject.update === true && boxObject.hasPhys === true) {
        tick.push(function (world) {
            // Update box positions
            boxMesh.position.copy(boxBody.position);
            boxMesh.quaternion.copy(boxBody.quaternion);
        });
    }

    // Return body and mesh
    var retObj = {};
    if(typeof(boxBody) !== 'undefined') retObj.body = boxBody;
    if(typeof(boxMesh) !== 'undefined') retObj.mesh = boxMesh;
    return retObj;
};
