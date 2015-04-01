function particlestars(world, tick, callback) {

    var starParicles = 1000;
    world.particlestars = {};
    world.particlestars.enabled = true;
    world.particlestars.slowCount = 0;

    // Starfield
    world.particlestars.stars = new THREE.Geometry();
    for (var i=0; i<starParicles; i++) {
        world.particlestars.stars.vertices.push(new THREE.Vector3(
            1e3 * Math.random() - 5e2,
            1e3 * Math.random() - 5e2,
            1e3 * Math.random() - 5e2
        ));
    }

    world.particlestars.particlesystem = new THREE.ParticleSystem(world.particlestars.stars, materials.particlestars);
    world.particlestars.particlesystem.sortParticles = true;

    world.meshes.push(world.particlestars.particlesystem);

    tick.push(function(world){
        world.particlestars.particlesystem.rotation.x += Math.round(Math.random() * 10) / 10000;
        world.particlestars.particlesystem.rotation.y += Math.round(Math.random() * 10) / 10000;
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}