if(typeof(MP) !== 'object') var MP = {};

MP.player = function(playerObject) {
    var player = {};
    player.body = {};
    player.mesh = new MP.character.robot();

    player.body.mass = playerObject.mass;
    player.body.radius = playerObject.radius;
    player.body.sphereShape = new CANNON.Sphere(player.body.radius);
    player.body.sphereBody = new CANNON.Body({ mass: player.body.mass });
    player.body.sphereBody.addShape(player.body.sphereShape);
    player.body.sphereBody.position.set(playerObject.position.x, playerObject.position.y, playerObject.position.z);
    player.body.sphereBody.rotation = {
        x:playerObject.rotation.x,
        y:playerObject.rotation.y,
        z:playerObject.rotation.z
    };
    player.body.sphereBody.linearDamping = playerObject.linearDamping;
    return player;
};
