/*
 MP.add.sphere(world, tick, {
     radius:1,
     widthSegments:5,
     heightSegments:5,
     x:0,
     y:0,
     z:0,
     mass:1,
     material:new THREE.MeshBasicMaterial({ color: 0xaaaaaa}),
     update:false
 });
*/

MP.add.sphere = function(world, tick, sphereObject) {
    sphereObject = MP.add.configTest(sphereObject);

    var ballShape = new CANNON.Sphere(sphereObject.radius);
    var ballGeometry = new THREE.SphereGeometry(ballShape.radius, sphereObject.widthSegments, sphereObject.heightSegments);
    var ballBody = new CANNON.Body({ mass:sphereObject.mass });
    ballBody.addShape(ballShape);
    ballBody.linearDamping = sphereObject.damping;
    var ballMesh = new THREE.Mesh( ballGeometry, sphereObject.material );
    world.bodies.push(ballBody);
    world.meshes.push(ballMesh);
    ballBody.position.set(sphereObject.x, sphereObject.y, sphereObject.z);
    ballMesh.position.copy(ballBody.position);

    if(sphereObject.update === true) {
        tick.push(function (world) {
            // Update sphere positions
            ballMesh.position.copy(ballBody.position);
            ballMesh.quaternion.copy(ballBody.quaternion);
        });
    }

    return {body:ballBody, mesh:ballMesh};
};