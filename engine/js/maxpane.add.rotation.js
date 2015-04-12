if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.add) !== 'object') MP.add = {};

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