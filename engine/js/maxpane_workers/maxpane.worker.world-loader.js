// Webworker to load world data from JSON file

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

onmessage = function(worldName) {
    // Load world from worldName path
    get(worldName.data.url)
        .then(JSON.parse)
        .then(function(response) {
            var world = response;
            // Load the materials and replace the url with object
            get(world.materials).then(JSON.parse).then(function(materials){
                world.materials = materials;
                postMessage(response);
            });
        }, function(error) {
        console.error("Failed!", error);
        postMessage(error);
    });
};