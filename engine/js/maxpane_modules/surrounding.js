function surrounding(world, tick, callback) {
    world.surrounding = {};

    // create the geometry sphere
    world.surrounding.sphere  = new THREE.SphereGeometry(2100, 50, 50);
    world.surrounding.sphereAlpha  = new THREE.SphereGeometry(1800, 50, 50);

    // Create mesh with star material
    world.surrounding.mesh  = new THREE.Mesh(world.surrounding.sphere, world.materials.stars);
    world.surrounding.meshAlpha  = new THREE.Mesh(world.surrounding.sphereAlpha, world.materials.starsAlpha);

    world.surrounding.meshAlpha.rotation.y = 350;

    world.meshes.push(world.surrounding.mesh);
    world.meshes.push(world.surrounding.meshAlpha);

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}
