// Webworker to load world data from JSON file

var loadJSON = function (path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
};

onmessage = function(world) {
    loadJSON(world.data.url,
        function(data) { postMessage(data); },
        function(xhr) { postMessage(xhr); }
    );
};