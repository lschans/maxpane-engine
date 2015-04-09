var MP = {};
MP.add = {};

MP.add.addRotation = function(body, mesh) {
    return {
        body:body,
        mesh:mesh,
        x:0,
        y:0,
        z:0,
        _x:0,
        _y:0,
        _z:0,
        set: function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        },
        update: function() {
            // Update rotation here
            if(this.x != this._x) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), this.x);
            if(this.y != this._y) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), this.y);
            if(this.z != this._z) this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1), this.z);
            this._x = this.x;
            this._y = this.y;
            this._z = this.z;
        }
    };
};

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
