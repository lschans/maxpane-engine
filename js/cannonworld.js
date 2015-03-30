function cannonworld(world, tick, callback) {
    world.cannonworld = {};
    world.cannonworld.box = {};
    world.cannonworld.sphere = {};

    world.cannonworld.worldx	= new THREEx.CannonWorld().start();

    world.cannonworld.stoneMaterial	= new CANNON.Material('stone');
    world.cannonworld.worldx.world.addContactMaterial(new CANNON.ContactMaterial(
        world.cannonworld.stoneMaterial,
        world.cannonworld.stoneMaterial,
        0.3,	// friction
        0.1	// Restitution
    ));

    world.cannonworld.box.geometry	= new THREE.SphereGeometry(5, 8, 8);
    world.cannonworld.box.mesh	= new THREE.Mesh(world.cannonworld.box.geometry, materials.greenFloorThin);
    world.cannonworld.box.mesh.position.y	= 100;
    world.cannonworld.box.mesh.position.x	= 2;
    world.cannonworld.box.mesh.position.z	= -50;

    world.cannonworld.box.mesh.name	= 'ball';
    world.cannonworld.box.mesh.receiveShadow	= true;
    world.cannonworld.box.mesh.castShadow		= true;
    world.scene.add( world.cannonworld.box.mesh );

    world.cannonworld.box.bodyx	= new THREEx.CannonBody({
        mesh	: world.cannonworld.box.mesh,
        material: world.cannonworld.stoneMaterial
    }).addTo(world.cannonworld.worldx);

    world.cannonworld.box.bodyx.body.angularVelocity.set(0,0,20);

    world.cannonworld.sphere.geometry	= new THREE.CubeGeometry(100, 0.1, 10);

    world.cannonworld.sphere.mesh	= new THREE.Mesh(world.cannonworld.sphere.geometry, materials.greenFloorThin);
    world.cannonworld.sphere.mesh.position.y	= 25;
    world.cannonworld.sphere.mesh.position.z	= -50;
    world.cannonworld.sphere.mesh.receiveShadow	= true;
    world.cannonworld.sphere.mesh.castShadow		= true;
    world.scene.add( world.cannonworld.sphere.mesh );
    // init physics
    world.cannonworld.sphere.bodyx	= new THREEx.CannonBody({
        mesh		: world.cannonworld.sphere.mesh,
        material	: world.cannonworld.stoneMaterial,
        mass		: 0,
        cannon2three	: false
    }).addTo(world.cannonworld.worldx);
    window.tableMesh	= world.cannonworld.sphere.mesh;
    tableMesh.rotation.z = Math.PI/6;

    tick.push(function(world){
       // Leeg
        world.cannonworld.box.bodyx.update(world.deltaMsec/1000, world.nowMsec/1000);
        world.cannonworld.sphere.bodyx.update(world.deltaMsec/1000, world.nowMsec/1000);
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}