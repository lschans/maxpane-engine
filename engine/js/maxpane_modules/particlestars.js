function particlestars(world, tick, callback) {

    var starParicles = 750;
    world.particlestars = {};
    world.particlestars.enabled = true;
    world.particlestars.slowCount = 0;

    var randomPlacedParticle = function(spread, starDistance) {
        var x = -1 + Math.random() * 2;
        var y = -1 + Math.random() * 2;
        var z = -1 + Math.random() * 2;
        var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
        x *= d;
        y *= d;
        z *= d;

        if(x > 0) var xPos = starDistance + (x * spread);
        else var xPos = (0 - starDistance) + (x * spread);

        if(y > 0) var yPos = starDistance + (y * spread);
        else var yPos = (0 - starDistance) + (y * spread);

        if(z > 0) var zPos = starDistance + (z * spread);
        else var zPos = (0 - starDistance) + (z * spread);

        var starParticle = new THREE.Vector3( xPos, yPos, zPos );

        return starParticle;
    }

    // Starfield
    world.particlestars.stars = new THREE.Geometry();
    for (var i=0; i<starParicles; i++) {
        world.particlestars.stars.vertices.push(randomPlacedParticle(1785, 0));
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