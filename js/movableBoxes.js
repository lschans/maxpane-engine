function movableBoxes(world, tick, callback) {

    world.movableBoxes = {};
    
    // Add boxes
    world.movableBoxes.halfExtends = new CANNON.Vec3(10,10,10);
    world.movableBoxes.boxShape = new CANNON.Box(world.movableBoxes.halfExtends);
    world.movableBoxes.boxGeometry = new THREE.BoxGeometry(world.movableBoxes.halfExtends.x*2,world.movableBoxes.halfExtends.y*2,world.movableBoxes.halfExtends.z*2);
    world.movableBoxes.boxMeshes = [];
    world.movableBoxes.boxes = [];

    for(var i=0; i<7; i++){
        var x = (Math.random()-0.5)*20;
        var y = 1 + (Math.random()-0.5)*1;
        var z = (Math.random()-0.5)*20;

        x += 200;
        z -= 200;

        var boxBody = new CANNON.Body({ mass: 2 });
        boxBody.addShape(world.movableBoxes.boxShape);
        var boxMesh = new THREE.Mesh( world.movableBoxes.boxGeometry, materials.blueHalfSolid );
        world.physWorld.add(boxBody);
        world.scene.add(boxMesh);
        boxBody.position.set(x,y,z);
        boxMesh.position.set(x,y,z);
        boxMesh.castShadow = false;
        boxMesh.receiveShadow = false;
        world.movableBoxes.boxes.push(boxBody);
        world.movableBoxes.boxMeshes.push(boxMesh);
    }

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