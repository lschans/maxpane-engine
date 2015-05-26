function particlestars(world, tick, callback) {

    var starParicles = 1000;
    world.particlestars = {};
    world.particlestars.enabled = true;
    world.particlestars.slowCount = 0;

    var randomPlacedParticle = function(starDistance) {
        var x = -1 + Math.random() * 2;
        var y = -1 + Math.random() * 2;
        var z = -1 + Math.random() * 2;
        var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
        x *= d;
        y *= d;
        z *= d;

        var starParticle = new THREE.Vector3(
            x * starDistance,
            (Math.abs(y * starDistance)-250), // Make them appear only in the lower part of the top of the sphere
            z * starDistance
        );

        return starParticle;
    }

    // Starfield
    world.particlestars.stars = new THREE.Geometry();
    for (var i=0; i<starParicles; i++) {
        world.particlestars.stars.vertices.push(randomPlacedParticle(1650));
    }

    world.particlestars.particlesystem = new THREE.PointCloud(world.particlestars.stars, world.materials.particlestars);
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