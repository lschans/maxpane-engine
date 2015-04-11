aasAdmin.factory('$globals', function() {
    var globals = {};
    var globalService = {};

    globalService.set = function(item, value) {
        globals[item] = value;
    };

    globalService.get = function(item) {
        if(typeof(globals[item]) !== 'undefined') {
            return globals[item];
        } else {
            return false;
        }
    };

    return globalService;
});