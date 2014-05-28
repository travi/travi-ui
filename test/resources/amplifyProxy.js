(function (global) {
    'use strict';

    var cache = [];

    global.realAmplify = global.amplify;

    function subscribe(name, callback) {
        cache.push({
            name: name,
            callback: callback
        });
        global.realAmplify.subscribe(name, callback);
    }

    function restore() {
        for (var i = 0; i < cache.length; i++) {
            var subscription = cache[i];
            global.realAmplify.unsubscribe(subscription.name, subscription.callback);
        }

        cache = [];
    }

    global.amplify = {
        publish: global.realAmplify.publish,
        subscribe: subscribe,
        restore: restore
    };
}(this));