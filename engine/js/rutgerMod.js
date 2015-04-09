function rutgerMod(world, tick, callback) {
    world.rutgerMod = {};

    world.rutgerMod.innerCube = {};
    world.rutgerMod.outerCube = {};

    world.rutgerMod.innerCube.geometry = new THREE.BoxGeometry( 20, 20, 20 );
    world.rutgerMod.innerCube.mesh = new THREE.Mesh( world.rutgerMod.innerCube.geometry, materials.blueWireThick );
    world.rutgerMod.innerCube.mesh.position.y = 30;
    world.rutgerMod.innerCube.mesh.position.z = -800;

    world.rutgerMod.outerCube.geometry = new THREE.BoxGeometry( 40, 40, 40 );
    world.rutgerMod.outerCube.mesh = new THREE.Mesh( world.rutgerMod.outerCube.geometry, materials.blueWireThin );
    world.rutgerMod.outerCube.mesh.position.y = 30;
    world.rutgerMod.outerCube.mesh.position.z = -800;

    world.meshes.push(world.rutgerMod.innerCube.mesh);
    world.meshes.push(world.rutgerMod.outerCube.mesh);

    tick.push(function(world){
        // add some rotation to the cube
        world.rutgerMod.innerCube.mesh.rotation.y -= 0.02;
        world.rutgerMod.outerCube.mesh.rotation.y += 0.01;
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}