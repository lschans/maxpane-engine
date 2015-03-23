function positionbar(world, tick, callback) {
    
    // Add admin bar on top
    world.devpositionbar = document.createElement('div');
    world.devpositionbar.id = 'positionbar';
    world.devpositionbar.style.position = 'absolute';
    world.devpositionbar.style.top = 0 + 'px';
    world.devpositionbar.style.left = 0 + 'px';
    world.devpositionbar.style.width = 100 + '%';
    world.devpositionbar.innerHTML = "DEVBAR";
    // Insert on top of body
    document.body.insertBefore(world.devpositionbar,document.body.firstChild);

    tick.push(function(world){
        world.devpositionbar.innerHTML =
            'Velocity (x:' + Math.round(world.velocity.x) +
            ' y: ' + Math.round(world.velocity.y) +
            ' z: ' + Math.round(world.velocity.z) +
            ')  Position ( x: ' + Math.round(world.controls.getObject().position.x) +
            ' y: ' + Math.round(world.controls.getObject().position.y) +
            ' z: ' + Math.round(world.controls.getObject().position.z) +
            ')';

    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}