function floor(world, tick, callback) {

    // floor wire
    world.floor = {};
    world.floor.layerTop = {};
    world.floor.layerBottom = {};

    // Top layer of the floor, the one with the wireframe
    // width, height, depth, widthSegments, heightSegments, depthSegments
    //world.floor.layerTop.geometry = new THREE.PlaneBufferGeometry(4300, 4300, 100, 100);
    // CircleGeometry(radius, segments, thetaStart, thetaLength)
    world.floor.layerTop.geometry = new THREE.CircleGeometry( 1820, 50);
    world.floor.layerTop.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.floor.layerTop.mesh = new THREE.Mesh( world.floor.layerTop.geometry, world.materials.soil );

    // Top layer of the floor, the one that is solid black
    //world.floor.layerBottom.geometry = new THREE.PlaneBufferGeometry( 4300, 4300, 1, 1 );
    world.floor.layerBottom.geometry = new THREE.CircleGeometry( 1820, 50);
        world.floor.layerBottom.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.floor.layerBottom.mesh = new THREE.Mesh( world.floor.layerBottom.geometry, world.materials.blackSolid );

    // Place the solid floor a tiny bit under the normal floor
    world.floor.layerBottom.mesh.position.y -= 1;

    // The physical floor
    world.floor.groundShape = new CANNON.Plane();
    world.floor.groundBody = new CANNON.Body({ mass: 0 });
    world.floor.groundBody.addShape(world.floor.groundShape);
    world.floor.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.physWorld.add(world.floor.groundBody);

    world.meshes.push( world.floor.layerTop.mesh );
    world.meshes.push( world.floor.layerBottom.mesh );

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}