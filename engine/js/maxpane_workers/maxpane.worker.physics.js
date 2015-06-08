// Require cannon.js
var world;

// Send data
//postMessage(message);

var init = function (message) {
    if(!world) { // Load cannon js
        importScripts('/bower_components/cannon.js/build/cannon.js'); // Import scripts is a blocking function

        // Init cannon.js

        postMessage({command:'initLoaded'});
    }
};

var process = function (message) {

};

// Receive data
onmessage = function(message) {
    switch(message.data.command) {
        case 'init':
            init(message.data);
            break;

        case 'process':
            process(message.data);
            break;

        default:
            // Do nothing
            break;
    }
};

// Tell the main process that we have loaded
postMessage({command:'loaded'});