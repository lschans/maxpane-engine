
/*
 MP.add.box(world, {
 width:1,
 height:1,
 depth:1,
 x:0,
 y:0,
 z:0,
 mass:0,
 material:new THREE.MeshBasicMaterial({ color: 0xaaaaaa})
 });
 */


var MP = {};
MP.add = {};

var boxTemplate = {
    width:1,
    height:1,
    depth:1,
    x:0,
    y:0,
    z:0,
    mass:0,
    material:new THREE.MeshBasicMaterial({ color: 0xaaaaaa})
}

MP.add.box = function(world, boxObject) {
    var cannonVector = new CANNON.Vec3(boxObject.width/2, boxObject.height/2, boxObject.depth/2);
    var cannonBox = new CANNON.Box(cannonVector);
    var boxGeometry = new THREE.BoxGeometry(boxObject.width, boxObject.height, boxObject.depth);

    var cannonBody = new CANNON.Body({ mass: boxObject.mass });
    cannonBody.addShape(cannonBox);
    var boxMesh = new THREE.Mesh(boxGeometry, boxObject.material);
    world.physWorld.add(cannonBody);
    world.scene.add(boxMesh);
    cannonBody.position.set(boxObject.x, boxObject.y, boxObject.z);
    boxMesh.position.copy(cannonBody.position);
};
