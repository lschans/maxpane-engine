if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.collision) !== 'object') MP.collision = {};

MP.collision.distance = function(objectA, objectB) {

    var objectC = {};

    objectC.x = objectA.x - objectB.x;
    objectC.y = objectA.y - objectB.y;
    objectC.z = objectA.z - objectB.z;

    var product = Math.pow(objectC.x,2) + Math.pow(objectC.y,2) + Math.pow(objectC.z,2);

    objectC.distance = Math.sqrt(product);

    return objectC;
};