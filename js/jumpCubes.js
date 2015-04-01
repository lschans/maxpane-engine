function jumpCubes(world, tick, callback) {
    world.jumpCubes = {};
/*
    MP.add.box(world, {
        width:10,
        height:10,
        depth:300,
        x:10,
        y:5,
        z:10,
        mass:0,
        material:new THREE.MeshBasicMaterial({ color: 0xaaaaaa})
    });
*/

    // Add cage
    MP.add.box(world, {
        width: 480,
        height: 50,
        depth: 2,
        x: 150,
        y: 25,
        z: -500,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 480,
        height: 50,
        depth: 2,
        x: 150,
        y: 25,
        z: -1000,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 2,
        height: 50,
        depth: 480,
        x: 400,
        y: 25,
        z: -750,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 2,
        height: 50,
        depth: 480,
        x: -100,
        y: 25,
        z: -750,
        mass: 0,
        material: materials.glassWall
    });

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
        x += 150;
        z -= 750;

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