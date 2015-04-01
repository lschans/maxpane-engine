function floor(world, tick, callback) {
    // floor wire
    world.floor = {};
    world.floor.layerTop = {};
    world.floor.layerBottom = {};

    // Top layer of the floor, the one with the wireframe
    // width, height, depth, widthSegments, heightSegments, depthSegments
    world.floor.layerTop.geometry = new THREE.PlaneBufferGeometry(4000, 4000, 100, 100);
    world.floor.layerTop.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.floor.layerTop.mesh = new THREE.Mesh( world.floor.layerTop.geometry, materials.greenFloorThin );
    //world.floor.layerTop.mesh.rotation.x = Math.PI /2;

    // Top layer of the floor, the one that is solid black
    world.floor.layerBottom.geometry = new THREE.PlaneBufferGeometry( 4000, 4000, 1, 1 );
    world.floor.layerBottom.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.floor.layerBottom.mesh = new THREE.Mesh( world.floor.layerBottom.geometry, materials.blackSolid );

    // Place the solid floor a tiny bit under the normal floor
    world.floor.layerBottom.mesh.position.y -= 0.1;

    // The physical floor
    world.floor.groundShape = new CANNON.Plane();
    world.floor.groundBody = new CANNON.Body({ mass: 0 });
    world.floor.groundBody.addShape(world.floor.groundShape);
    world.floor.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.physWorld.add(world.floor.groundBody);

    tick.push(function(world){
        //world.floor.layerTop.bodyx.update(world.deltaMsec/1000, world.nowMsec/1000);
    });

    world.meshes.push( world.floor.layerBottom.mesh );
    world.meshes.push( world.floor.layerTop.mesh );

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}