function character(world, tick, callback) {
    world.character = {};

    world.character = {};

    world.character.geometry = new THREE.SphereGeometry( 5, 10, 10 );
    world.character.mesh = new THREE.Mesh( world.character.geometry, materials.blueWireThin );
    world.character.mesh.position.y = 5;
    world.character.mesh.position.z = 0;

    world.meshes.push(world.character.mesh);

    tick.push(function(world){
        // add some rotation to the cube
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}