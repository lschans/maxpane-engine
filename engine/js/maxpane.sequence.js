if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.sequence) !== 'object') MP.sequence = {};

MP.sequence.syncItter = function (world, tick){
    // Function that iterates over a given array with callback functions
    var myFunction = world.funcArray.shift();
    if(world.funcArray.length > 0) {
        if(typeof (myFunction) === 'function') myFunction(world, tick, MP.sequence.syncItter);
    } else {
        delete world.funcArray;
        myFunction(world, tick);
    }
}

MP.sequence.syncIt = function (world, tick, functionArray) {
    // Function that iterates over all callback functions in the function array
    world.funcArray = functionArray;
    MP.sequence.syncItter(world, tick);
}