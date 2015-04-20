function positionbar(world, tick, callback) {
    
    // Add admin bar on top
    world.devpositionbar = document.createElement('div');
    world.devpositionbar.id = 'positionbar';
    world.devpositionbar.style.position = 'fixed';
    world.devpositionbar.style.top = 0 + 'px';
    world.devpositionbar.style.left = 0 + 'px';
    world.devpositionbar.style.width = 100 + '%';
    world.devpositionbar.innerHTML = "DEVBAR";

    // Insert on top of body
    document.body.insertBefore(world.devpositionbar,document.getElementById('blocker'));
    //document.body.insertBefore(world.devpositionbar, document.body.firstChild);

    tick.push(function(world){
        var dist = MP.collision.distance({x:0,y:0,z:0}, {x:world.player.sphereBody.position.x,y:world.player.sphereBody.position.y,z:world.player.sphereBody.position.z});

        world.devpositionbar.innerHTML =
            'Position ( x: ' + Math.round(world.player.sphereBody.position.x) +
            ' y: ' + Math.round(world.player.sphereBody.position.y) +
            ' z: ' + Math.round(world.player.sphereBody.position.z) +
            ') Rotation ( x: ' + Math.round(world.player.sphereBody.rotation.x) +
            ' y: ' + Math.round(world.player.sphereBody.rotation.y) +
            ' z: ' + Math.round(world.player.sphereBody.rotation.z) +
            ') Velocity ( average: ' + Math.round(world.player.sphereBody.velocity.avg) +
            ' x: ' + Math.round(world.player.sphereBody.velocity.x) +
            ' y: ' + Math.round(world.player.sphereBody.velocity.y) +
            ' z: ' + Math.round(world.player.sphereBody.velocity.z) +
            ') Distance ( total: ' + Math.round(dist.distance) +
            ' x: ' + Math.round(dist.x) +
            ' y: ' + Math.round(dist.y) +
            ' z: ' + Math.round(dist.z) +
            ')';
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}