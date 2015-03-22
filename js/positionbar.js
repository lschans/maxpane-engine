function positionbar (world, tick, callback) {
    
    // Add admin bar on top
    world.devpositionbar = document.createElement('div');
    world.devpositionbar.id = 'devpositionbar';
    world.devpositionbar.style.position = 'absolute';
    world.devpositionbar.style.top = 0 + 'px';
    world.devpositionbar.style.left = 0 + 'px';
    world.devpositionbar.style.width = 100 + '%';
    document.body.appendChild(world.devpositionbar);

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}