if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.add) !== 'object') MP.add = {};

MP.add.configTest = function(object) {
    if(typeof(object) !== 'object') object = {};

    // Populate object with default values to prevent weird conditions
    if(typeof(object.width) == 'undefined') object.width = 1;
    if(typeof(object.height) == 'undefined') object.height = 1;
    if(typeof(object.depth) == 'undefined') object.depth = 1;
    if(typeof(object.x) == 'undefined') object.x = 0;
    if(typeof(object.y) == 'undefined') object.y = 0;
    if(typeof(object.z) == 'undefined') object.z = 0;
    if(typeof(object.mass) == 'undefined') object.mass = 0;
    if(typeof(object.material) == 'undefined') object.material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa});
    if(typeof(object.radius) == 'undefined') object.radius=1;
    if(typeof(object.widthSegments) == 'undefined') object.widthSegments=1;
    if(typeof(object.heightSegments) == 'undefined') object.heightSegments=1;
    if(typeof(object.depthSegments) == 'undefined') object.depthSegments=1;
    if(typeof(object.update) == 'undefined') object.update=false;
    if(typeof(object.nonPhysMovement) == 'undefined') object.nonPhysMovement=false;
    if(typeof(object.hasPhys) == 'undefined') object.hasPhys=true;
    if(typeof(object.damping) == 'undefined') object.damping=0.9;

    return object;
};