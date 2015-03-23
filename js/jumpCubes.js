function jumpCubes(world, tick, callback) {
    world.jumpCubes = {};
    world.jumpCubes.geometry = new THREE.BoxGeometry( 20, 20, 20 );

    for ( var i = 0; i < 500; i++ ) {
        world.jumpCubes.mesh = new THREE.Mesh( world.jumpCubes.geometry, materials.jumpCube );

        // Place at random positions
        world.jumpCubes.mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
        world.jumpCubes.mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
        world.jumpCubes.mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

        // Move the whole block of cubes away from the starting point
        world.jumpCubes.mesh.position.x -= 400;
        world.jumpCubes.mesh.position.z -= 200;

        world.meshes.push( world.jumpCubes.mesh );

        // push to objects for collision detection
        world.objects.push( world.jumpCubes.mesh );
    }

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}