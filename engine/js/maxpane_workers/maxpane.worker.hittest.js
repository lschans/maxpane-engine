// Require maxpane scripts
var maxpanePath = '/js/';

var init = function() {
    importScripts(maxpanePath + 'maxpane.init.js');
    importScripts(maxpanePath + 'maxpane.body.js');
    importScripts(maxpanePath + 'maxpane.body.hitTest.js');


    postMessage({command:'initLoaded'});
};

// Send data
//postMessage(message);

// Receive data
onmessage = function(message) {
    switch(message.data.command) {
        case 'init':
            init(message.data);
            break;

        default:
            // Do nothing
            break;
    }
};

// Tell the main process that we have loaded
postMessage({command:'loaded'});