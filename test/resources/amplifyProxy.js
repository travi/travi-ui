(function (global) {
    'use strict';

    var cache = {};

    global.realAmplify = global.amplify;

    function subscribe(name, callback) {
        cache[name] = callback;
        global.realAmplify.subscribe(name, callback);
    }

    function restore() {
        var name;

        for (name in cache) {
            if (cache.hasOwnProperty(name)) {
                global.realAmplify.unsubscribe(name, cache[name]);
            }
        }
    }

    global.amplify = {
        publish: realAmplify.publish,
        subscribe: subscribe,
        restore: restore
    };
}(this));