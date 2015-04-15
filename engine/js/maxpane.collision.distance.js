if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.collision) !== 'object') MP.collision = {};

MP.collision.distance = function(objectA, objectB) {

    var objectC = {};

    objectC.x = objectA.x - objectB.x;
    objectC.y = objectA.y - objectB.y;
    objectC.z = objectA.z - objectB.z;

    var product = Math.pow(objectC.x,2) + Math.pow(objectC.y,2) + Math.pow(objectC.z,2);

    objectC.distance = Math.sqrt(product);

    /*
    var objectA = {};
    objectA.x = 1;
    objectA.y = 2;
    objectA.z = 5;

    var objectB = {};
    objectB.x = 7;
    objectB.y = 28;
    objectB.z = 31;

    var deltaX = objectA.x - objectB.x;
    var deltaY = objectA.y - objectB.y;
    var deltaZ = objectA.z - objectB.z;

    var product = Math.pow(deltaX,2) + Math.pow(deltaY,2) + Math.pow(deltaZ,2);

    var distance = Math.sqrt(product);
    alert(distance);
    */

    return objectC;
};