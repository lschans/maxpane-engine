function teleporter(world, tick, callback) {
    world.teleporter = {};

    // Door 1
    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:-250,
        y:20,
        z:-375,
        mass:0,
        material:world.materials.redPlankSolid
    });

    world.teleporter.centerbar = MP.add.box(world, tick, {
        width:5,
        height:10,
        depth:55,
        x:-250,
        y:45,
        z:-350,
        mass:0,
        material:world.materials.redPlankSolid
    });

    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:-250,
        y:20,
        z:-325,
        mass:0,
        material:world.materials.redPlankSolid
    });

    // Door 2
    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:-250,
        y:20,
        z:-75,
        mass:0,
        material:world.materials.redPlankSolid
    });

    MP.add.box(world, tick, {
        width:5,
        height:10,
        depth:55,
        x:-250,
        y:45,
        z:-50,
        mass:0,
        material:world.materials.redPlankSolid
    });

    MP.add.box(world, tick, {
        width:5,
        height:40,
        depth:5,
        x:-250,
        y:20,
        z:-25,
        mass:0,
        material:world.materials.redPlankSolid
    });

    // Entrance z:-350, x:-250
    // Exit z:-50, x:-250

    tick.push(function(world){
        MP.body.teleport(world.player.body.sphereBody, {x:-250, y:5, z:-350}, {x:-250, y:5, z:-50}, 20);
        MP.body.teleport(world.playBall.body, {x:-250, y:5, z:-350}, {x:-250, y:5, z:-50}, 20);
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}