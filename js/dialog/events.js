(function (travi) {
    'use strict';

    var testEvents = travi.events,

        keys = {
            LOADED: 'dialog-loaded',
            RESIZED: 'dialog-resized',
            FORM_SUCCESS: 'dialog-form-success'
        };

    function load(callback) {
        testEvents.subscribe(keys.LOADED, callback);
    }

    function form(callbacks) {
        testEvents.subscribe(keys.FORM_SUCCESS, callbacks.success);
    }

    travi.register('ui.dialog.events', {
        keys: keys,
        load: load,
        form: form
    });
}(travi));