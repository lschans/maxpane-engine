function rotateCube(world, tick, callback) {
    world.rotateCube = {};

    world.rotateCube.innerCube = {};
    world.rotateCube.outerCube = {};

    world.rotateCube.innerCube.geometry = new THREE.BoxGeometry( 20, 20, 20 );
    world.rotateCube.innerCube.mesh = new THREE.Mesh( world.rotateCube.innerCube.geometry, materials.greenWireThick );
    world.rotateCube.innerCube.mesh.position.y = 30;
    world.rotateCube.innerCube.mesh.position.z = -350;

    world.rotateCube.outerCube.geometry = new THREE.BoxGeometry( 40, 40, 40 );
    world.rotateCube.outerCube.mesh = new THREE.Mesh( world.rotateCube.outerCube.geometry, materials.redWireThick );
    world.rotateCube.outerCube.mesh.position.y = 30;
    world.rotateCube.outerCube.mesh.position.z = -350;

    world.scene.add( world.rotateCube.innerCube.mesh );
    world.scene.add( world.rotateCube.outerCube.mesh );

    tick.push(function(world){
        // add some rotation to the cube
        world.rotateCube.innerCube.mesh.rotation.y -= 0.02;
        world.rotateCube.outerCube.mesh.rotation.y += 0.01;
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}