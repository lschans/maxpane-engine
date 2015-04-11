function rotateCube(world, tick, callback) {
    world.rotateCube = {};

    world.rotateCube.innerCube = {};
    world.rotateCube.outerCube = {};

    // Mind you can't place 2 physics objects inside of each other
    // So if there is an object inside of another, the inner object should be 'normal'

    world.rotateCube.innerCube = MP.add.box(world, tick, {
        width:20,
        height:20,
        depth:20,
        x:0,
        y:30,
        z:-350,
        mass:0,
        material:world.materials.greenWireThick,
        nonPhysMovement:true,
        update:true,
        hasPhys:false
    });

    world.rotateCube.outerCube = MP.add.box(world, tick, {
        width:40,
        height:40,
        depth:40,
        x:0,
        y:30,
        z:-350,
        mass:0,
        material:world.materials.redWireThick,
        nonPhysMovement:true,
        update:true,
        hasPhys:true
    });

    MP.add.sphere(world, tick, {
        radius:20,
        widthSegments:15,
        heightSegments:15,
        x:0,
        y:60,
        z:-150,
        mass:0.001,
        material:world.materials.whiteWireThin,
        damping:0.001,
        update:true
    });

    console.log(world.rotateCube.outerCube.body);

    tick.push(function(world){
        // add some rotation to the cube
        world.rotateCube.innerCube.mesh.rotation.y -= 0.02;
        world.rotateCube.outerCube.body.rotation.y += 0.01;
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}