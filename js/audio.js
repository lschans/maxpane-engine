function audio(world, tick, callback) {
    world.audio = {};

    world.audio.context	= new AudioContext()

    // Create lineOut
    world.audio.lineOut	= new WebAudiox.LineOut(world.audio.context)

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}