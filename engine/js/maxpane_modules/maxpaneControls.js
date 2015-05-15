function maxpaneControls(world, tick, callback) {

    // If no other module has taken over the controls, set controls to camera ( fpv )
    if(typeof(world.controls) === 'undefined') world.controls = new PointerLockControls(world, {view:1});

    world.scene.add(world.controls.getObject());

    world.controlsEnabled = false;
    world.dt = 1/60;

    tick.push(function(world){
        if ( world.controlsEnabled ) {
            world.physWorld.step(world.dt);
            world.controls.update( Date.now() - time );
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}
