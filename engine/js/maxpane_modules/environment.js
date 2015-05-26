function environment(world, tick, callback) {
    world.environment = {};
    world.environment.sky = {};
    world.environment.floor = {};
    world.environment.floor.layerTop = {};
    world.environment.floor.layerBottom = {};

    // create the geometry sphere this is the.environment.sky you are in, this could be stars/clouds etc
    world.environment.sky.sphere  = new THREE.SphereGeometry(2100, 25, 25);
    world.environment.sky.sphereAlpha  = new THREE.SphereGeometry(1800, 25, 25);

    // Create mesh with star material
    world.environment.sky.mesh  = new THREE.Mesh(world.environment.sky.sphere, world.materials.stars);
    world.environment.sky.meshAlpha  = new THREE.Mesh(world.environment.sky.sphereAlpha, world.materials.starsAlpha);

    world.environment.sky.meshAlpha.rotation.y = 350;

    // Top layer of the.environment.floor, the one with the wireframe
    // width, height, depth, widthSegments, heightSegments, depthSegments
    //world.environment.floor.layerTop.geometry = new THREE.PlaneBufferGeometry(4300, 4300, 100, 100);
    // CircleGeometry(radius, segments, thetaStart, thetaLength)
    world.environment.floor.layerTop.geometry = new THREE.CircleGeometry( 1820, 50);
    world.environment.floor.layerTop.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.environment.floor.layerTop.mesh = new THREE.Mesh( world.environment.floor.layerTop.geometry, world.materials.soil );

    // Top layer of the.environment.floor, the one that is solid black
    //world.environment.floor.layerBottom.geometry = new THREE.PlaneBufferGeometry( 4300, 4300, 1, 1 );
    world.environment.floor.layerBottom.geometry = new THREE.CircleGeometry( 1820, 50);
    world.environment.floor.layerBottom.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    world.environment.floor.layerBottom.mesh = new THREE.Mesh( world.environment.floor.layerBottom.geometry, world.materials.blackSolid );

    // Place the solid.environment.floor a tiny bit under the normal.environment.floor
    world.environment.floor.layerBottom.mesh.position.y -= 1;

    // The physical.environment.floor
    world.environment.floor.groundShape = new CANNON.Plane();
    world.environment.floor.groundBody = new CANNON.Body({ mass: 0 });
    world.environment.floor.groundBody.addShape(world.environment.floor.groundShape);
    world.environment.floor.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    world.physWorld.add(world.environment.floor.groundBody);

    // Push all meshes to the world
    world.meshes.push(world.environment.sky.mesh);
    world.meshes.push(world.environment.sky.meshAlpha);
    world.meshes.push( world.environment.floor.layerTop.mesh );
    world.meshes.push( world.environment.floor.layerBottom.mesh );

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}