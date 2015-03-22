function surrounding(world, tick, callback) {
    world.surrounding = {};

    // create the geometry sphere
    world.surrounding.sphere  = new THREE.SphereGeometry(2000, 50, 50);

    // Create mesh with star material
    world.surrounding.mesh  = new THREE.Mesh(world.surrounding.sphere, materials.stars);
    world.scene.add(world.surrounding.mesh);

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}
