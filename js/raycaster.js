function raycaster(world, tick, callback) {
    world.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    tick.push(function(world){
        world.raycaster.ray.origin.copy( world.controls.getObject().position );
        world.raycaster.ray.origin.y -= 10;
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}