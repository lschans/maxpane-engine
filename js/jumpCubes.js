function jumpCubes(world, tick, callback) {
    world.jumpCubes = {};

    world.jumpCubes.halfExtends = new CANNON.Vec3(10,10,10);
    world.jumpCubes.boxShape = new CANNON.Box(world.jumpCubes.halfExtends);
    world.jumpCubes.boxGeometry = new THREE.BoxGeometry(world.jumpCubes.halfExtends.x*2,world.jumpCubes.halfExtends.y*2,world.jumpCubes.halfExtends.z*2);
    world.jumpCubes.boxMeshes = [];
    world.jumpCubes.boxes = [];

    for ( var i = 0; i < 250; i++ ) {
        // Place at random positions
        var x = Math.floor( Math.random() * 20 - 10 ) * 20;
        var y = Math.floor( Math.random() * 20 ) * 20 + 10;
        var z = Math.floor( Math.random() * 20 - 10 ) * 20;

        // Move the whole block of cubes away from the starting point
        x -= 400;
        z -= 200;

        var boxBody = new CANNON.Body({ mass: 0 });
        boxBody.addShape(world.jumpCubes.boxShape);
        var boxMesh = new THREE.Mesh( world.jumpCubes.boxGeometry, materials.jumpCube );
        world.physWorld.add(boxBody);
        world.scene.add(boxMesh);
        boxBody.position.set(x,y,z);
        boxMesh.position.set(x,y,z);
        boxMesh.castShadow = false;
        boxMesh.receiveShadow = false;
        world.jumpCubes.boxes.push(boxBody);
        world.jumpCubes.boxMeshes.push(boxMesh);

        //world.meshes.push( world.jumpCubes.mesh );

        // push to objects for collision detection
        world.objects.push( world.jumpCubes.mesh );
    }

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}