function character(world, tick, callback) {
    world.character = {};

    world.character = {};

    world.character.geometry = new THREE.SphereGeometry( 3, 10, 10 );
    world.character.mesh = new THREE.Mesh( world.character.geometry, materials.blueWireThin );
    world.character.mesh.velocity =  new THREE.Vector3(0, 0, 0);
    world.character.mesh.position.y = 0;
    world.character.mesh.position.z = 0;

    world.meshes.push(world.character.mesh);

    tick.push(function(world){
        // add some rotation to the cube
        world.character.mesh.velocity.x = (world.velocity.x);
        world.character.mesh.velocity.y = (world.velocity.y);
        world.character.mesh.velocity.z = (world.velocity.z);

        world.character.mesh.position.x =  world.controls.getObject().position.x;
        world.character.mesh.position.y =  world.controls.getObject().position.y + 3;
        world.character.mesh.position.z =  world.controls.getObject().position.z;

        world.character.mesh.rotation.x = world.controls.getObject().rotation.x;
        world.character.mesh.rotation.y = world.controls.getObject().rotation.y;
        world.character.mesh.rotation.z = world.controls.getObject().rotation.z;

        var relativeCameraOffset = new THREE.Vector3(0,0,30);
        var cameraOffset = relativeCameraOffset.applyMatrix4( world.character.mesh.matrixWorld );

        world.camera.position.x = cameraOffset.x;
        world.camera.position.y = world.character.mesh.position.y + 15;
        world.camera.position.z = cameraOffset.z;
        world.camera.lookAt( world.character.mesh.position );


    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}