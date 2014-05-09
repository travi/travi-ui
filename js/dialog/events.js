(function (travi) {
    'use strict';

    var keys = {
        LOADED: 'dialog-loaded'
    };

    function load(callback) {
        travi.events.subscribe(keys.LOADED, callback);
    }

    travi.register('ui.dialog.events', {
        keys: keys,
        load: load
    });
}(travi));