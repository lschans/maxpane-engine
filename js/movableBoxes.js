function movableBoxes(world, tick, callback) {

    world.movableBoxes = {};

    // Add cage
    MP.add.box(world, {
        width: 300,
        height: 50,
        depth: 2,
        x: 650,
        y: 25,
        z: -500,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 300,
        height: 50,
        depth: 2,
        x: 650,
        y: 25,
        z: -200,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 2,
        height: 50,
        depth: 300,
        x: 800,
        y: 25,
        z: -350,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 2,
        height: 50,
        depth: 125,
        x: 500,
        y: 25,
        z: -437.5,
        mass: 0,
        material: materials.glassWall
    });

    MP.add.box(world, {
        width: 2,
        height: 50,
        depth: 125,
        x: 500,
        y: 25,
        z: -262.5,
        mass: 0,
        material: materials.glassWall
    });


    // Add boxes
    world.movableBoxes.halfExtends = new CANNON.Vec3(10, 10, 10);
    world.movableBoxes.boxShape = new CANNON.Box(world.movableBoxes.halfExtends);
    world.movableBoxes.boxGeometry = new THREE.BoxGeometry(world.movableBoxes.halfExtends.x * 2, world.movableBoxes.halfExtends.y * 2, world.movableBoxes.halfExtends.z * 2);
    world.movableBoxes.boxMeshes = [];
    world.movableBoxes.boxes = [];

    world.movableBoxes.addBoxes = function() {
        for (var i = 0; i < 3; i++) {
            var x = (Math.random() - 0.5) * 20;
            var y = 1 + (Math.random() - 0.5) * 1;
            var z = (Math.random() - 0.5) * 20;

            // Move to position in world
            x += 650;
            z -= 350;

            var boxBody = new CANNON.Body({mass: 2});
            boxBody.addShape(world.movableBoxes.boxShape);
            var boxMesh = new THREE.Mesh(world.movableBoxes.boxGeometry, materials.blueHalfSolid);
            world.physWorld.add(boxBody);
            world.scene.add(boxMesh);
            boxBody.position.set(x, y, z);
            boxMesh.position.set(x, y, z);
            boxMesh.castShadow = false;
            boxMesh.receiveShadow = false;
            world.movableBoxes.boxes.push(boxBody);
            world.movableBoxes.boxMeshes.push(boxMesh);
        }
    }

    setInterval(function(){
        for(var i=0; i<world.movableBoxes.boxes.length; i++){
            world.physWorld.remove(world.movableBoxes.boxes[i]);
            world.scene.remove(world.movableBoxes.boxMeshes[i]);
            delete world.movableBoxes.boxes[i];
            delete world.movableBoxes.boxMeshes[i];
        }

        world.movableBoxes.boxes = [];
        world.movableBoxes.boxMeshes = [];

        world.movableBoxes.addBoxes();

    }, 30000);

    world.movableBoxes.addBoxes();

    tick.push(function(world){
        // Update box positions
        for(var i=0; i<world.movableBoxes.boxes.length; i++){
            world.movableBoxes.boxMeshes[i].position.copy(world.movableBoxes.boxes[i].position);
            world.movableBoxes.boxMeshes[i].quaternion.copy(world.movableBoxes.boxes[i].quaternion);
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}