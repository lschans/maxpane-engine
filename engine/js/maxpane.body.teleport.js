if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.body) !== 'object') MP.body = {};
if(typeof(MP.body.teleport) !== 'function') {
    //subject: thing to be teleported
    //origin: teleport location
    //destination: exit coordinates
    //radius: hitbox test radius
    MP.body.teleport = function(subject, origin, destination, radius) {
        /*
            if hittest.radius > ( subject.xyz - origin.xyz ){ subject.xyz = destination.xyz }
            We do this in order to be able to move the subject to another destination.
            We do this because we are making a game which needs i.e teleport functionality.
         */
        if(typeof(subject) == 'undefined'
            || typeof(origin) == 'undefined'
            || typeof(destination) == 'undefined'
            || typeof(radius) == 'undefined'
        ) {
            return false;
        } else {
            if(subject.hitTest(origin, radius)){
                subject.position.set(destination.x,destination.y,destination.z);
            }
        }
    };
}