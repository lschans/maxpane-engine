if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.collision) !== 'object') MP.collision = {};
MP.collision.bumper = {};

MP.collision.bumper.oldDist = {};
MP.collision.bumper.oldPos = {};

MP.collision.bumper.inside = function(cannonBody, posObj, distance) {
    // Detect world boundry and stop movement
    var velocity = cannonBody.velocity;

    var dist = MP.collision.distance(
        posObj, // World
        {x:cannonBody.position.x,y:cannonBody.position.y,z:cannonBody.position.z} // Player
    );

    var averageVelocity = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.z, 2));

    // Add a bumper... Like an invisible rubber border you cannot pass
    if(dist.distance > distance && averageVelocity >= 0 && MP.collision.bumper.oldDist < dist.distance) {
        cannonBody.velocity.set(0, 0, 0);
        cannonBody.rotation.set(0, 0, 0);
    }
    MP.collision.bumper.oldPos = cannonBody.position;
    MP.collision.bumper.oldDist = dist.distance;
};

MP.collision.bumper.outside = function() {

};