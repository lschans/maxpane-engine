// Test if browser supports webworkers and use webworkers for world loading
if(typeof(Worker) !== "undefined") {
    // Load physics worker
    if(typeof(physics) == "undefined") {
        physics = new Worker("/js/maxpane_workers/maxpane.worker.physics.js");
        physics.onmessage = function (message) {
            switch(message.data.command) {
                case 'loaded':
                    physics.postMessage({command:'init'});
                    console.log('Physics worker started');
                    break;

                case 'initLoaded':
                    console.log('physics init done!');
                    break;

                default:
                    console.log('physics', message.data);
                    break;
            }
        };
    }
    // Load world loader
    if(typeof(worldLoader) == "undefined") {
        worldLoader = new Worker("/js/maxpane_workers/maxpane.worker.world-loader.js");
        worldLoader.onmessage = function(message){
            switch(message.data.command){
                case 'loaded':
                    console.log('World loader worker started');
                    break;

                case 'worldData':
                    worldInit(message.data.world);
                    console.log('World file received');
                    break;

                default:
                    console.log('world loader', message.data);
                    break;
            }
        };
    }
    // Load collision detection
    if(typeof(hitTest) == "undefined") {
        hitTest = new Worker("/js/maxpane_workers/maxpane.worker.hittest.js");
        hitTest.onmessage = function(message){
            switch(message.data.command){
                case 'loaded':
                    hitTest.postMessage({command:'init'});
                    console.log('Hit test worker started');
                    break;

                case 'initLoaded':
                    console.log('Hit test init done!');
                    break;

                default:
                    console.log('hitTest', message.data);
                    break;
            }
        };
    }
} else {
    MP.error('Browser doesn\'t support webworkers, game won\'t run properly');
}