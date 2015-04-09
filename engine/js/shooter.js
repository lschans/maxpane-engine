function shooter(world, tick, callback) {

    world.shooter = {};

    world.shooter.ballShape = new CANNON.Sphere(3.5);
    world.shooter.ballGeometry = new THREE.SphereGeometry(world.shooter.ballShape.radius, 10, 10);
    shootDirection = new THREE.Vector3();
    world.shooter.shootVelo = 500;

    world.shooter.balls = [];
    world.shooter.ballMeshes = [];

    world.shooter.getShootDir = function(targetVec, world){
        targetVec.set(0,0,1);
        targetVec.unproject(world.camera);
        var ray = new THREE.Ray(world.player.sphereBody.position, targetVec.sub(world.player.sphereBody.position).normalize());
        targetVec.copy(ray.direction);
        return targetVec;
    };

    world.shooter.shoot = function(world){
        if(world.controlsEnabled===true){
            var shootDirection = new THREE.Vector3();
            var ballBody = new CANNON.Body({ mass: 4 });
            ballBody.addShape(world.shooter.ballShape);
            var ballMesh = new THREE.Mesh( world.shooter.ballGeometry, materials.greenAmmo );
            world.physWorld.add(ballBody);
            world.scene.add(ballMesh);

            ballMesh.castShadow = false;
            ballMesh.receiveShadow = false;
            var ballBodyID = world.shooter.balls.push(ballBody) -1;
            var ballMeshID =  world.shooter.ballMeshes.push(ballMesh) - 1;

            // Remove ball after 10 seconds
            setTimeout(function(){
                world.physWorld.remove(ballBody);
                world.scene.remove(ballMesh);
                delete world.shooter.ballMeshes[ballMeshID];
                delete world.shooter.balls[ballBodyID];
            }, 10000);

            shootDirection = world.shooter.getShootDir(shootDirection, world);
            ballBody.velocity.set(  shootDirection.x * world.shooter.shootVelo,
                shootDirection.y * world.shooter.shootVelo,
                shootDirection.z * world.shooter.shootVelo);

            // Move the ball outside the player sphere
            var x = world.player.sphereBody.position.x + (shootDirection.x * (world.player.sphereShape.radius*1.02 + world.shooter.ballShape.radius));
            var y = world.player.sphereBody.position.y + (shootDirection.y * (world.player.sphereShape.radius*1.02 + world.shooter.ballShape.radius));
            var z = world.player.sphereBody.position.z + (shootDirection.z * (world.player.sphereShape.radius*1.02 + world.shooter.ballShape.radius));
            ballBody.position.set(x,y,z);
            ballMesh.position.set(x,y,z);
        }
    };

    window.addEventListener("click", world.shooter.shoot.bind(null, world));

    tick.push(function(world){
        // Update ball positions
        var actCount = 0;
        for(var i=0; i<world.shooter.balls.length; i++){
            if(typeof(world.shooter.balls[i]) !== 'undefined') {
                actCount++;
                world.shooter.ballMeshes[i].position.copy(world.shooter.balls[i].position);
                world.shooter.ballMeshes[i].quaternion.copy(world.shooter.balls[i].quaternion);
            }
        }
        if(actCount === 0 && world.shooter.balls.length !== 0) {
            world.shooter.ballMeshes = [];
            world.shooter.balls = [];
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}