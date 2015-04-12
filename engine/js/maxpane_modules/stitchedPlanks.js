function stitchedPlanks(world, tick, callback) {

    world.stitchedPlanks = {};
    world.stitchedPlanks.boxes = [];
    world.stitchedPlanks.boxMeshes = [];
    world.stitchedPlanks.materials = [];

    world.stitchedPlanks.materials[0] = world.materials.redPlankSolid;
    world.stitchedPlanks.materials[1] = world.materials.greenPlankSolid;
    world.stitchedPlanks.materials[2] = world.materials.bluePlankSolid;

    // Add linked world.stitchedPlanks.boxes
    world.stitchedPlanks.size = 3;
    world.stitchedPlanks.he = new CANNON.Vec3(world.stitchedPlanks.size*0.1, world.stitchedPlanks.size, world.stitchedPlanks.size);
    world.stitchedPlanks.boxShape = new CANNON.Box(world.stitchedPlanks.he);

    world.stitchedPlanks.space = 0.2 * world.stitchedPlanks.size;
    var N = 7;

    world.stitchedPlanks.boxGeometry = new THREE.BoxGeometry(world.stitchedPlanks.he.x * 2, world.stitchedPlanks.he.y * 2, world.stitchedPlanks.he.z * 2);

    world.stitchedPlanks.addStrip = function (N, x, z) {
        world.stitchedPlanks.mass = 0;
        for (var i = 0; i < N; i++) {
            var last;
            var boxbody = new CANNON.Body({mass: world.stitchedPlanks.mass});
            boxbody.addShape(world.stitchedPlanks.boxShape);
            var boxMesh = new THREE.Mesh(world.stitchedPlanks.boxGeometry, world.stitchedPlanks.materials[Math.floor(Math.random() * (2 - 0 + 1))]);
            boxbody.position.set(x, (N - i) * (world.stitchedPlanks.size * 2 + 2 * world.stitchedPlanks.space) + world.stitchedPlanks.space, z);
            boxbody.linearDamping = 0.03;
            boxbody.angularDamping = 0.03;
            boxMesh.castShadow = false;
            boxMesh.receiveShadow = false;
            world.physWorld.add(boxbody);
            world.scene.add(boxMesh);
            world.stitchedPlanks.boxes.push(boxbody);
            world.stitchedPlanks.boxMeshes.push(boxMesh);

            if (i !== 0) {
                // Connect this body to the last one
                var c1 = new CANNON.PointToPointConstraint(
                    boxbody,
                    new CANNON.Vec3(0, world.stitchedPlanks.size + world.stitchedPlanks.space, -world.stitchedPlanks.size),
                    last,
                    new CANNON.Vec3(0, -world.stitchedPlanks.size - world.stitchedPlanks.space, -world.stitchedPlanks.size)
                );
                var c2 = new CANNON.PointToPointConstraint(
                    boxbody,
                    new CANNON.Vec3(0, world.stitchedPlanks.size + world.stitchedPlanks.space, world.stitchedPlanks.size),
                    last,
                    new CANNON.Vec3(0, -world.stitchedPlanks.size - world.stitchedPlanks.space, world.stitchedPlanks.size)
                );
                world.physWorld.addConstraint(c1);
                world.physWorld.addConstraint(c2);
            } else {
                world.stitchedPlanks.mass = 0.5;
            }
            last = boxbody;
        }
    };

    // x: 495 z: -370

    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:500,
        y:20,
        z:-375,
        mass:0,
        material:world.materials.redPlankSolid
    });

    MP.add.box(world, tick, {
        width:5,
        height:10,
        depth:55,
        x:500,
        y:45,
        z:-350,
        mass:0,
        material:world.materials.redPlankSolid
    });

    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:500,
        y:20,
        z:-325,
        mass:0,
        material:world.materials.redPlankSolid
    });

    // N, x, z

    world.stitchedPlanks.addStrip(5,500,-368);
    world.stitchedPlanks.addStrip(5,500,-359);
    world.stitchedPlanks.addStrip(5,500,-350);
    world.stitchedPlanks.addStrip(5,500,-341);
    world.stitchedPlanks.addStrip(5,500,-332);

    tick.push(function(world){
        // Update box positions
        for(var i=0; i<world.stitchedPlanks.boxes.length; i++){
            world.stitchedPlanks.boxMeshes[i].position.copy(world.stitchedPlanks.boxes[i].position);
            world.stitchedPlanks.boxMeshes[i].quaternion.copy(world.stitchedPlanks.boxes[i].quaternion);
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}