if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.body) !== 'object') MP.body = {};
if(typeof(MP.body.hitTest) !== 'object') MP.body.hitTest = {};

MP.body.hitTest.test = function() {
    return function (target,radius) {
        if(typeof(target) !== 'object') return false;
        if(Math.abs(Math.round(this.position.x) - target.x) < radius
            && Math.abs(Math.round(this.position.y) - target.y) < radius
            && Math.abs(Math.round(this.position.z) - target.z) < radius
        ) {
            return true;
        } else {
            return false;
        }
    }
};