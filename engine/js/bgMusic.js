function bgMusic(world, tick, callback) {
    WebAudiox.loadBuffer.onLoad	= function(context, url){
        console.log('url loaded', url);
        console.log('nb sound remaining', WebAudiox.loadBuffer.inProgressCount);
        if( WebAudiox.loadBuffer.inProgressCount === 0 ){
            console.log('all sounds loaded');
        }
    };

    // load a sound and play it immediatly
    WebAudiox.loadBuffer(world.audio.context, 'music/marbles.ogg', function(buffer){
        var source	= world.audio.context.createBufferSource();
        source.buffer = buffer;
        source.loop	= true;
        source.connect(world.audio.lineOut.destination);
        // start playing
        source.start(0);
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}