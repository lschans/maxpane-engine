function soundMachine(world, tick, callback) {
    world.soundMachine = {};
    world.soundMachine.machineCone = {};

    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight
    world.soundMachine.machineCone.geometry = new THREE.CylinderGeometry( 1, 5, 25, 16, 3 );
    world.soundMachine.machineCone.mesh = new THREE.Mesh( world.soundMachine.machineCone.geometry, materials.greenWireThin );
    world.soundMachine.machineCone.mesh.position.x = 200;
    world.soundMachine.machineCone.mesh.position.y = 15;
    world.soundMachine.machineCone.mesh.position.z = -200;

    world.meshes.push(world.soundMachine.machineCone.mesh);

    // create and connect the sound
    world.soundMachine.binauralSrc	= new WebAudiox.BinauralSource(world.audio.context);
    world.soundMachine.binauralSrc.output.connect(world.audio.lineOut.destination);

    // Gain 0 - 1
    world.soundMachine.binauralSrc.setGain(parseFloat(0));


    // Beat rate 0 - 50
    world.soundMachine.defaultBeatRate = 5;
    world.soundMachine.binauralSrc.setBeatRate(parseFloat(world.soundMachine.defaultBeatRate));

    // Pitch 0 - 1000
    world.soundMachine.defaultPitch = 450;
    world.soundMachine.binauralSrc.setPitch(parseFloat(world.soundMachine.defaultPitch));


    world.soundMachine.binauralSrc.start();

    tick.push(function(world){
        // Get distance to sound object
        var objDistX = world.soundMachine.machineCone.mesh.position.x - world.controls.getObject().position.x;
        if(objDistX < 0) objDistX = 0 - objDistX;

        var objDistZ = world.soundMachine.machineCone.mesh.position.z - world.controls.getObject().position.z;
        if(objDistZ < 0) objDistZ = 0 - objDistZ;

        // Get average of distance
        var objDistAvg = (objDistX + objDistZ) / 2;

        // If average object distance is < 100 we are in range
        if(objDistAvg < 100) {
            // Pitch on jump
            world.soundMachine.binauralSrc.setPitch(parseFloat(world.soundMachine.defaultPitch + world.velocity.y));

            // Do funcky beatrate stuff
            world.soundMachine.binauralSrc.setBeatRate(parseFloat(world.soundMachine.defaultBeatRate + (world.controls.objRotation.y / 100)));

            // Set sound gain according to distance
            var gain = (100 - objDistAvg) / 100;
            if (gain > 0) world.soundMachine.binauralSrc.setGain(parseFloat(gain));
            else world.soundMachine.binauralSrc.setGain(parseFloat(0));
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}